import { useState } from 'react'
import * as styles from './BroadcastPage.styles'
import Logo from '@components/Logo/Logo'
import Access from '@components/Access/Access'

const BroadcastPage = () => {
  const [title, setTitle] = useState<string>('JMH의 게임 방송')
  const [id, setId] = useState<string>('BJ_JMH')
  const [viewer, setViewer] = useState<string>('1,557')

  return (
    <styles.Container>
      <styles.Logo onClick={() => location.reload()}>
        <Logo logo="wide" />
      </styles.Logo>
      <styles.Access>
        <Access leftButton="회원가입" rightButton="로그인" />
      </styles.Access>
      <styles.Broadcast></styles.Broadcast>
      <styles.Chatting>
        <styles.ChattingList></styles.ChattingList>
        <styles.ChattingInput>
          <styles.InputBox></styles.InputBox>
          <styles.InputSend>등록하기</styles.InputSend>
        </styles.ChattingInput>
      </styles.Chatting>
      <styles.Info>
        <styles.InfoTitle>{title}</styles.InfoTitle>
        <styles.InfoViewer>{id}</styles.InfoViewer>
        <styles.InfoID>시청자 {viewer}명</styles.InfoID>
      </styles.Info>
    </styles.Container>
  )
}

export default BroadcastPage
