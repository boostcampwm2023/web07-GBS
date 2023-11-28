import * as styles from './Logo.styles'
import { ThemeFlag } from '@/states/theme'

interface LogoProps {
  logo: 'wide' | 'box'
  currentTheme: ThemeFlag
}

const Logo = ({ logo, currentTheme }: LogoProps) => {
  const src =
    logo === 'wide'
      ? currentTheme === ThemeFlag.light
        ? '/images/wide-logo-light.svg'
        : '/images/wide-logo-dark.svg'
      : currentTheme === ThemeFlag.light
      ? '/images/box-logo-light.svg'
      : '/images/box-logo-dark.svg'

  return <styles.Logo src={src} logo={logo} />
}

export default Logo
