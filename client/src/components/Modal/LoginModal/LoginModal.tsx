import { useState } from 'react'
import * as styles from './LoginModal.styles'
import { ThemeFlag } from '@/types/theme'

interface LoginModalProps {
  onCancle: () => void
  currentTheme: ThemeFlag
}

const LoginModal = ({ onCancle, currentTheme }: LoginModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const onClick = () => {
    setIsOpen(false)
    onCancle()
  }

  const onLoginImage = (image: 'naver' | 'google') => {
    const popup = window.open(`${import.meta.env.VITE_API_URL}` + `/oauth/login/${image}`, '_blank', 'menubar=no, toolbar=no, width=500, height=600')

    const popupEvent = () => {
      if (popup !== null && popup.closed == true) {
        fetch(`${import.meta.env.VITE_API_URL}` + '/users/me/', { method: 'GET', credentials: 'include' })
          .then((res) => {
            if (res.ok === true) {
              return res.json()
            } else {
              throw new Error('Login Failed')
            }
          })
          .then((res) => {
            const userId = res.userId
            const userNickname = res.nickname

            localStorage.setItem('user', JSON.stringify({ id: userId, nickname: userNickname }))
            window.location.reload()
          })
          .catch((err) => {
            console.error(err)
            alert('로그인에 실패 했습니다.')
          })
          .finally(() => window.removeEventListener('focus', popupEvent))
      }
    }

    window.addEventListener('focus', popupEvent)
  }

  return (
    <styles.Backdrop onClick={onClick} isOpen={isOpen}>
      <styles.ModalContainer isOpen={isOpen}>
        <styles.Modal
          onClick={(event) => {
            event.stopPropagation()
          }}
          isOpen={isOpen}
          currentTheme={currentTheme}
        >
          <styles.BodyContainer>
            <styles.HeaderText>로그인</styles.HeaderText>
            <styles.LoginImageContainer>
              <styles.LoginImage src="/images/naver-login.png" onClick={() => onLoginImage('naver')} />
              <styles.LoginImage src="/images/google-login.png" onClick={() => onLoginImage('google')} />
            </styles.LoginImageContainer>
          </styles.BodyContainer>
          <styles.ButtonContainer currentTheme={currentTheme}>
            <styles.Button onClick={onClick}>취소</styles.Button>
          </styles.ButtonContainer>
        </styles.Modal>
      </styles.ModalContainer>
    </styles.Backdrop>
  )
}

export default LoginModal
