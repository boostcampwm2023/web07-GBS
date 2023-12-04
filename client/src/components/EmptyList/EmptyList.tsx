import { ThemeFlag } from '@/states/theme'
import { ThemeInterface } from '@/types/theme'

const EmptyList = ({ currentTheme }: ThemeInterface) => {
  const src = currentTheme === ThemeFlag.light ? '/images/empty-list-light.svg' : '/images/empty-list-dark.svg'

  return <img style={{ width: '200px' }} src={src} alt="emptylist" />
}

export default EmptyList
