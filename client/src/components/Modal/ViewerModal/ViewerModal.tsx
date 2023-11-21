import * as styles from './ViewerModal.styles'

interface ViewerModalProps {
  id: string
  authority: 'viewer' | 'manager' | 'streamer'
  target: 'viewer' | 'manager' | 'streamer'
  top: number
  left: number
  onCancle: () => void
  onConfirm: () => void
}

const ViewerModal = ({ id, authority, target, top, left, onCancle, onConfirm }: ViewerModalProps) => {
  const getViewerModal = (): JSX.Element => {
    if (authority === 'manager' && target === 'viewer') {
      return (
        <styles.Modal top={top} left={left}>
          <styles.Id>{id}</styles.Id>
          <styles.Content onClick={onConfirm}>강퇴하기</styles.Content>
        </styles.Modal>
      )
    } else if (authority === 'streamer') {
      if (target === 'viewer') {
        return (
          <styles.Modal top={top} left={left}>
            <styles.Id>{id}</styles.Id>
            <styles.Content onClick={onConfirm}>매니저로 지정하기</styles.Content>
            <styles.Content onClick={onConfirm}>강퇴하기</styles.Content>
          </styles.Modal>
        )
      } else if (target === 'manager') {
        return (
          <styles.Modal top={top} left={left}>
            <styles.Id>{id}</styles.Id>
            <styles.Content onClick={onConfirm}>매니저 지정 해제하기</styles.Content>
            <styles.Content onClick={onConfirm}>강퇴하기</styles.Content>
          </styles.Modal>
        )
      }
    }

    return (
      <styles.Modal top={top} left={left}>
        <styles.Id>{id}</styles.Id>
      </styles.Modal>
    )
  }

  return <styles.Backdrop onClick={onCancle}>{getViewerModal()}</styles.Backdrop>
}

export default ViewerModal
