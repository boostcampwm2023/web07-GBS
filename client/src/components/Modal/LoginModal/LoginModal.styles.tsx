import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`

export const Container = styled.div`
  padding: 0 30px;
`

export const Modal = styled(Backdrop)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const ModalView = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 32rem;
  height: 20rem;
  background-color: white;
  transition: height 0.5s ease;
  border-radius: 10px;
`

export const HeaderText = styled.div`
  ${TYPO.BOLD_M}
  padding-top: 15px;
  padding-bottom: 15px;
`

export const BodyText = styled.div`
  ${TYPO.MEDIUM_M}
  display: flex;
  justify-content: start;
`

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`

export const Input = styled.input`
  ${TYPO.LIGHT_M}
  border: none;
  height: 36px;
  background-color: #e6e6e6;
  border-radius: 10px;
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0px;
  height: 75px;
`

export const Button = styled.div`
  ${TYPO.MEDIUM_M}
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  width: 100%;
  height: 100%;
`
