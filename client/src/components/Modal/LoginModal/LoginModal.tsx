import useApi from '@/hooks/useApi'
import * as styles from './LoginModal.styles'
import { ThemeFlag } from '@/types/theme'

interface LoginModalProps {
  onCancle: () => void
  currentTheme: ThemeFlag
}

const LoginModal = ({ onCancle, currentTheme }: LoginModalProps) => {
  const [response, fetchApi] = useApi<{ userId: string; nickname: string }>()

  const onLoginImage = () => {
    const popup = window.open(`${import.meta.env.VITE_API_URL}` + '/oauth/login/naver', '_blank', 'menubar=no, toolbar=no, width=500, height=600')

    const popupEvent = async () => {
      if (popup !== null && popup.closed === true) {
        try {
          await fetchApi('GET', '/users/me/', undefined, { credentials: 'include' })

          if (response.data) {
            const { userId, nickname } = response.data

            localStorage.setItem('user', JSON.stringify({ id: userId, nickname: nickname }))
            window.location.reload()
          } else {
            throw new Error('Login Failed')
          }
        } catch (error) {
          console.error(response.error || error)
        } finally {
          window.removeEventListener('focus', popupEvent)
        }
      }
    }

    window.addEventListener('focus', popupEvent)
  }

  return (
    <styles.Backdrop onClick={onCancle}>
      <styles.ModalContainer>
        <styles.Modal
          onClick={(event) => {
            event.stopPropagation()
          }}
          currentTheme={currentTheme}
        >
          <styles.BodyContainer>
            <styles.HeaderText>로그인</styles.HeaderText>
            <styles.LoginImage src="https://static.nid.naver.com/oauth/big_g.PNG?version=js-2.0.1" onClick={onLoginImage} />
          </styles.BodyContainer>
          <styles.ButtonContainer currentTheme={currentTheme}>
            <styles.Button onClick={onCancle}>취소</styles.Button>
          </styles.ButtonContainer>
        </styles.Modal>
      </styles.ModalContainer>
    </styles.Backdrop>
  )
}

export default LoginModal
