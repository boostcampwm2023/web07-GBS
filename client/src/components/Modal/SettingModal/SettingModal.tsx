import { useState } from 'react'
import { useRecoilState } from 'recoil'
import * as styles from './SettingModal.styles'
import { ThemeFlag } from '@/types/theme'
import { themeState } from '@/states/theme'

interface SettingModalProps {
  onConfirm: () => void
}

const SettingModal = ({ onConfirm }: SettingModalProps) => {
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [currentTheme, setTheme] = useRecoilState(themeState)
  const isDarkMode = currentTheme === ThemeFlag.dark

  const toggleTheme = () => {
    setTheme(isDarkMode ? ThemeFlag.light : ThemeFlag.dark)
    localStorage.setItem('theme', `${currentTheme}`)
  }

  return (
    <styles.Backdrop onClick={onConfirm}>
      <styles.ModalContainer>
        <styles.Modal
          onClick={(event) => {
            event.stopPropagation()
          }}
          currentTheme={currentTheme}
        >
          <styles.BodyContainer>
            <styles.HeaderText>마이페이지</styles.HeaderText>
            <styles.BodyText>ID</styles.BodyText>
            <styles.InputContainer>
              <styles.Input
                value={id}
                onChange={(event) => {
                  setId(event.target.value)
                }}
                currentTheme={currentTheme}
              />
              <styles.InputButton currentTheme={currentTheme}>저장하기</styles.InputButton>
            </styles.InputContainer>
            <styles.BodyText>닉네임</styles.BodyText>
            <styles.InputContainer>
              <styles.Input
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
                currentTheme={currentTheme}
              />
              <styles.InputButton currentTheme={currentTheme}>저장하기</styles.InputButton>
            </styles.InputContainer>
            <styles.BodyText>방송 비밀 키</styles.BodyText>
            <styles.InputContainer>
              <styles.Input
                value={password}
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
                currentTheme={currentTheme}
              />
              <styles.InputButton currentTheme={currentTheme}>복사하기</styles.InputButton>
            </styles.InputContainer>
            <styles.Gap />
            <styles.HeaderText>환경설정</styles.HeaderText>
            <styles.SettingContainer>
              <styles.BodyText>다크모드</styles.BodyText>
              <styles.ToggleContainer isDarkMode={isDarkMode} onClick={toggleTheme}>
                <styles.ToggleKnob isDarkMode={isDarkMode} />
              </styles.ToggleContainer>
            </styles.SettingContainer>
          </styles.BodyContainer>
          <styles.ButtonContainer currentTheme={currentTheme}>
            <styles.Button onClick={onConfirm}>확인</styles.Button>
          </styles.ButtonContainer>
        </styles.Modal>
      </styles.ModalContainer>
    </styles.Backdrop>
  )
}
export default SettingModal
