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

const pxToRem = (px: number): string => {
  const width = window.innerWidth

  if (width <= 1024) {
    return `${px / 8}rem`
  } else if (width <= 1280) {
    return `${px / 10}rem`
  } else if (width <= 1366) {
    return `${px / 12}rem`
  } else if (width <= 1600) {
    return `${px / 14}rem`
  } else {
    return `${px / 16}rem`
  }
}

export const Modal = styled.div<ViewerModalProps>`
  display: flex;
  flex-direction: column;
  border: 0.0625rem solid #000000;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: ${(props) => pxToRem(props.top)};
  left: ${(props) => pxToRem(props.left)};
  width: 15rem;
  height: max-content;
  background-color: #ffffff;
  border-radius: 0.625rem;
`

export const Id = styled.div`
  ${TYPO.BOLD_M}
  display: flex;
  justify-content: center;
  width: 100%;
  line-height: 3rem;
`

export const Content = styled.div`
  ${TYPO.MEDIUM_M}
  display: flex;
  justify-content: left;
  padding: 0rem 1rem 0rem 1rem;
  border-top: 0.0625rem solid #000000;
  width: 100%;
  line-height: 3rem;
  cursor: pointer;
`
