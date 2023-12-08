import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'
import { ThemeFlag, ThemeInterface } from '@/types/theme'

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
    else return '#ffffff'
  }};
  border-radius: 0.625rem;
`

export const BodyContainer = styled.div`
  padding: 0.9375rem 1.875rem 0.9375rem 1.875rem;
`

export const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  margin-bottom: 0.9375rem;
`

export const HeaderText = styled.div`
  ${TYPO.BOLD_M}
  margin-top: 0.625rem;
  line-height: 2.25rem;
`

export const BodyText = styled.div`
  ${TYPO.MEDIUM_M}
  display: flex;
  line-height: 2.25rem;
  margin-top: 0.625rem;
`

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 2.25rem;
`

export const Input = styled.input<ThemeInterface>`
  ${TYPO.LIGHT_M}
  border: none;
  width: 21.0625rem;
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
  width: 6.25rem;
  height: 2.25rem;
  line-height: 2.25rem;
  border: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  box-shadow: 0.25rem 0.25rem 0.1875rem rgba(0, 0, 0, 0.1);
  background-color: ${(props) => {
    if (props.currentTheme === ThemeFlag.dark) return '#999'
    else return '#ffffff'
  }};
  border-radius: 0.625rem;
  cursor: pointer;
`

export const SettingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 2.25rem;
  margin-top: 0.625rem;
`

export const ToggleContainer = styled.div<{ isToggle: boolean }>`
  cursor: pointer;
  background-color: ${({ isToggle }) => (isToggle ? '#333' : '#ddd')};
  border-radius: 1rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  width: 5rem;
  height: 2.25rem;
  position: relative;
  transition: background-color 0.2s ease;
  border: ${({ isToggle }) => (isToggle ? '0.0625rem solid #555' : '0.0625rem solid #aaa')};
`

export const ToggleKnob = styled.div<{ isToggle: boolean }>`
  background-color: #ffffff;
  border-radius: 50%;
  width: 1.8rem;
  height: 1.8rem;
  position: absolute;
  transition: transform 0.2s ease;
  ${({ isToggle }) => isToggle && `transform: translateX(2.7rem);`}
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
  height: 3.5rem;
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
