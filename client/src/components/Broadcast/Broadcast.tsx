import * as styles from './Broadcast.styles'

interface BroadcastProps {
  title: string
  id: string
  viewer: string
  index: number
}

const Broadcast = ({ title, id, viewer, index }: BroadcastProps) => {
  return (
    <styles.Broadcast index={index}>
      <styles.Thumbnail></styles.Thumbnail>
      <styles.Title>{title}</styles.Title>
      <styles.Id>{id}</styles.Id>
      <styles.Viewer>시청자 {viewer}명</styles.Viewer>
    </styles.Broadcast>
  )
}

export default Broadcast
