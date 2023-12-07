import * as styles from './ViewerModal.styles'
import { ThemeFlag } from '@/types/theme'

interface ViewerModalProps {
  nickname: string
  authority: 'viewer' | 'streamer'
  target: 'viewer' | 'streamer'
  top: number
  left: number
  onCancle: () => void
  onKick: () => void
  currentTheme: ThemeFlag
}

const ViewerModal = ({ nickname, authority, target, top, left, onCancle, onKick, currentTheme }: ViewerModalProps) => {
  const getViewerModal = () => {
    if (authority === 'streamer' && target === 'viewer') {
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
    } else {
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
  }

  return (
    <styles.Backdrop onClick={onCancle}>
      <styles.ModalContainer>{getViewerModal()}</styles.ModalContainer>
    </styles.Backdrop>
  )
}

export default ViewerModal
