import { useState } from 'react'
import * as styles from './BroadcastPage.styles'
import Logo from '@components/Logo/Logo'
import Access from '@components/Access/Access'
import Chatting from '@components/Chatting/Chatting'
import RegisterModal from '@components/Modal/RegisterModal/RegisterModal'
import LoginModal from '@components/Modal/LoginModal/LoginModal'

const BroadcastPage = () => {
  const [chatting, setChatting] = useState<string>('')
  const [chattingList, setChattingList] = useState<Array<string>>([])
  const [registerModal, setRegisterModal] = useState<boolean>(false)
  const [loginModal, setLoginModal] = useState<boolean>(false)

  const onSend = () => {
    if (chatting.trim() === '') {
      alert('채팅을 입력해주세요.')
    } else {
      setChattingList([chatting, ...chattingList])
    }

    setChatting('')
  }

  const onRegister = () => {
    setRegisterModal(true)
    setLoginModal(false)
  }

  const onLogin = () => {
    setRegisterModal(false)
    setLoginModal(true)
  }

  return (
    <styles.Container>
      <styles.Logo onClick={() => location.reload()}>
        <Logo logo="wide" />
      </styles.Logo>
      <styles.Access>
        <Access leftButton="회원가입" rightButton="로그인" onLeftButton={onRegister} onRightButton={onLogin} />
      </styles.Access>
      <styles.Broadcast></styles.Broadcast>
      <styles.Chatting>
        <styles.ChattingList>
          {chattingList.map((chat, index) => (
            <Chatting id="JMH" context={chat} key={index} />
          ))}
        </styles.ChattingList>
        <styles.ChattingInput>
          <styles.InputBox value={chatting} onChange={(event) => setChatting(event.target.value)}></styles.InputBox>
          <styles.InputSend onClick={onSend}>등록하기</styles.InputSend>
        </styles.ChattingInput>
      </styles.Chatting>
      <styles.Info>
        <styles.InfoTitle>JMH의 게임 방송</styles.InfoTitle>
        <styles.InfoViewer>BJ_JMH</styles.InfoViewer>
        <styles.InfoID>시청자 1,557명</styles.InfoID>
      </styles.Info>
      {registerModal ? <RegisterModal onCancle={() => setRegisterModal(false)} onConfirm={() => setRegisterModal(false)} /> : null}
      {loginModal ? <LoginModal onCancle={() => setLoginModal(false)} onConfirm={() => setLoginModal(false)} /> : null}
    </styles.Container>
  )
}

export default BroadcastPage
