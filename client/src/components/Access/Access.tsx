import * as styles from './Access.styles'

interface AccessProps {
  /**
   * 왼쪽 버튼에 들어갈 문자열 값
   */
  leftButton: string
  /**
   * 오른쪽 버튼에 들어갈 문자열 값
   */
  rightButton: string
  /**
   * 왼쪽 버튼에 클릭 시 실행될 함수
   */
  onLeftButton: (changeUser: boolean) => void
  /**
   * 오른쪽 버튼에 클릭 시 실행될 함수
   */
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
