import React from 'react'
import { useRecoilState } from 'recoil'
import { themeState, ThemeFlag } from '@/state/theme'
import * as styles from './ThemeSwitch.styles'

const ToggleSwitch: React.FC = () => {
  const [currentTheme, setTheme] = useRecoilState(themeState)
  const isDarkMode = currentTheme === ThemeFlag.dark

  const toggleTheme = () => {
    setTheme(isDarkMode ? ThemeFlag.light : ThemeFlag.dark)
  }

  return (
    <styles.ToggleContainer isDarkMode={isDarkMode} onClick={toggleTheme}>
      <styles.ToggleKnob isDarkMode={isDarkMode} />
    </styles.ToggleContainer>
  )
}

export default ToggleSwitch
