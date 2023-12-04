import { ThemeFlag } from '@/states/theme'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const Logo = styled.div``

export const Access = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(80%);
`

interface ListProps {
  currentTheme: ThemeFlag
  length: number
}

export const List = styled.div<ListProps>`
  display: flex;
  flex-direction: column;
  border: ${(props) => {
    if (props.length === 0) return
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  justify-content: center;
  align-items: center;
  margin: 10rem auto;
`
