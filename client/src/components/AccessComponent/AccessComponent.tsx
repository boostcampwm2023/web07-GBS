import * as styles from './AccessComponent.styles'

interface AccessComponentProps {
  leftButton: string
  rightButton: string
}

const AccessComponent = ({ leftButton, rightButton }: AccessComponentProps) => {
  return (
    <styles.Container>
      <styles.Access>{leftButton}</styles.Access>
      <styles.Access>{rightButton}</styles.Access>
    </styles.Container>
  )
}

export default AccessComponent
