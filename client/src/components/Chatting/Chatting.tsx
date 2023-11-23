import * as styles from './Chatting.styles'

interface ChattingProps {
  id: string
  message: string
  onId: (event: React.MouseEvent<HTMLInputElement>) => void
}

const Chatting = ({ id, message, onId }: ChattingProps) => {
  return (
    <styles.Chatting>
      <styles.Id onClick={onId}>{id}</styles.Id>
      <styles.Text>{message}</styles.Text>
    </styles.Chatting>
  )
}

export default Chatting
