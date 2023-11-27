import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as styles from './MainPage.styles'
import Logo from '@components/Logo/Logo'
import Access from '@components/Access/Access'
import Broadcast from '@components/Broadcast/Broadcast'
import RegisterModal from '@components/Modal/RegisterModal/RegisterModal'
import LoginModal from '@components/Modal/LoginModal/LoginModal'
import ThemeSwitch from '@components/ThemeSwitch/ThemeSwitch'
import { useRecoilValue } from 'recoil'
import { themeState } from '@/state/theme'

interface BroadcastProps {
  title: string
  streamerId: string
  viewer: string
}

const MainPage = () => {
  const [registerModal, setRegisterModal] = useState<boolean>(false)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [broadcastList, setBroadcastList] = useState<Array<BroadcastProps>>([])
  const theme = useRecoilValue(themeState)

  const onRegister = () => {
    setRegisterModal(() => !registerModal)
  }

  const onLogin = () => {
    setLoginModal(() => !loginModal)
  }

  useEffect(() => {
    setBroadcastList([
      { title: 'JMH의 방송', streamerId: 'BJ_JMH', viewer: '1,557' },
      { title: '그냥 방송', streamerId: 'BJ_그냥', viewer: '1,601' },
    ])
  }, [])

  return (
    <styles.Container>
      <styles.Logo>
        <Link to="/">
          <Logo logo="box" currentTheme={theme} />
        </Link>
      </styles.Logo>
      <ThemeSwitch />
      <styles.Access>
        <Access leftButton="회원가입" rightButton="로그인" onLeftButton={onRegister} onRightButton={onLogin} />
      </styles.Access>
      <styles.List currentTheme={theme}>
        {broadcastList.map((broadcast, index) => (
          <div>
            <Link to={`/${broadcast.streamerId}`} state={{ title: broadcast.title, streamerId: broadcast.streamerId, viewer: broadcast.viewer }}>
              <Broadcast title={broadcast.title} id={broadcast.streamerId} viewer={broadcast.viewer} index={index} key={index} />
            </Link>
          </div>
        ))}
      </styles.List>
      {registerModal ? <RegisterModal currentTheme={theme} onCancle={onRegister} onConfirm={onRegister} /> : null}
      {loginModal ? <LoginModal currentTheme={theme} onCancle={onLogin} /> : null}
    </styles.Container>
  )
}

export default MainPage
