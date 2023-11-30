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

  const onSetting = () => {
    setSettingModal(() => !settingModal)
  }

  const onLogin = () => {
    setLoginModal(() => !loginModal)
  }

  useEffect(() => {
    setBroadcastList([
      { id: 'qwer1234', title: 'JMH의 방송', nickname: 'BJ_JMH', viewer: '1,557' },
      { id: '11dnjfqhdks', title: '그냥 방송', nickname: 'BJ_그냥', viewer: '1,601' },
    ])
  }, [])

  return (
    <styles.Container>
      <styles.Logo>
        <Link to="/">
          <Logo logo="box" currentTheme={theme} />
        </Link>
      </styles.Logo>
      <styles.Access>
        <Access leftButton="환경설정" rightButton="로그인" onLeftButton={onSetting} onRightButton={onLogin} />
      </styles.Access>
      <styles.List currentTheme={theme}>
        {broadcastList.map((broadcast, index) => (
          <div>
            <Link to={`/${broadcast.id}`} state={{ title: broadcast.title, nickname: broadcast.nickname, viewer: broadcast.viewer }}>
              <Broadcast title={broadcast.title} nickname={broadcast.nickname} viewer={broadcast.viewer} index={index} key={index} />
            </Link>
          </div>
        ))}
      </styles.List>
      {settingModal ? <SettingModal onConfirm={onSetting} /> : null}
      {loginModal ? <LoginModal onCancle={onLogin} currentTheme={theme} /> : null}
    </styles.Container>
  )
}

export default MainPage
