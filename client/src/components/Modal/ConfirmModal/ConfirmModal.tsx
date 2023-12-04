import * as styles from './ConfirmModal.styles'
import { ThemeFlag } from '@/states/theme'

interface ConfirmModalProps {
  onCancle: () => void
  currentTheme: ThemeFlag
}

const ConfirmModal = ({ onCancle, currentTheme }: ConfirmModalProps) => {
  return (
    <styles.Backdrop onClick={onCancle}>
      <styles.ModalContainer>
        <styles.Modal
          onClick={(event) => {
            event.stopPropagation()
          }}
          currentTheme={currentTheme}
        >
          <styles.BodyContainer>
            <styles.HeaderText>채팅을 입력하시려면 로그인을 먼저 해주세요!</styles.HeaderText>
          </styles.BodyContainer>
          <styles.ButtonContainer currentTheme={currentTheme}>
            <styles.Button onClick={onCancle}>확인</styles.Button>
          </styles.ButtonContainer>
        </styles.Modal>
      </styles.ModalContainer>
    </styles.Backdrop>
  )
}
export default ConfirmModal
