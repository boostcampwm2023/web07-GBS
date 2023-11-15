import styled from 'styled-components'
import TYPO from '../../../styles/typo/TYPO'

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`

export const Container = styled.div`
  padding: 0 30px;
`

export const Modal = styled(Backdrop)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  width: 32rem;
  height: 24rem;
  transition: height 0.5s ease;
`
export const HeaderText = styled.div`
  ${TYPO.BOLD_M}
  padding-top: 15px;
`
export const BodyText = styled.div`
  ${TYPO.MEDIUM_M}
  display: flex;
  justify-content: start;
`

export const InputBox = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`

export const Input = styled.input`
  ${TYPO.REGULAR_M}
  background-color: #e6e6e6;
  border: none;
  height: 36px;
  border-radius: 10px;
`

export const ButtonContainer = styled.div`
  bottom: 0px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Button = styled.div`
  ${TYPO.MEDIUM_M}
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`
