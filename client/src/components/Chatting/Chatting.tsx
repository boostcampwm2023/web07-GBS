import * as styles from './Chatting.styles'

interface AccessComponentProps {
  id: string
  context: string
}

const AccessComponent = ({ id, context }: AccessComponentProps) => {
  return (
    <styles.Container>
      <styles.Id>{id}</styles.Id>
      <styles.Context>{context}</styles.Context>
    </styles.Container>
  )
}

export default AccessComponent
