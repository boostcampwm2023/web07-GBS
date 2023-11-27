import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import * as styles from './BroadcastPage.styles'
import Logo from '@components/Logo/Logo'
import Access from '@components/Access/Access'
import RegisterModal from '@components/Modal/RegisterModal/RegisterModal'
import LoginModal from '@components/Modal/LoginModal/LoginModal'
import ViewerModal from '@components/Modal/ViewerModal/ViewerModal'
import Chatting from '@components/Chatting/Chatting'
import ToggleSwitch from '@components/ThemeSwitch/ThemeSwitch'
import { useRecoilValue } from 'recoil'
import { themeState } from '@/state/theme'

interface BroadcastProps {
  title: string
  streamerId: string
  viewer: string
}

interface ViewerModalProps {
  id: string
  authority: 'viewer' | 'manager' | 'streamer'
  target: 'viewer' | 'manager' | 'streamer'
  top: number
  left: number
}

interface ChattingProps {
  id: string
  message: string
}

const BroadcastPage = () => {
  const location = useLocation()
  const { title, streamerId, viewer }: BroadcastProps = location.state
  const [registerModal, setRegisterModal] = useState<boolean>(false)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [viewerModal, setViewerModal] = useState<boolean>(false)
  const [viewerModalInfo, setViewerModalInfo] = useState<ViewerModalProps>({ id: '', authority: 'viewer', target: 'viewer', top: 0, left: 0 })
  const [manager, setManager] = useState<Array<string>>([])
  const [chatting, setChatting] = useState<string>('')
  const theme = useRecoilValue(themeState)
  const [chattingList, setChattingList] = useState<Array<ChattingProps>>([])
  const socket = io('http://localhost:5000')

  const onRegister = () => {
    setRegisterModal(true)
  }

  const onLogin = () => {
    setLoginModal(true)
  }

  const getTarget = (id: string): 'viewer' | 'manager' | 'streamer' => {
    if (id === streamerId) {
      return 'streamer'
    } else if (manager.indexOf(id) !== -1) {
      return 'manager'
    }

    return 'viewer'
  }

  const onId = (event: React.MouseEvent<HTMLInputElement>) => {
    const id = event.currentTarget.innerText
    const authority = 'streamer'
    const target = getTarget(id)
    const top = event.pageY
    const left = event.pageX

    setViewerModalInfo({ id: id, authority: authority, target: target, top: top, left: left })
    setViewerModal(true)
  }

  const onBackdrop = () => {
    setRegisterModal(false)
    setLoginModal(false)
    setViewerModal(false)
  }

  const onManager = (id: string) => {
    const index = manager.indexOf(id)

    if (index === -1) {
      setManager([...manager, id])
    } else {
      setManager(manager.filter((manager) => manager !== id))
    }

    setViewerModal(false)
  }

  const onSend = () => {
    if (chatting.trim() === '') {
      alert('채팅을 입력해주세요.')
    } else {
      socket.emit('send', { id: 'JMH', message: chatting, room: streamerId })
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
    socket.emit('join', streamerId)

    socket.on('receive', (chatting: ChattingProps) => {
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
      <styles.Switch>
        <ToggleSwitch />
      </styles.Switch>
      <styles.Access>
        <Access leftButton="회원가입" rightButton="로그인" onLeftButton={onRegister} onRightButton={onLogin} />
      </styles.Access>
      <styles.Broadcast></styles.Broadcast>
      <styles.Chatting currentTheme={theme}>
        <styles.ChattingList>
          {chattingList.map((chatting, index) => (
            <Chatting id={chatting.id} message={chatting.message} onId={onId} key={index} />
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
        <styles.Viewer>{streamerId}</styles.Viewer>
        <styles.Id>시청자 {viewer}명</styles.Id>
      </styles.Info>
      {registerModal ? <RegisterModal onCancle={onBackdrop} onConfirm={onBackdrop} currentTheme={theme} /> : null}
      {loginModal ? <LoginModal onCancle={onBackdrop} currentTheme={theme} /> : null}
      {viewerModal ? (
        <ViewerModal
          id={viewerModalInfo.id}
          authority={viewerModalInfo.authority}
          target={viewerModalInfo.target}
          top={viewerModalInfo.top}
          left={viewerModalInfo.left}
          onCancle={onBackdrop}
          onManager={onManager}
          onKick={onBackdrop}
          currentTheme={theme}
        />
      ) : null}
    </styles.Container>
  )
}

export default BroadcastPage
