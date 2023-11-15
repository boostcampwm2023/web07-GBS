import styled from 'styled-components'

interface LogoProps {
  logo: string
}

export const Logo = styled.img<LogoProps>`
  width: 12.5rem;
  height: ${(props) => {
    if (props.logo === 'wide') {
      return '6.25rem'
    } else {
      return '12.5rem'
    }
  }};
  cursor: pointer;
`
