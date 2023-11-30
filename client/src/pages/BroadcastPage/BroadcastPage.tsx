import { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
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

interface BroadcastProps {
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
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const { title, nickname, viewer }: BroadcastProps = location.state
  const [settingModal, setSettingModal] = useState<boolean>(false)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [viewerModal, setViewerModal] = useState<boolean>(false)
  const [viewerModalInfo, setViewerModalInfo] = useState<ViewerModalProps>({ nickname: '', authority: 'viewer', target: 'viewer', top: 0, left: 0 })
  const [manager, setManager] = useState<Array<string>>([])
  const [chatting, setChatting] = useState<string>('')
  const theme = useRecoilValue(themeState)
  const [chattingList, setChattingList] = useState<Array<ChattingProps>>([])
  const [socket, _] = useState<any>(() => io('http://localhost:3000', { withCredentials: true }))

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
      socket.emit('chat', { message: chatting })
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
    socket.emit('join', { room: id })

    socket.on('chat', (chatting: ChattingProps) => {
      setChattingList((chattingList) => [chatting, ...chattingList])
    })
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
          <styles.Text currentTheme={theme} value={chatting} onChange={(event) => setChatting(event.target.value)} onKeyDown={onEnter}></styles.Text>
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
