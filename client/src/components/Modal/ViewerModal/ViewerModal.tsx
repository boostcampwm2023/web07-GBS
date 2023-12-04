import * as styles from './ViewerModal.styles'
import { ThemeFlag } from '@/states/theme'

interface ViewerModalProps {
  nickname: string
  authority: 'viewer' | 'manager' | 'streamer'
  target: 'viewer' | 'manager' | 'streamer'
  top: number
  left: number
  onCancle: () => void
  onManager: (nickname: string) => void
  onKick: () => void
  currentTheme: ThemeFlag
}

const ViewerModal = ({ nickname, authority, target, top, left, onCancle, onManager, onKick, currentTheme }: ViewerModalProps) => {
  const getViewerModal = () => {
    if (authority === 'manager' && target === 'viewer') {
      return (
        <styles.Modal
          onClick={(event) => {
            event.stopPropagation()
          }}
          top={top}
          left={left}
          currentTheme={currentTheme}
        >
          <styles.Nickname>{nickname}</styles.Nickname>
          <styles.Content onClick={onKick} currentTheme={currentTheme}>
            강퇴하기
          </styles.Content>
        </styles.Modal>
      )
    } else if (authority === 'streamer') {
      if (target === 'viewer') {
        return (
          <styles.Modal
            onClick={(event) => {
              event.stopPropagation()
            }}
            top={top}
            left={left}
            currentTheme={currentTheme}
          >
            <styles.Nickname>{nickname}</styles.Nickname>
            <styles.Content onClick={() => onManager(nickname)} currentTheme={currentTheme}>
              매니저로 지정하기
            </styles.Content>
            <styles.Content onClick={onKick} currentTheme={currentTheme}>
              강퇴하기
            </styles.Content>
          </styles.Modal>
        )
      } else if (target === 'manager') {
        return (
          <styles.Modal
            onClick={(event) => {
              event.stopPropagation()
            }}
            top={top}
            left={left}
            currentTheme={currentTheme}
          >
            <styles.Nickname>{nickname}</styles.Nickname>
            <styles.Content onClick={() => onManager(nickname)} currentTheme={currentTheme}>
              매니저 지정 해제하기
            </styles.Content>
            <styles.Content onClick={onKick} currentTheme={currentTheme}>
              강퇴하기
            </styles.Content>
          </styles.Modal>
        )
      }
    }

    return (
      <styles.Modal
        onClick={(event) => {
          event.stopPropagation()
        }}
        top={top}
        left={left}
        currentTheme={currentTheme}
      >
        <styles.Nickname>{nickname}</styles.Nickname>
      </styles.Modal>
    )
  }

  return (
    <styles.Backdrop onClick={onCancle}>
      <styles.ModalContainer>{getViewerModal()}</styles.ModalContainer>
    </styles.Backdrop>
  )
}

export default ViewerModal
