import * as styles from './Chatting.styles'

interface ChattingProps {
  nickname: string
  message: string
  onNickname: (event: React.MouseEvent<HTMLInputElement>) => void
}

const Chatting = ({ nickname, message, onNickname }: ChattingProps) => {
  return (
    <styles.Chatting>
      <styles.Nickname onClick={onNickname}>{nickname}</styles.Nickname>
      <styles.Message>{message}</styles.Message>
    </styles.Chatting>
  )
}

export default Chatting
