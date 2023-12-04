import { User } from '@/types/user'
import { atom } from 'recoil'

export const userState = atom<User>({
  key: 'USER_STATE',
  default: { id: '', nickname: '' },
})
