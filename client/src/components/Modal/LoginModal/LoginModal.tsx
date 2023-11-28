import * as styles from './LoginModal.styles'
import { ThemeFlag } from '@/states/theme'

interface LoginModalProps {
  onCancle: () => void
  currentTheme: ThemeFlag
}

const LoginModal = ({ onCancle, currentTheme }: LoginModalProps) => {
  return (
    <styles.Backdrop onClick={onCancle}>
      <styles.Modal currentTheme={currentTheme}>
        <styles.LoginContainer>
          <styles.HeaderText>로그인</styles.HeaderText>
          <styles.LoginImage
            src="https://static.nid.naver.com/oauth/big_g.PNG?version=js-2.0.1"
            onClick={() => {
              window.open('http://115.85.181.101/oauth/login/naver/callback', '_blank', 'menubar=no, toolbar=no, width=500, height=600')
            }}
          />
        </styles.LoginContainer>
        <styles.ButtonContainer onClick={onCancle} currentTheme={currentTheme}>
          취소
        </styles.ButtonContainer>
      </styles.Modal>
    </styles.Backdrop>
  )
}
export default LoginModal
