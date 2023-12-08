import { atom } from 'recoil'
import { UserInterface } from '@/types/user'

const getUser = () => {
  const user = localStorage.getItem('user')

  if (user) {
    return JSON.parse(user)
  } else {
    return null
  }
}

export const userState = atom<UserInterface>({
  key: 'USER_STATE',
  default: {
    id: `${getUser() === null ? '' : getUser().id}`,
    nickname: `${getUser() === null ? '' : getUser().nickname}`,
  },
})
