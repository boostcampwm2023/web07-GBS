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
        ? '/images/wide-logo-dark.svg'
        : '/images/wide-logo-light.svg'
      : theme === ThemeFlag.light
      ? '/images/box-logo-dark.svg'
      : '/images/box-logo-light.svg'

  return <styles.Logo src={src} logo={logo} />
}

export default Logo
