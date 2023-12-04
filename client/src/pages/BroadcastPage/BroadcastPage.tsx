import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import * as styles from './BroadcastPage.styles'
import Logo from '@components/Logo/Logo'
import Access from '@components/Access/Access'
import SettingModal from '@components/Modal/SettingModal/SettingModal'
import LoginModal from '@components/Modal/LoginModal/LoginModal'
import ViewerModal from '@components/Modal/ViewerModal/ViewerModal'
import Chatting from '@components/Chatting/Chatting'
import { useRecoilValue } from 'recoil'
import { themeState } from '@/states/theme'
import { userState } from '@/states/user'
import ConfirmModal from '@components/Modal/ConfirmModal/ConfirmModal'

interface BroadcastProps {
  id: string
  title: string
  nickname: string
  viewer: string
}

interface ViewerModalProps {
  nickname: string
  authority: 'viewer' | 'manager' | 'streamer'
  target: 'viewer' | 'manager' | 'streamer'
  top: number
  left: number
}

interface ChattingProps {
  nickname: string
  message: string
}

const BroadcastPage = () => {
  const location = useLocation()
  const { id, title, nickname, viewer }: BroadcastProps = location.state
  const [settingModal, setSettingModal] = useState<boolean>(false)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [viewerModal, setViewerModal] = useState<boolean>(false)
  const [viewerModalInfo, setViewerModalInfo] = useState<ViewerModalProps>({ nickname: '', authority: 'viewer', target: 'viewer', top: 0, left: 0 })
  const [manager, setManager] = useState<Array<string>>([])
  const [chatting, setChatting] = useState<string>('')
  const [chattingList, setChattingList] = useState<Array<ChattingProps>>([])
  const [isLoginCheckModal, setIsLoginCheckModal] = useState<boolean>(false)
  const socket = useRef<any>(null)
  const theme = useRecoilValue(themeState)
  const user = useRecoilValue(userState)

  const onSetting = () => {
    setSettingModal(() => !settingModal)
  }

  const onLogin = () => {
    setLoginModal(() => !loginModal)
  }

  const onViewer = () => {
    setViewerModal(() => !viewerModal)
  }

  const getTarget = (viewerNickname: string): 'viewer' | 'manager' | 'streamer' => {
    if (viewerNickname === nickname) {
      return 'streamer'
    } else if (manager.indexOf(viewerNickname) !== -1) {
      return 'manager'
    }

    return 'viewer'
  }

  const onNickname = (event: React.MouseEvent<HTMLInputElement>) => {
    const viewerNickname = event.currentTarget.innerText
    const authority = 'streamer'
    const target = getTarget(viewerNickname)
    const top = event.pageY
    const left = event.pageX

    setViewerModalInfo({ nickname: viewerNickname, authority: authority, target: target, top: top, left: left })
    onViewer()
  }

  const onManager = (viewerNickname: string) => {
    const index = manager.indexOf(viewerNickname)

    if (index === -1) {
      setManager([...manager, viewerNickname])
    } else {
      setManager(manager.filter((manager) => manager !== viewerNickname))
    }

    onViewer()
  }

  const onSend = () => {
    if (chatting.trim() === '') {
      alert('채팅을 입력해주세요.')
    } else {
      socket.current.emit('chat', { message: chatting })
    }

    setChatting('')
  }

  const onEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault()
      onSend()
    }
  }

  useEffect(() => {
    socket.current = io('http://localhost:3000', { withCredentials: true })

    socket.current.emit('join', { room: id })

    socket.current.on('chat', (chatting: ChattingProps) => {
      setChattingList((chattingList) => [chatting, ...chattingList])
    })

    return () => {
      if (socket.current) {
        socket.current.disconnect()
      }
    }
  }, [])

  return (
    <styles.Container>
      <styles.Logo>
        <Link to="/">
          <Logo logo="wide" currentTheme={theme} />
        </Link>
      </styles.Logo>
      <styles.Access>
        <Access leftButton="환경설정" rightButton="로그인" onLeftButton={onSetting} onRightButton={onLogin} />
      </styles.Access>
      <styles.Broadcast></styles.Broadcast>
      <styles.Chatting currentTheme={theme}>
        <styles.ChattingList>
          {chattingList.map((chatting, index) => (
            <Chatting nickname={chatting.nickname} message={chatting.message} onNickname={onNickname} key={index} />
          ))}
        </styles.ChattingList>
        <styles.Input currentTheme={theme}>
          <styles.Text
            currentTheme={theme}
            value={chatting}
            onChange={(event) => {
              if (user.id === '') {
                setIsLoginCheckModal(true)
                return
              }
              return setChatting(event.target.value)
            }}
            onKeyDown={onEnter}
          ></styles.Text>
          <styles.Send currentTheme={theme} onClick={onSend}>
            등록하기
          </styles.Send>
        </styles.Input>
      </styles.Chatting>
      <styles.Info currentTheme={theme}>
        <styles.Title>{title}</styles.Title>
        <styles.Nickname>{nickname}</styles.Nickname>
        <styles.Viewer>시청자 {viewer}명</styles.Viewer>
      </styles.Info>
      {settingModal ? <SettingModal onConfirm={onSetting} /> : null}
      {loginModal ? <LoginModal onCancle={onLogin} currentTheme={theme} /> : null}
      {isLoginCheckModal && (
        <ConfirmModal
          currentTheme={theme}
          onCancle={() => {
            setIsLoginCheckModal(false)
          }}
        />
      )}
      {viewerModal ? (
        <ViewerModal
          nickname={viewerModalInfo.nickname}
          authority={viewerModalInfo.authority}
          target={viewerModalInfo.target}
          top={viewerModalInfo.top}
          left={viewerModalInfo.left}
          onCancle={onViewer}
          onManager={onManager}
          onKick={onViewer}
          currentTheme={theme}
        />
      ) : null}
    </styles.Container>
  )
}

export default BroadcastPage
