import * as styles from './Access.styles'

interface AccessComponentProps {
  leftButton: string
  rightButton: string
}

const Access = ({ leftButton, rightButton }: AccessComponentProps) => {
  return (
    <styles.Container>
      <styles.Access>{leftButton}</styles.Access>
      <styles.Access>{rightButton}</styles.Access>
    </styles.Container>
  )
}

export default Access
