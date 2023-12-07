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

interface BroadcastInterface {
  userId: string
  nickname: string
  title: string
  viewer: number
  thumbnail: string
}

const MainPage = () => {
  const [settingModal, setSettingModal] = useState<boolean>(false)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [broadcastList, setBroadcastList] = useState<Array<BroadcastInterface>>([])
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
    fetch(`${import.meta.env.VITE_API_URL}` + '/streams', { method: 'GET', credentials: 'include' })
      .then((res) => {
        if (res.ok === true) {
          return res.json()
        } else {
          throw new Error('Get Streamers Data Failed')
        }
      })
      .then((res) => {
        setBroadcastList(
          res.data.map((broadcast: any): BroadcastInterface => {
            return {
              userId: broadcast.userId,
              nickname: broadcast.nickname,
              title: `${res.title === null ? `${res.nickname}의 방송` : res.title}`,
              viewer: broadcast.viewer,
              thumbnail: broadcast.thumbnail,
            }
          }),
        )
      })
      .catch((err) => {
        console.error(err)
        window.location.reload()
      })
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
            <Link to={`/${broadcast.userId}`} key={index}>
              <Broadcast thumbnail={broadcast.thumbnail} title={broadcast.title} nickname={broadcast.nickname} viewer={broadcast.viewer} index={index} />
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
