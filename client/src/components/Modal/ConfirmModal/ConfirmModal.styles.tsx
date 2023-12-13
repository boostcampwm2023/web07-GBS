import styled, { keyframes } from 'styled-components'
import TYPO from '@/styles/typo/TYPO'
import { ThemeFlag, ThemeInterface } from '@/types/theme'
import { ModalInterface } from '@/types/modal'

interface ConfirmModalProps {
  isOpen: boolean
  currentTheme: ThemeFlag
}

const fadeIn = keyframes` 
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes` 
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

export const Backdrop = styled.div<ModalInterface>`
  animation: ${(props) => (props.isOpen === true ? fadeIn : fadeOut)} 0.2s ease-in;
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

export const ModalContainer = styled(Backdrop)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const Modal = styled.div<ConfirmModalProps>`
  animation: ${(props) => (props.isOpen === true ? fadeIn : fadeOut)} 0.2s ease-in;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  box-shadow: 0.25rem 0.25rem 0.1875rem rgba(0, 0, 0, 0.1);
  width: max-content;
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
  line-height: 2.25rem;
`

export const ButtonContainer = styled.div<ThemeInterface>`
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
