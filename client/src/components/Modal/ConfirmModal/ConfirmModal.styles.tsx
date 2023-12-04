import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'
import { ThemeFlag } from '@/states/theme'
import { ThemeInterface } from '@/types/theme'

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
  width: 22.5rem;
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
  ${TYPO.MEDIUM_M}
  margin-bottom: 0.9375rem;
  line-height: 2.25rem;
`

export const LoginImage = styled.img`
  height: 4rem;
  margin-bottom: 0.625rem;
  cursor: pointer;
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
