import * as styles from './ConfirmModal.styles'
import { ThemeFlag } from '@/states/theme'

interface ConfirmModalProps {
  onConfrim: () => void
  currentTheme: ThemeFlag
  text: string
}

const ConfirmModal = ({ onConfrim, currentTheme, text }: ConfirmModalProps) => {
  return (
    <styles.Backdrop onClick={onConfrim}>
      <styles.ModalContainer>
        <styles.Modal
          onClick={(event) => {
            event.stopPropagation()
          }}
          currentTheme={currentTheme}
        >
          <styles.BodyContainer>
            <styles.HeaderText>{text}</styles.HeaderText>
          </styles.BodyContainer>
          <styles.ButtonContainer currentTheme={currentTheme}>
            <styles.Button onClick={onConfrim}>확인</styles.Button>
          </styles.ButtonContainer>
        </styles.Modal>
      </styles.ModalContainer>
    </styles.Backdrop>
  )
}
export default ConfirmModal
