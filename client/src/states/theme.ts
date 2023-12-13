import { atom } from 'recoil'
import { ThemeFlag } from '@/types/theme'

export const themeState = atom<ThemeFlag>({
  key: 'THEME_STATE',
  default: localStorage.getItem('theme') === `${ThemeFlag.dark}` ? ThemeFlag.dark : ThemeFlag.light,
})
