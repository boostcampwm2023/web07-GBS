import * as styles from './Logo.styles'

interface LogoComponentProps {
  logo: 'wide' | 'box'
}

const Logo = ({ logo }: LogoComponentProps) => {
  const src = logo === 'wide' ? '/src/assets/images/wide-logo.svg' : '/src/assets/images/box-logo.svg'

  return <styles.Logo src={src} logo={logo} />
}

export default Logo
