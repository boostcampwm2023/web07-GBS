import { useState } from 'react'
import * as styles from './ViewerModal.styles'
import { ThemeFlag } from '@/types/theme'

interface ViewerModalProps {
  nickname: string
  authority: 'viewer' | 'streamer'
  target: 'viewer' | 'streamer'
  top: number
  left: number
  onCancle: () => void
  onKick: (nickname: string) => void
  currentTheme: ThemeFlag
}

const ViewerModal = ({ nickname, authority, target, top, left, onCancle, onKick, currentTheme }: ViewerModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const onBackdrop = () => {
    setIsOpen(false)
    onCancle()
  }

  const onContent = () => {
    setIsOpen(false)
    onKick(nickname)
  }

  const getViewerModal = () => {
    if (authority === 'streamer' && target === 'viewer') {
      return (
        <styles.Modal
          onClick={(event) => {
            event.stopPropagation()
          }}
          top={top}
          left={left}
          isOpen={isOpen}
          currentTheme={currentTheme}
        >
          <styles.Nickname>{nickname}</styles.Nickname>
          <styles.Content onClick={onContent} currentTheme={currentTheme}>
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
          isOpen={isOpen}
          currentTheme={currentTheme}
        >
          <styles.Nickname>{nickname}</styles.Nickname>
        </styles.Modal>
      )
    }
  }

  return (
    <styles.Backdrop onClick={onBackdrop} isOpen={isOpen}>
      <styles.ModalContainer isOpen={isOpen}>{getViewerModal()}</styles.ModalContainer>
    </styles.Backdrop>
  )
}

export default ViewerModal
