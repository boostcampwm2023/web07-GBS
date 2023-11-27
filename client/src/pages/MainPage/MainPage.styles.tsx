import { ThemeFlag } from '@/states/theme'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

export const Logo = styled.div`
  position: absolute;
  top: 1.5625rem;
  left: 41rem;
`

export const Access = styled.div`
  position: absolute;
  top: 7.0625rem;
  left: 63.25rem;
`

interface ListProps {
  currentTheme: ThemeFlag
}

export const List = styled.div<ListProps>`
  display: flex;
  flex-direction: column;
  border: ${(props) => {
    if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
    else return '0.0625rem solid #ffffff'
  }};
  position: absolute;
  top: 15.625rem;
  left: 18.75rem;
`
