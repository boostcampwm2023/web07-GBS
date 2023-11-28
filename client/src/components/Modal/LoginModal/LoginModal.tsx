import { Link } from 'react-router-dom'
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
          <Link to="http://115.85.181.101/oauth/login/naver" target="_blank">
            <styles.LoginImage src="/images/naver-login.png" />
          </Link>
        </styles.LoginContainer>
        <styles.ButtonContainer onClick={onCancle} currentTheme={currentTheme}>
          취소
        </styles.ButtonContainer>
      </styles.Modal>
    </styles.Backdrop>
  )
}
export default LoginModal
