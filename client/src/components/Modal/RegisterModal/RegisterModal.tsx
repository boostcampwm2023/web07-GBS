import { useState } from 'react'
import * as styles from './RegisterModal.styles'
import { ThemeFlag } from '@/states/theme'

interface RegisterModalProps {
  onCancle: () => void
  onConfirm: () => void
  currentTheme: ThemeFlag
}

const RegisterModal = ({ onCancle, onConfirm, currentTheme }: RegisterModalProps) => {
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  return (
    <styles.Backdrop onClick={onCancle}>
      <styles.ModalContainer>
        <styles.Modal
          onClick={(event) => {
            event.stopPropagation()
          }}
          currentTheme={currentTheme}
        >
          <styles.RegisterContainer>
            <styles.HeaderText>회원가입</styles.HeaderText>
            <styles.InputBox>
              <styles.BodyText>ID</styles.BodyText>
              <styles.Input
                value={id}
                onChange={(event) => {
                  setId(event.target.value)
                }}
                currentTheme={currentTheme}
              />
            </styles.InputBox>
            <styles.InputBox>
              <styles.BodyText>비밀번호</styles.BodyText>
              <styles.Input
                value={password}
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
                currentTheme={currentTheme}
              />
            </styles.InputBox>
            <styles.InputBox>
              <styles.BodyText>비밀번호 확인</styles.BodyText>
              <styles.Input
                value={confirmPassword}
                type="password"
                onChange={(event) => {
                  setConfirmPassword(event.target.value)
                }}
                currentTheme={currentTheme}
              />
            </styles.InputBox>
          </styles.RegisterContainer>
          <styles.ButtonContainer currentTheme={currentTheme}>
            <styles.Button onClick={onConfirm}>확인</styles.Button>
            <styles.Button onClick={onCancle}>취소</styles.Button>
          </styles.ButtonContainer>
        </styles.Modal>
      </styles.ModalContainer>
    </styles.Backdrop>
  )
}
export default RegisterModal
