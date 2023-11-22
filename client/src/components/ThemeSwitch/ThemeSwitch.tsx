// src/components/ToggleSwitch.tsx
import React from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { themeState, ThemeFlag } from '@/state/theme'

const ToggleContainer = styled.div<{ isDarkMode: boolean }>`
  cursor: pointer;
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#333' : '#ddd')};
  border-radius: 20px; // 정적인 값으로 유지할 수 있음
  padding: 0.3rem; // rem 단위 사용
  display: flex;
  align-items: center;
  width: 6rem; // rem 단위 사용
  height: 3.5rem; // rem 단위 사용
  position: relative;
  transition: background-color 0.3s ease;
  border: ${({ isDarkMode }) => (isDarkMode ? '1px solid #555' : '1px solid #aaa')};
`

const ToggleKnob = styled.div<{ isDarkMode: boolean }>`
  background-color: white;
  border-radius: 50%;
  width: 2rem; // rem 단위 사용
  height: 2rem; // rem 단위 사용
  position: absolute;
  left: 5px;
  transition: transform 0.3s ease;

  ${({ isDarkMode }) => isDarkMode && `transform: translateX(2rem);`}
`

const ToggleSwitch: React.FC = () => {
  const [currentTheme, setTheme] = useRecoilState(themeState)
  const isDarkMode = currentTheme === ThemeFlag.dark

  const toggleTheme = () => {
    setTheme(isDarkMode ? ThemeFlag.light : ThemeFlag.dark)
  }

  return (
    <ToggleContainer isDarkMode={isDarkMode} onClick={toggleTheme}>
      <ToggleKnob isDarkMode={isDarkMode} />
    </ToggleContainer>
  )
}

export default ToggleSwitch
