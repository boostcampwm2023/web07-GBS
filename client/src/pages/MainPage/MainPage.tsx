import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as styles from './MainPage.styles'
import Logo from '@components/Logo/Logo'
import Access from '@components/Access/Access'
import Broadcast from '@components/Broadcast/Broadcast'
import SettingModal from '@components/Modal/SettingModal/SettingModal'
import LoginModal from '@components/Modal/LoginModal/LoginModal'
import { useRecoilValue } from 'recoil'
import { themeState } from '@/states/theme'
import EmptyList from '@components/EmptyList/EmptyList'
import useApi from '@/hooks/useApi'

interface BroadcastProps {
  userId: string
  title: string
  category: string
  desc: string
  streamKey: string
  viewer: string
  thumbnail: string
  startedAt: string
  resolution: string
  frameRate: number
}

const MainPage = () => {
  const [response, fetchApi] = useApi()

  const [settingModal, setSettingModal] = useState<boolean>(false)
  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [broadcastList, setBroadcastList] = useState<Array<BroadcastProps>>([])
  const theme = useRecoilValue(themeState)

  const onSetting = () => {
    setSettingModal(() => !settingModal)
  }

  const onLogin = () => {
    setLoginModal(() => !loginModal)
  }

  useEffect(() => {
    if (!response.data) return
    setBroadcastList(response.data.data)
  }, [response])

  useEffect(() => {
    fetchApi('GET', '/streams').then(() => {})
  }, [])

  return (
    <styles.Container>
      <styles.Header>
        <styles.Logo>
          <Link to="/">
            <Logo logo="box" currentTheme={theme} />
          </Link>
        </styles.Logo>
        <styles.Access>
          <Access leftButton="환경설정" rightButton="로그인" onLeftButton={onSetting} onRightButton={onLogin} />
        </styles.Access>
      </styles.Header>
      <styles.List currentTheme={theme} length={broadcastList.length}>
        {broadcastList.length !== 0 ? (
          broadcastList.map((broadcast, index) => (
            <div>
              <Link to={`/${broadcast.userId}`}>
                <Broadcast title={broadcast.title} nickname={''} viewer={broadcast.viewer} index={index} key={index} />
              </Link>
            </div>
          ))
        ) : (
          <EmptyList currentTheme={theme} />
        )}
      </styles.List>
      {settingModal ? <SettingModal onConfirm={onSetting} /> : null}
      {loginModal ? <LoginModal onCancle={onLogin} currentTheme={theme} /> : null}
    </styles.Container>
  )
}

export default MainPage
