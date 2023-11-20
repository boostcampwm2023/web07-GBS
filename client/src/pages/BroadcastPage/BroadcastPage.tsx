import { useState } from 'react'
import * as styles from './BroadcastPage.styles'
import Logo from '@components/Logo/Logo'
import Access from '@components/Access/Access'
import Chatting from '@components/Chatting/Chatting'
import RegisterModal from '@components/Modal/RegisterModal/RegisterModal'
import LoginModal from '@components/Modal/LoginModal/LoginModal'

const BroadcastPage = () => {
  const [registerModal, setRegisterModal] = useState<boolean>(false)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [chatting, setChatting] = useState<string>('')
  const [chattingList, setChattingList] = useState<Array<string>>([])
  const onRegister = () => {
    setRegisterModal(() => !registerModal)
  }
  const onLogin = () => {
    setLoginModal(() => !loginModal)
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
      <styles.Logo onClick={() => location.reload()}>
        <Logo logo="wide" />
      </styles.Logo>
      <styles.Access>
        <Access leftButton="회원가입" rightButton="로그인" onLeftButton={onRegister} onRightButton={onLogin} />
      </styles.Access>
      <styles.Broadcast></styles.Broadcast>
      <styles.Chatting>
        <styles.ChattingList>
          {chattingList.map((chatting, index) => (
            <Chatting id="JMH" context={chatting} key={index} />
          ))}
        </styles.ChattingList>
        <styles.Input>
          <styles.Text value={chatting} onChange={(event) => setChatting(event.target.value)}></styles.Text>
          <styles.Send onClick={onSend}>등록하기</styles.Send>
        </styles.Input>
      </styles.Chatting>
      <styles.Info>
        <styles.Title>JMH의 게임 방송</styles.Title>
        <styles.Viewer>BJ_JMH</styles.Viewer>
        <styles.Id>시청자 1,557명</styles.Id>
      </styles.Info>
      {registerModal ? <RegisterModal onCancle={onRegister} onConfirm={onRegister} /> : null}
      {loginModal ? <LoginModal onCancle={onLogin} onConfirm={onLogin} /> : null}
    </styles.Container>
  )
}

export default BroadcastPage
