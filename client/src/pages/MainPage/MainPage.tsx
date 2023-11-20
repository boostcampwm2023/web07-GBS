import { useState } from 'react'
import * as styles from './MainPage.styles'
import Logo from '@components/Logo/Logo'
import Access from '@components/Access/Access'
import RegisterModal from '@components/Modal/RegisterModal/RegisterModal'
import LoginModal from '@components/Modal/LoginModal/LoginModal'

const MainPage = () => {
  const [registerModal, setRegisterModal] = useState<boolean>(false)
  const [loginModal, setLoginModal] = useState<boolean>(false)

  const onRegister = () => {
    setRegisterModal(() => !registerModal)
  }

  const onLogin = () => {
    setLoginModal(() => !loginModal)
  }

  return (
    <styles.Container>
      <styles.Logo onClick={() => location.reload()}>
        <Logo logo="box" />
      </styles.Logo>
      <styles.Access>
        <Access leftButton="회원가입" rightButton="로그인" onLeftButton={onRegister} onRightButton={onLogin} />
      </styles.Access>
      <styles.List></styles.List>
      {registerModal ? <RegisterModal onCancle={onRegister} onConfirm={onRegister} /> : null}
      {loginModal ? <LoginModal onCancle={onLogin} onConfirm={onLogin} /> : null}
    </styles.Container>
  )
}

export default MainPage
