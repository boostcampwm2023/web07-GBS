import * as styles from './Chatting.styles'

interface ChattingProps {
  id: string
  context: string
}

const Chatting = ({ id, context }: ChattingProps) => {
  return (
    <styles.Chatting>
      <styles.Id>{id}</styles.Id>
      <styles.Text>{context}</styles.Text>
    </styles.Chatting>
  )
}

export default Chatting
