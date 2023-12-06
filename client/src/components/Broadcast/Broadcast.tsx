import { useRecoilValue } from 'recoil'
import * as styles from './Broadcast.styles'
import { themeState } from '@/states/theme'

interface BroadcastProps {
  thumbnail: string
  title: string
  nickname: string
  viewer: number
  index: number
}

const Broadcast = ({ thumbnail, title, nickname, viewer, index }: BroadcastProps) => {
  const theme = useRecoilValue(themeState)

  return (
    <styles.Broadcast index={index} currentTheme={theme}>
      <styles.Thumbnail src={thumbnail} />
      <styles.Title>{title}</styles.Title>
      <styles.Nickname>{nickname}</styles.Nickname>
      <styles.Viewer>시청자 {viewer}명</styles.Viewer>
    </styles.Broadcast>
  )
}

export default Broadcast
