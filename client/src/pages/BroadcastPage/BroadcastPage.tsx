import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as styles from './BroadcastPage.styles'
import Logo from '@components/Logo/Logo'
import Access from '@components/Access/Access'
import RegisterModal from '@components/Modal/RegisterModal/RegisterModal'
import LoginModal from '@components/Modal/LoginModal/LoginModal'
import ViewerModal from '@components/Modal/ViewerModal/ViewerModal'
import Chatting from '@components/Chatting/Chatting'

interface BroadcastProps {
  title: string
  id: string
  viewer: string
}

interface ViewerModalProps {
  id: string
  authority: 'viewer' | 'manager' | 'streamer'
  target: 'viewer' | 'manager' | 'streamer'
  top: number
  left: number
}

const BroadcastPage = () => {
  const location = useLocation()
  const { title, id, viewer }: BroadcastProps = location.state
  const [registerModal, setRegisterModal] = useState<boolean>(false)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [viewerModal, setViewerModal] = useState<boolean>(false)
  const [viewerModalInfo, setViewerModalInfo] = useState<ViewerModalProps>({ id: '', authority: 'viewer', target: 'viewer', top: 0, left: 0 })
  const [chatting, setChatting] = useState<string>('')
  const [chattingList, setChattingList] = useState<Array<string>>([])

  const onRegister = () => {
    setRegisterModal(true)
  }

  const onLogin = () => {
    setLoginModal(true)
  }

  const onId = (event: React.MouseEvent<HTMLInputElement>) => {
    const id = event.currentTarget.innerText
    const authority = 'streamer'
    const target = 'viewer'
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

  const onSend = () => {
    if (chatting.trim() === '') {
      alert('채팅을 입력해주세요.')
    } else {
      setChattingList([chatting, ...chattingList])
    }

    setChatting('')
  }

  return (
    <styles.Container>
      <styles.Logo>
        <Link to="/">
          <Logo logo="wide" />
        </Link>
      </styles.Logo>
      <styles.Access>
        <Access leftButton="회원가입" rightButton="로그인" onLeftButton={onRegister} onRightButton={onLogin} />
      </styles.Access>
      <styles.Broadcast></styles.Broadcast>
      <styles.Chatting>
        <styles.ChattingList>
          {chattingList.map((chatting, index) => (
            <Chatting id="JMH" context={chatting} onId={onId} key={index} />
          ))}
        </styles.ChattingList>
        <styles.Input>
          <styles.Text onChange={(event) => setChatting(event.target.value)} value={chatting}></styles.Text>
          <styles.Send onClick={onSend}>등록하기</styles.Send>
        </styles.Input>
      </styles.Chatting>
      <styles.Info>
        <styles.Title>{title}</styles.Title>
        <styles.Viewer>{id}</styles.Viewer>
        <styles.Id>시청자 {viewer}명</styles.Id>
      </styles.Info>
      {registerModal ? <RegisterModal onCancle={onBackdrop} onConfirm={onBackdrop} /> : null}
      {loginModal ? <LoginModal onCancle={onBackdrop} onConfirm={onBackdrop} /> : null}
      {viewerModal ? (
        <ViewerModal
          id={viewerModalInfo.id}
          authority={viewerModalInfo.authority}
          target={viewerModalInfo.target}
          top={viewerModalInfo.top}
          left={viewerModalInfo.left}
          onCancle={onBackdrop}
          onConfirm={onBackdrop}
        />
      ) : null}
    </styles.Container>
  )
}

export default BroadcastPage
