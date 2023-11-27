import * as styles from './LoginModal.styles'
import { ThemeFlag } from '@/state/theme'

interface LoginModalProps {
  onCancle: () => void
  onConfirm: () => void
  currentTheme: ThemeFlag
}

const LoginModal = ({ onCancle, onConfirm, currentTheme }: LoginModalProps) => {
  return (
    <styles.Backdrop onClick={onCancle}>
      <styles.Modal>
        <styles.ModalView
          currentTheme={currentTheme}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <styles.Login></styles.Login>
          <styles.Button currentTheme={currentTheme}>취소</styles.Button>
        </styles.ModalView>
      </styles.Modal>
    </styles.Backdrop>
  )
}
export default LoginModal
