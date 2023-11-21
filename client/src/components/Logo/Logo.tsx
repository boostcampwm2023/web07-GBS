import * as styles from './Logo.styles'

interface LogoProps {
  logo: 'wide' | 'box'
}

const Logo = ({ logo }: LogoProps) => {
  const src = logo === 'wide' ? '/assets/images/wide-logo.svg' : '/assets/images/box-logo.svg'

  return <styles.Logo src={src} logo={logo} />
}

export default Logo
