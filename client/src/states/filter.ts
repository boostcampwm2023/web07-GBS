import { atom } from 'recoil'

export const filterState = atom<boolean>({
  key: 'FILTER_STATE',
  default: localStorage.getItem('filter') === `${false}` ? false : true,
})
