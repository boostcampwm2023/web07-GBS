import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'
import { ThemeFlag } from '@/states/theme'
import { ThemeInterface } from '@/types/theme'

interface ViewerModalProps {
  top: number
  left: number
  currentTheme: ThemeFlag
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
  border: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: ${(props) => pxToRem(props.top)};
  left: ${(props) => pxToRem(props.left)};
  width: 15rem;
  height: max-content;
  background-color: ${(props) => {
    if (props.currentTheme === ThemeFlag.dark) return '#999'
    else return 'white'
  }};
  border-radius: 0.625rem;
`

export const Nickname = styled.div`
  ${TYPO.BOLD_M}
  display: flex;
  justify-content: center;
  width: 100%;
  line-height: 3rem;
`

export const Content = styled.div<ThemeInterface>`
  ${TYPO.MEDIUM_M}
  display: flex;
  justify-content: left;
  padding: 0rem 1rem 0rem 1rem;
  border-top: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  width: 100%;
  line-height: 3rem;
  cursor: pointer;
`
