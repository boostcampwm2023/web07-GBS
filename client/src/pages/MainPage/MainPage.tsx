import { useState, useEffect } from 'react'
import * as styles from './MainPage.styles'
import Logo from '@components/Logo/Logo'
import Access from '@components/Access/Access'
import Broadcast from '@components/Broadcast/Broadcast'
import RegisterModal from '@components/Modal/RegisterModal/RegisterModal'
import LoginModal from '@components/Modal/LoginModal/LoginModal'

interface BroadcastProps {
  title: string
  id: string
  viewer: string
}

const MainPage = () => {
  const [registerModal, setRegisterModal] = useState<boolean>(false)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [broadcastList, setBroadcastList] = useState<Array<BroadcastProps>>([])
  const onRegister = () => {
    setRegisterModal(() => !registerModal)
  }
  const onLogin = () => {
    setLoginModal(() => !loginModal)
  }

  useEffect(() => {
    setBroadcastList([
      { title: 'JMH의 방송', id: 'BJ_JMH', viewer: '1,557' },
      { title: '그냥 방송', id: 'BJ_그냥', viewer: '1,601' },
    ])
  }, [])

  return (
    <styles.Container>
      <styles.Logo onClick={() => location.reload()}>
        <Logo logo="box" />
      </styles.Logo>
      <styles.Access>
        <Access leftButton="회원가입" rightButton="로그인" onLeftButton={onRegister} onRightButton={onLogin} />
      </styles.Access>
      <styles.List>
        {broadcastList.map((broadcast, index) => (
          <Broadcast title={broadcast.title} id={broadcast.id} viewer={broadcast.viewer} index={index} key={index} />
        ))}
      </styles.List>
      {registerModal ? <RegisterModal onCancle={onRegister} onConfirm={onRegister} /> : null}
      {loginModal ? <LoginModal onCancle={onLogin} onConfirm={onLogin} /> : null}
    </styles.Container>
  )
}

export default MainPage
