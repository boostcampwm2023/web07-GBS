import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'

interface ViewerModalProps {
  top: number
  left: number
}

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
`

export const Modal = styled.div<ViewerModalProps>`
  display: flex;
  flex-direction: column;
  border: 0.0625rem solid #000000;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: 15rem;
  height: max-content;
  background-color: #ffffff;
  border-radius: 0.625rem;
`

export const Id = styled.div`
  ${TYPO.BOLD_M}
  display: flex;
  justify-content: center;
  width: 15rem;
  line-height: 3rem;
`

export const Content = styled.div`
  ${TYPO.MEDIUM_M}
  display: flex;
  justify-content: left;
  padding: 0rem 1rem 0rem 1rem;
  border-top: 0.0625rem solid #000000;
  width: 15rem;
  line-height: 3rem;
  cursor: pointer;
`
