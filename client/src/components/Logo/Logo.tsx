import { useRecoilValue } from 'recoil'
import * as styles from './Logo.styles'
import { ThemeFlag, themeState } from '@/state/theme'

interface LogoProps {
  logo: 'wide' | 'box'
}

const Logo = ({ logo }: LogoProps) => {
  const theme = useRecoilValue(themeState)
  const src =
    logo === 'wide'
      ? theme === ThemeFlag.light
        ? '/assets/images/wide-logo.svg'
        : '/assets/images/wide-logo-white.svg'
      : theme === ThemeFlag.light
      ? '/assets/images/box-logo.svg'
      : '/assets/images/box-logo-white.svg'

  return <styles.Logo src={src} logo={logo} />
}

export default Logo
