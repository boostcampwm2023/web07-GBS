import * as styles from './EmptyList.styles'
import { ThemeFlag } from '@/states/theme'
import { ThemeInterface } from '@/types/theme'

const EmptyList = ({ currentTheme }: ThemeInterface) => {
  const src = currentTheme === ThemeFlag.light ? '/images/empty-list-light.svg' : '/images/empty-list-dark.svg'

  return <styles.EmptyList src={src} alt="emptylist" />
}

export default EmptyList
