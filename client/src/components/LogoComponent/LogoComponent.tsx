import * as styles from './LogoComponent.styles'

interface LogoComponentProps {
  logo: string
}

const LogoComponent = ({ logo }: LogoComponentProps) => {
  const src = logo === 'wide' ? '/src/assets/images/wide-logo.svg' : '/src/assets/images/box-logo.svg'

  return <styles.Logo src={src} logo={logo} />
}

export default LogoComponent
