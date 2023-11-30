import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'
import { ThemeFlag } from '@/states/theme'
import { ThemeInterface } from '@/types/theme'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

export const Logo = styled.div`
  position: absolute;
  top: 0rem;
  left: 1.875rem;
`

export const Access = styled.div`
  position: absolute;
  top: 2.375rem;
  left: 80.125rem;
`

export const Broadcast = styled.div`
  border: 0.0625rem solid #000000;
  position: absolute;
  top: 6.25rem;
  left: 1.875rem;
  width: 64rem;
  height: 45.5rem;
  background-color: #000000;
`

export const Chatting = styled.div<ThemeInterface>`
  display: flex;
  flex-direction: column;
  border: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  position: absolute;
  top: 6.25rem;
  left: 67.75rem;
  width: 24.875rem;
  height: 53.25rem;
`

export const ChattingList = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  width: 100%;
  height: 43.75rem;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 0.5rem;
  }
`

export const Input = styled.div<ThemeInterface>`
  border-top: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  height: 9.4375rem;
  width: 100%;
`

export const Text = styled.textarea<ThemeInterface>`
  ${TYPO.LIGHT_R}
  border: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  background-color: ${(props) => {
    if (props.currentTheme === ThemeFlag.dark) return '#808080'
  }};
  position: absolute;
  bottom: 0.9375rem;
  left: 0.9375rem;
  width: 16.875rem;
  height: 7.5625rem;
  border-radius: 0.625rem;
  padding: 1rem;
  resize: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Send = styled.div<ThemeInterface>`
  ${TYPO.LIGHT_R}
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  box-shadow: 0.25rem 0.25rem 0.1875rem rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 0.9375rem;
  bottom: 0.9375rem;
  width: 5rem;
  height: 7.5625rem;
  border-radius: 0.625rem;
  cursor: pointer;
`

export const Info = styled.div<ThemeInterface>`
  display: flex;
  border: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  position: absolute;
  top: 53.625rem;
  left: 1.875rem;
  width: 64rem;
  height: 5.875rem;
  border-radius: 1.25rem;
`

export const Title = styled.div`
  ${TYPO.BOLD_L}
  display: flex;
  align-items: center;
  justify-content: left;
  position: absolute;
  top: 0.9375rem;
  left: 1.875rem;
  width: 45rem;
  height: 4rem;
`

export const Nickname = styled.div`
  ${TYPO.LIGHT_R}
  display: flex;
  align-items: center;
  justify-content: right;
  position: absolute;
  top: 0.9375rem;
  right: 1.875rem;
  width: 12.5rem;
  height: 2rem;
`

export const Viewer = styled.div`
  ${TYPO.LIGHT_R}
  display: flex;
  align-items: center;
  justify-content: right;
  position: absolute;
  right: 1.875rem;
  bottom: 0.9375rem;
  width: 12.5rem;
  height: 2rem;
  color: #db0000;
`
