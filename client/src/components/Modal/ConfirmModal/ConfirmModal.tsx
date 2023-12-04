import * as styles from './ConfirmModal.styles'
import { ThemeFlag } from '@/states/theme'

interface ConfirmModalProps {
  text: string
  onConfrim: () => void
  currentTheme: ThemeFlag
}

const ConfirmModal = ({ text, onConfrim, currentTheme }: ConfirmModalProps) => {
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
            <styles.HeaderText>경고</styles.HeaderText>
            <styles.BodyText>{text}</styles.BodyText>
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
