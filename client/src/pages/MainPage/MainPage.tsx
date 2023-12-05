import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import * as styles from './MainPage.styles'
import Logo from '@components/Logo/Logo'
import Access from '@components/Access/Access'
import Broadcast from '@components/Broadcast/Broadcast'
import SettingModal from '@components/Modal/SettingModal/SettingModal'
import LoginModal from '@components/Modal/LoginModal/LoginModal'
import EmptyList from '@components/EmptyList/EmptyList'
import { themeState } from '@/states/theme'
import { userState } from '@/states/user'

interface BroadcastProps {
  id: string
  title: string
  nickname: string
  viewer: string
}

const MainPage = () => {
  const [settingModal, setSettingModal] = useState<boolean>(false)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [broadcastList, setBroadcastList] = useState<Array<BroadcastProps>>([])
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

  useEffect(() => {
    setBroadcastList([
      { id: 'qwer1234', title: 'JMH의 방송', nickname: 'BJ_JMH', viewer: '1,557' },
      { id: '11dnjfqhdks', title: '그냥 방송', nickname: 'BJ_그냥', viewer: '1,601' },
    ])
  }, [])

  return (
    <styles.Container>
      <styles.Header>
        <Link to="/">
          <Logo logo="box" currentTheme={theme} />
        </Link>
        <styles.Access>
          {user.id === '' ? (
            <Access leftButton="환경설정" rightButton="로그인" onLeftButton={onSetting} onRightButton={onLogin} />
          ) : (
            <Access leftButton="환경설정" rightButton="로그아웃" onLeftButton={onSetting} onRightButton={onLogout} />
          )}
        </styles.Access>
      </styles.Header>
      <styles.List currentTheme={theme} length={broadcastList.length}>
        {broadcastList.length !== 0 ? (
          broadcastList.map((broadcast, index) => (
            <Link
              to={`/${broadcast.id}`}
              state={{ id: broadcast.id, title: broadcast.title, nickname: broadcast.nickname, viewer: broadcast.viewer }}
              key={index}
            >
              <Broadcast title={broadcast.title} nickname={broadcast.nickname} viewer={broadcast.viewer} index={index} />
            </Link>
          ))
        ) : (
          <EmptyList currentTheme={theme} />
        )}
      </styles.List>
      {settingModal && <SettingModal onConfirm={onSetting} />}
      {loginModal && <LoginModal onCancle={onLogin} currentTheme={theme} />}
    </styles.Container>
  )
}

export default MainPage
