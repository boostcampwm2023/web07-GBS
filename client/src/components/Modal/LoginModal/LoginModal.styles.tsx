import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'
import { ThemeFlag } from '@/state/theme'

interface DarkmodeProps {
  currentTheme: ThemeFlag
}

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`

export const Modal = styled(Backdrop)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const ModalView = styled.div<DarkmodeProps>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  width: 32rem;
  height: 20.625rem;
  background-color: ${(props) => {
    if (props.currentTheme === ThemeFlag.dark) return '#999'
    else return 'white'
  }};
  border-radius: 0.625rem;
`

export const Container = styled.div`
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

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.9375rem;
  line-height: 2.25rem;
`

export const Input = styled.input<DarkmodeProps>`
  ${TYPO.LIGHT_M}
  padding-right: 1rem;
  padding-left: 1rem;
  border: none;
  height: 2.25rem;
  background-color: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '#e6e6e6'
    else return '#808080'
  }};
  border-radius: 0.625rem;
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 0.0625rem solid #000000;
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
