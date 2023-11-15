import * as styles from './BroadcastPage.styles'
import AccessComponent from '/src/components/AccessComponent/AccessComponent'

const BroadcastPage = () => {
  return (
    <styles.Container>
      <styles.Logo src="/src/assets/images/wide-logo.svg" />
      <styles.Access>
        <AccessComponent leftButton="회원가입" rightButton="로그인" />
      </styles.Access>
      <styles.Broadcast></styles.Broadcast>
      <styles.Chatting>
        <styles.ChattingList></styles.ChattingList>
        <styles.ChattingInput></styles.ChattingInput>
      </styles.Chatting>
      <styles.Info></styles.Info>
    </styles.Container>
  )
}

export default BroadcastPage
