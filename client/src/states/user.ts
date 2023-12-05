import { atom } from 'recoil'
import { User } from '@/types/user'

const getUser = () => {
  const user = localStorage.getItem('user')

  if (user) {
    return JSON.parse(user)
  } else {
    return null
  }
}

export const userState = atom<User>({
  key: 'USER_STATE',
  default: {
    id: `${getUser() === null ? '' : getUser().id}`,
    nickname: `${getUser() === null ? '' : getUser().nickname}`,
  },
})
