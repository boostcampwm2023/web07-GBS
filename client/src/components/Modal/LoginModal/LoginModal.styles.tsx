import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'
import { ThemeFlag } from '@/state/theme'

interface LoginModalProps {
  currentTheme: ThemeFlag
}

export const Backdrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
`

export const Modal = styled.div<LoginModalProps>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  width: 32rem;
  height: max-content;
  background-color: ${(props) => {
    if (props.currentTheme === ThemeFlag.dark) return '#999'
    else return 'white'
  }};
  border-radius: 0.625rem;
`

export const LoginContainer = styled.div`
  padding: 0.9375rem 1.875rem 0.9375rem 1.875rem;
`

export const HeaderText = styled.div`
  ${TYPO.BOLD_M}
  margin-bottom: 0.9375rem;
  line-height: 2.25rem;
`

export const LoginImage = styled.img`
  width: 100%;
  height: 5.625rem;
  margin-bottom: 0.9375rem;
  cursor: pointer;
`

export const ButtonContainer = styled.div<LoginModalProps>`
  ${TYPO.MEDIUM_M}
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
  cursor: pointer;
`
