import * as styles from './Access.styles'

interface AccessProps {
  leftButton: string
  rightButton: string
  onLeftButton: (changeUser: boolean) => void
  onRightButton: () => void
}

const Access = ({ leftButton, rightButton, onLeftButton, onRightButton }: AccessProps) => {
  return (
    <styles.Access>
      <styles.Button onClick={() => onLeftButton(false)}>{leftButton}</styles.Button>
      <styles.Button onClick={onRightButton}>{rightButton}</styles.Button>
    </styles.Access>
  )
}

export default Access
