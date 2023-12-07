import { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import io from 'socket.io-client'
import * as styles from './BroadcastPage.styles'
import Logo from '@components/Logo/Logo'
import Access from '@components/Access/Access'
import SettingModal from '@components/Modal/SettingModal/SettingModal'
import LoginModal from '@components/Modal/LoginModal/LoginModal'
import ViewerModal from '@components/Modal/ViewerModal/ViewerModal'
import ConfirmModal from '@components/Modal/ConfirmModal/ConfirmModal'
import Chatting from '@components/Chatting/Chatting'
import { themeState } from '@/states/theme'
import { userState } from '@/states/user'
import HlsPlayer from '@components/HlsPlayer/HlsPlayer'

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

interface StreamerInterface {
  title: string
  nickname: string
  viewer: number
}

const BroadcastPage = () => {
  const { id } = useParams()
  const [settingModal, setSettingModal] = useState<boolean>(false)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [viewerModal, setViewerModal] = useState<boolean>(false)
  const [viewerModalInfo, setViewerModalInfo] = useState<ViewerModalProps>({ nickname: '', authority: 'viewer', target: 'viewer', top: 0, left: 0 })
  const [manager, setManager] = useState<Array<string>>([])
  const [chatting, setChatting] = useState<string>('')
  const [chattingList, setChattingList] = useState<Array<ChattingProps>>([])
  const [loginCheckModal, setLoginCheckModal] = useState<boolean>(false)
  const [emptyChattingModal, setEmptyChattingModal] = useState<boolean>(false)
  const [streamer, setStreamer] = useState<StreamerInterface>({ title: '', nickname: '', viewer: 0 })
  const socket = useRef<any>(null)
  const theme = useRecoilValue(themeState)
  const user = useRecoilValue(userState)

  const onSetting = () => {
    setSettingModal(() => !settingModal)
  }

  const onLogin = () => {
    setLoginModal(() => !loginModal)
  }

  const onLogout = () => {
    localStorage.removeItem('user')
    window.location.reload()
  }

  const onViewer = () => {
    setViewerModal(() => !viewerModal)
  }

  const getTarget = (viewerNickname: string): 'viewer' | 'manager' | 'streamer' => {
    if (viewerNickname === streamer.nickname) {
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
    if (user.id === '') {
      setLoginCheckModal(true)
    } else if (chatting.trim() === '') {
      setEmptyChattingModal(true)
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

  const getStreamer = () => {
    fetch(`${import.meta.env.VITE_API_URL}` + `/streams/${id}`, { method: 'GET', credentials: 'include' })
      .then((res) => {
        if (res.ok === true) {
          return res.json()
        } else {
          throw new Error('Get Streamer Data Failed')
        }
      })
      .then((res) => {
        setStreamer({ title: `${res.title === null ? `${res.nickname}의 방송` : res.title}`, nickname: res.nickname, viewer: res.viewer })
      })
      .catch((err) => {
        console.error(err)
        window.location.reload()
      })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getStreamer()
    }, 30000)

    getStreamer()
    socket.current = io(`${import.meta.env.VITE_API_URL}`, { withCredentials: true })
    socket.current.emit('join', { room: id })
    socket.current.on('chat', (chatting: ChattingProps) => {
      setChattingList((chattingList) => [chatting, ...chattingList])
    })

    return () => {
      if (socket.current) {
        socket.current.disconnect()
      }
      if (interval) {
        clearInterval(interval)
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
        {user.id === '' ? (
          <Access leftButton="환경설정" rightButton="로그인" onLeftButton={onSetting} onRightButton={onLogin} />
        ) : (
          <Access leftButton="환경설정" rightButton="로그아웃" onLeftButton={onSetting} onRightButton={onLogout} />
        )}
      </styles.Access>
      <styles.Broadcast>
        <HlsPlayer id={id} />
      </styles.Broadcast>
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
        <styles.Title>{streamer.title}</styles.Title>
        <styles.Nickname>{streamer.nickname}</styles.Nickname>
        <styles.Viewer>시청자 {streamer.viewer.toLocaleString()}명</styles.Viewer>
      </styles.Info>
      {settingModal && <SettingModal onConfirm={onSetting} />}
      {loginModal && <LoginModal onCancle={onLogin} currentTheme={theme} />}
      {viewerModal && (
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
      )}
      {loginCheckModal && (
        <ConfirmModal
          text="로그인을 해주세요"
          onConfrim={() => {
            setLoginCheckModal(false)
          }}
          currentTheme={theme}
        />
      )}
      {emptyChattingModal && (
        <ConfirmModal
          text="채팅을 입력해주세요"
          onConfrim={() => {
            setEmptyChattingModal(false)
          }}
          currentTheme={theme}
        />
      )}
    </styles.Container>
  )
}

export default BroadcastPage
