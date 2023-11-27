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
      <styles.Modal>
        <styles.ModalView
          currentTheme={currentTheme}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <styles.Container>
            <styles.HeaderText>회원가입</styles.HeaderText>
            <styles.InputBox>
              <styles.BodyText>ID</styles.BodyText>
              <styles.Input
                currentTheme={currentTheme}
                value={id}
                onChange={(e) => {
                  setId(e.target.value)
                }}
              />
            </styles.InputBox>
            <styles.InputBox>
              <styles.BodyText>비밀번호</styles.BodyText>
              <styles.Input
                currentTheme={currentTheme}
                value={password}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </styles.InputBox>
            <styles.InputBox>
              <styles.BodyText>비밀번호 확인</styles.BodyText>
              <styles.Input
                currentTheme={currentTheme}
                value={confirmPassword}
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
            </styles.InputBox>
          </styles.Container>
          <styles.ButtonContainer currentTheme={currentTheme}>
            <styles.Button onClick={onConfirm} style={{ borderRight: '0.0625rem solid #000000' }}>
              확인
            </styles.Button>
            <styles.Button onClick={onCancle}>취소</styles.Button>
          </styles.ButtonContainer>
        </styles.ModalView>
      </styles.Modal>
    </styles.Backdrop>
  )
}
export default RegisterModal
