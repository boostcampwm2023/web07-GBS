import * as styles from './ViewerModal.styles'
import { ThemeFlag } from '@/state/theme'

interface ViewerModalProps {
  id: string
  authority: 'viewer' | 'manager' | 'streamer'
  target: 'viewer' | 'manager' | 'streamer'
  top: number
  left: number
  onCancle: () => void
  onManager: (id: string) => void
  onKick: () => void
  currentTheme: ThemeFlag
}

const ViewerModal = ({ id, authority, target, top, left, onCancle, onManager, onKick, currentTheme }: ViewerModalProps) => {
  const getViewerModal = (): JSX.Element => {
    if (authority === 'manager' && target === 'viewer') {
      return (
        <styles.Modal top={top} left={left} currentTheme={currentTheme}>
          <styles.Id>{id}</styles.Id>
          <styles.Content onClick={onKick}>강퇴하기</styles.Content>
        </styles.Modal>
      )
    } else if (authority === 'streamer') {
      if (target === 'viewer') {
        return (
          <styles.Modal top={top} left={left} currentTheme={currentTheme}>
            <styles.Id>{id}</styles.Id>
            <styles.Content onClick={() => onManager(id)}>매니저로 지정하기</styles.Content>
            <styles.Content onClick={onKick}>강퇴하기</styles.Content>
          </styles.Modal>
        )
      } else if (target === 'manager') {
        return (
          <styles.Modal top={top} left={left} currentTheme={currentTheme}>
            <styles.Id>{id}</styles.Id>
            <styles.Content onClick={() => onManager(id)}>매니저 지정 해제하기</styles.Content>
            <styles.Content onClick={onKick}>강퇴하기</styles.Content>
          </styles.Modal>
        )
      }
    }

    return (
      <styles.Modal top={top} left={left} currentTheme={currentTheme}>
        <styles.Id>{id}</styles.Id>
      </styles.Modal>
    )
  }

  return <styles.Backdrop onClick={onCancle}>{getViewerModal()}</styles.Backdrop>
}

export default ViewerModal
