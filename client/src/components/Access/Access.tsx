import * as styles from './Access.styles'

interface AccessComponentProps {
  leftButton: string
  rightButton: string
  onLeftButton: () => void
  onRightButton: () => void
}

const Access = ({ leftButton, rightButton, onLeftButton, onRightButton }: AccessComponentProps) => {
  return (
    <styles.Container>
      <styles.Access onClick={onLeftButton}>{leftButton}</styles.Access>
      <styles.Access onClick={onRightButton}>{rightButton}</styles.Access>
    </styles.Container>
  )
}

export default Access
