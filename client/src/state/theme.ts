import { atom } from 'recoil'

export enum ThemeFlag {
  light,
  dark,
}

export const themeState = atom<ThemeFlag>({
  key: 'THEME_STATE',
  default: ThemeFlag.light,
})
