import { useState } from 'react'
import * as styles from './ViewerModal.styles'
import { ThemeFlag } from '@/types/theme'

interface ViewerModalProps {
  /**
   * 표시되는 닉네임
   */
  nickname: string
  /**
   * 권환 확인. 시청자 or 스트리머
   */
  authority: 'viewer' | 'streamer'
  /**
   * 사용자 확인. 시청자 or 스트리머
   */
  target: 'viewer' | 'streamer'
  /**
   * 모달에 전달할 top 값
   */
  top: number
  /**
   * 모달에 전달할 left 값
   */
  left: number
  /**
   * 취소 버튼 클릭 시 실행할 함수
   */
  onCancle: () => void
  /**
   * 강제 퇴장 버튼 클릭 시 실행 함수
   */
  onKick: (nickname: string) => void
  /**
   * 다크모드 여부
   */
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
