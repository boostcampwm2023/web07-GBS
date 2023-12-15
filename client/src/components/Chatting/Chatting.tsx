import * as styles from './Chatting.styles'

interface ChattingProps {
  /**
   * 채팅에 표시될 닉네임
   */
  nickname: string
  /**
   * 채팅에 표시될 메세지 내용
   */
  message: string
  /**
   * nickname을 클릭했을 때 실행될 함수
   */
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
