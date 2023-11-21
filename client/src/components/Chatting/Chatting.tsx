import * as styles from './Chatting.styles'

interface ChattingProps {
  id: string
  context: string
  onId: (event: React.MouseEvent<HTMLInputElement>) => void
}

const Chatting = ({ id, context, onId }: ChattingProps) => {
  return (
    <styles.Chatting>
      <styles.Id onClick={onId}>{id}</styles.Id>
      <styles.Text>{context}</styles.Text>
    </styles.Chatting>
  )
}

export default Chatting
