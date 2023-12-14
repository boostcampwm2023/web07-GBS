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
import { filterState } from '@/states/filter'
import { userState } from '@/states/user'
import HlsPlayer from '@components/HlsPlayer/HlsPlayer'

interface ViewerModalInterface {
  nickname: string
  authority: 'viewer' | 'streamer'
  target: 'viewer' | 'streamer'
  top: number
  left: number
}

interface ChattingInterface {
  nickname: string
  message: string
}

interface KickInterface {
  nickname: string
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
  const [viewerModalInfo, setViewerModalInfo] = useState<ViewerModalInterface>({ nickname: '', authority: 'viewer', target: 'viewer', top: 0, left: 0 })
  const [chatting, setChatting] = useState<string>('')
  const [chattingList, setChattingList] = useState<Array<ChattingInterface>>([])
  const [confirmModal, setConfirmModal] = useState<boolean>(false)
  const [confirmModalMessage, setConfirmModalMessage] = useState<string>('')
  const [streamer, setStreamer] = useState<StreamerInterface>({ title: '', nickname: '', viewer: 0 })
  const socket = useRef<any>(null)
  const theme = useRecoilValue(themeState)
  const filter = useRecoilValue(filterState)
  const user = useRecoilValue(userState)

  const onSetting = (changeUser: boolean) => {
    if (settingModal === true) {
      setTimeout(() => {
        setSettingModal(false)
      }, 190)
    } else {
      setSettingModal(true)
    }

    if (changeUser === true) {
      if (socket.current) {
        socket.current.disconnect()
      }

      socket.current = io(`${import.meta.env.VITE_API_URL}`, { withCredentials: true })
      socket.current.emit('join', { room: id })
      socket.current.on('chat', (chatting: ChattingInterface) => {
        setChattingList((chattingList) => [chatting, ...chattingList])
      })
      socket.current.on('kick', (kickInfo: KickInterface) => {
        if (user.nickname === kickInfo.nickname) {
          setConfirmModalMessage('방송에서 강퇴되었습니다.')
          setConfirmModal(true)
        }
      })
    }
  }

  const onLogin = () => {
    if (loginModal === true) {
      setTimeout(() => {
        setLoginModal(false)
      }, 190)
    } else {
      setLoginModal(true)
    }
  }

  const onLogout = () => {
    localStorage.removeItem('user')
    window.location.reload()
  }

  const onViewer = () => {
    if (viewerModal === true) {
      setTimeout(() => {
        setViewerModal(false)
      }, 190)
    } else {
      setViewerModal(true)
    }
  }

  const onKick = (viewerNickname: string) => {
    socket.current.emit('kick', { nickname: viewerNickname })
    onViewer()
  }

  const onNickname = (event: React.MouseEvent<HTMLInputElement>) => {
    const viewerNickname = event.currentTarget.innerText
    const authority = getAuthority()
    const target = getTarget(viewerNickname)
    const top = event.pageY
    const left = event.pageX

    setViewerModalInfo({ nickname: viewerNickname, authority: authority, target: target, top: top, left: left })
    onViewer()
  }

  const onChat = () => {
    if (user.id === '') {
      setConfirmModalMessage('채팅을 입력하기 전 로그인을 해주세요.')
      setConfirmModal(true)
    }
  }

  const onSend = () => {
    if (user.id === '') {
      setConfirmModalMessage('채팅을 입력하기 전 로그인을 해주세요.')
      setConfirmModal(true)
    } else if (chatting.trim() === '') {
      setConfirmModalMessage('채팅을 입력해주신 후 보내주세요.')
      setConfirmModal(true)
    } else if (chatting.trim().length > 50) {
      setConfirmModalMessage('채팅은 최대 50글자까지 보낼 수 있습니다.')
      setConfirmModal(true)
    } else {
      socket.current.emit('chat', { message: chatting, useFilter: filter })
    }
    setChatting('')
  }

  const onEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.nativeEvent.isComposing || settingModal === true || loginModal === true || viewerModal === true || confirmModal === true) {
      return
    } else if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault()
      onSend()
    }
  }

  const onConfirm = () => {
    setTimeout(() => {
      setConfirmModal(false)
    }, 190)

    if (confirmModalMessage === '채팅을 입력하기 전 로그인을 해주세요.') {
      onLogin()
    } else if (confirmModalMessage === '방송 정보를 가져오는데 실패했습니다.' || confirmModalMessage === '방송에서 강퇴되었습니다.') {
      window.location.replace('/')
    }
  }

  const getAuthority = (): 'viewer' | 'streamer' => {
    if (user.nickname === streamer.nickname) {
      return 'streamer'
    } else {
      return 'viewer'
    }
  }

  const getTarget = (viewerNickname: string): 'viewer' | 'streamer' => {
    if (viewerNickname === streamer.nickname) {
      return 'streamer'
    } else {
      return 'viewer'
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
        setConfirmModalMessage('방송 정보를 가져오는데 실패했습니다.')
        setConfirmModal(true)
      })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getStreamer()
    }, 30000)

    getStreamer()
    socket.current = io(`${import.meta.env.VITE_API_URL}`, { withCredentials: true })
    socket.current.emit('join', { room: id })
    socket.current.on('chat', (chatting: ChattingInterface) => {
      setChattingList((chattingList) => [chatting, ...chattingList])
    })
    socket.current.on('kick', (kickInfo: KickInterface) => {
      if (user.nickname === kickInfo.nickname) {
        setConfirmModalMessage('방송에서 강퇴되었습니다.')
        setConfirmModal(true)
      }
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
          <styles.Chat
            value={chatting}
            onClick={onChat}
            onChange={(event) => setChatting(event.target.value)}
            onKeyDown={onEnter}
            currentTheme={theme}
          ></styles.Chat>
          <styles.Send onClick={onSend} currentTheme={theme}>
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
          onKick={onKick}
          currentTheme={theme}
        />
      )}
      {confirmModal && <ConfirmModal text={confirmModalMessage} onConfirm={onConfirm} currentTheme={theme} />}
    </styles.Container>
  )
}

export default BroadcastPage
