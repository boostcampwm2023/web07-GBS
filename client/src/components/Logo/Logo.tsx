import * as styles from './Logo.styles'
import { ThemeFlag } from '@/types/theme'

interface LogoProps {
  /**
   * 로고 종류 'wide' or 'box
   */
  logo: 'wide' | 'box'
  /**
   * 다크모드 여부
   */
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

  return <styles.Logo src={src} alt="logo" logo={logo} />
}

export default Logo
