import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'
import { ThemeFlag } from '@/states/theme'
import { ThemeInterface } from '@/types/theme'

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`

export const ModalContainer = styled(Backdrop)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const Modal = styled.div<ThemeInterface>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  box-shadow: 0.25rem 0.25rem 0.1875rem rgba(0, 0, 0, 0.1);
  width: 32rem;
  height: max-content;
  background-color: ${(props) => {
    if (props.currentTheme === ThemeFlag.dark) return '#999'
    else return 'white'
  }};
  border-radius: 0.625rem;
`

export const BodyContainer = styled.div`
  padding: 0.9375rem 1.875rem 0.9375rem 1.875rem;
`

export const HeaderText = styled.div`
  ${TYPO.BOLD_M}
  margin-bottom: 0.9375rem;
  line-height: 2.25rem;
`

export const BodyText = styled.div`
  ${TYPO.MEDIUM_M}
  display: flex;
  line-height: 2.25rem;
`

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 2.25rem;
  margin-bottom: 0.625rem;
`

export const Input = styled.input<ThemeInterface>`
  ${TYPO.LIGHT_M}
  border: none;
  height: 2.25rem;
  background-color: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '#e6e6e6'
    else return '#808080'
  }};
  border-radius: 0.625rem;
  padding: 0rem 0.625rem 0rem 0.625rem;
`

export const InputButton = styled.div<ThemeInterface>`
  ${TYPO.LIGHT_M}
  width: max-content;
  height: 2.25rem;
  line-height: 2.25rem;
  background-color: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '#e6e6e6'
    else return '#808080'
  }};
  border: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  border-radius: 0.625rem;
  padding: 0rem 0.625rem 0rem 0.625rem;
  cursor: pointer;
`

export const Gap = styled.div`
  width: 100%;
  height: 1rem;
`

export const SettingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 2.25rem;
  margin-bottom: 0.9375rem;
`

export const ToggleContainer = styled.div<{ isDarkMode: boolean }>`
  cursor: pointer;
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#333' : '#ddd')};
  border-radius: 1rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  width: 5rem; // rem 단위 사용
  height: 2.25rem; // rem 단위 사용
  position: relative;
  transition: background-color 0.2s ease;
  border: ${({ isDarkMode }) => (isDarkMode ? '0.0625rem solid #555' : '0.0625rem solid #aaa')};
`

export const ToggleKnob = styled.div<{ isDarkMode: boolean }>`
  background-color: white;
  border-radius: 50%;
  width: 1.8rem; // rem 단위 사용
  height: 1.8rem; // rem 단위 사용
  position: absolute;
  transition: transform 0.2s ease;
  ${({ isDarkMode }) => isDarkMode && `transform: translateX(2.7rem);`}
`

export const ButtonContainer = styled.div<ThemeInterface>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  bottom: 0rem;
  width: 100%;
  height: 4.6875rem;
`

export const Button = styled.div`
  ${TYPO.MEDIUM_M}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
`
