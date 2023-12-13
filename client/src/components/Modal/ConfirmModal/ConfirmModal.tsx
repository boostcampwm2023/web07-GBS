import { useState } from 'react'
import * as styles from './ConfirmModal.styles'
import { ThemeFlag } from '@/types/theme'

interface ConfirmModalProps {
  text: string
  onConfirm: () => void
  currentTheme: ThemeFlag
}

const ConfirmModal = ({ text, onConfirm, currentTheme }: ConfirmModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const onClick = () => {
    setIsOpen(false)
    onConfirm()
  }

  return (
    <styles.Backdrop onClick={onClick} isOpen={isOpen}>
      <styles.ModalContainer isOpen={isOpen}>
        <styles.Modal
          onClick={(event) => {
            event.stopPropagation()
          }}
          isOpen={isOpen}
          currentTheme={currentTheme}
        >
          <styles.BodyContainer>
            <styles.HeaderText>경고</styles.HeaderText>
            <styles.BodyText>{text}</styles.BodyText>
          </styles.BodyContainer>
          <styles.ButtonContainer currentTheme={currentTheme}>
            <styles.Button onClick={onClick}>확인</styles.Button>
          </styles.ButtonContainer>
        </styles.Modal>
      </styles.ModalContainer>
    </styles.Backdrop>
  )
}
export default ConfirmModal
