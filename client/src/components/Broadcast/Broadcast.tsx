import { useRecoilValue } from 'recoil'
import * as styles from './Broadcast.styles'
import { themeState } from '@/states/theme'

interface BroadcastProps {
  title: string
  id: string
  viewer: string
  index: number
}

const Broadcast = ({ title, id, viewer, index }: BroadcastProps) => {
  const theme = useRecoilValue(themeState)
  return (
    <styles.Broadcast index={index} currentTheme={theme}>
      <styles.Thumbnail></styles.Thumbnail>
      <styles.Title>{title}</styles.Title>
      <styles.Id>{id}</styles.Id>
      <styles.Viewer>시청자 {viewer}명</styles.Viewer>
    </styles.Broadcast>
  )
}

export default Broadcast
