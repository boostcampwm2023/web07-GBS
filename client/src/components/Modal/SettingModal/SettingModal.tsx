import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import * as styles from './SettingModal.styles'
import useApi from '@/hooks/useApi'
import { ThemeFlag } from '@/types/theme'
import { themeState } from '@/states/theme'
import { userState } from '@/states/user'

interface SettingModalProps {
  onConfirm: () => void
}

const SettingModal = ({ onConfirm }: SettingModalProps) => {
  const [currentTheme, setTheme] = useRecoilState(themeState)
  const [user, setUser] = useRecoilState(userState)
  const [id, setId] = useState<string>(user.id)
  const [nickname, setNickname] = useState<string>(user.nickname)
  const [streamKey, setStreamKey] = useState<string>('')
  const [response, fetchApi] = useApi()
  const isDarkMode = currentTheme === ThemeFlag.dark

  const onToggleContainer = () => {
    setTheme(isDarkMode ? ThemeFlag.light : ThemeFlag.dark)
    localStorage.setItem('theme', `${currentTheme}`)
  }

  const onIdInputButton = async () => {
    if (id.trim() === '') {
      alert('올바른 ID를 입력해주세요.')
      setId(user.id)

      return
    } else if (id.trim() === user.id) {
      setId(user.id)

      return
    }
    await fetchApi('PATCH', '/users/', { nickname: user.nickname, userId: id.trim() })

    if (response.data) {
      const { userId, nickname } = response.data
      alert('ID가 저장되었습니다.')
      setUser({ id: userId, nickname: nickname })
      localStorage.setItem('user', JSON.stringify({ id: userId, nickname: nickname }))
    } else {
      console.log(response.error)
    }
  }

  const onNicknameInputButton = async () => {
    if (nickname.trim() === '') {
      alert('올바른 닉네임을 입력해주세요.')
      setNickname(user.nickname)

      return
    } else if (nickname.trim() === user.nickname) {
      setNickname(user.nickname)

      return
    }
    await fetchApi('PATCH', '/users/', { nickname: nickname.trim(), userId: user.id })

    if (response.data) {
      const { userId, nickname } = response.data
      alert('닉네임이 저장되었습니다.')
      setUser({ id: userId, nickname: nickname })
      localStorage.setItem('user', JSON.stringify({ id: userId, nickname: nickname }))
    } else {
      console.log(response.error)
    }
  }

  const onKeyInputButton = async () => {
    await fetchApi('GET', '/stream-keys/me/')

    if (response.data) {
      const { streamKey } = response.data
      setStreamKey(streamKey)
      navigator.clipboard.writeText(streamKey).then(() => {
        alert('방송 비밀 키가 클립보드에 복사되었습니다.')
      })
    }
  }

  useEffect(() => {
    onKeyInputButton()
  }, [])

  return (
    <styles.Backdrop onClick={onConfirm}>
      <styles.ModalContainer>
        <styles.Modal
          onClick={(event) => {
            event.stopPropagation()
          }}
          currentTheme={currentTheme}
        >
          <styles.BodyContainer>
            {user.id !== '' && (
              <styles.BlockContainer>
                <styles.HeaderText>마이페이지</styles.HeaderText>
                <styles.BodyText>ID</styles.BodyText>
                <styles.InputContainer>
                  <styles.Input
                    value={id}
                    onChange={(event) => {
                      setId(event.target.value)
                    }}
                    currentTheme={currentTheme}
                  />
                  <styles.InputButton onClick={onIdInputButton} currentTheme={currentTheme}>
                    저장하기
                  </styles.InputButton>
                </styles.InputContainer>
                <styles.BodyText>닉네임</styles.BodyText>
                <styles.InputContainer>
                  <styles.Input
                    value={nickname}
                    onChange={(event) => {
                      setNickname(event.target.value)
                    }}
                    currentTheme={currentTheme}
                  />
                  <styles.InputButton onClick={onNicknameInputButton} currentTheme={currentTheme}>
                    저장하기
                  </styles.InputButton>
                </styles.InputContainer>
                <styles.BodyText>방송 비밀 키</styles.BodyText>
                <styles.InputContainer>
                  <styles.Input value={streamKey} type="password" readOnly={true} currentTheme={currentTheme} />
                  <styles.InputButton onClick={onKeyInputButton} currentTheme={currentTheme}>
                    복사하기
                  </styles.InputButton>
                </styles.InputContainer>
              </styles.BlockContainer>
            )}
            <styles.BlockContainer>
              <styles.HeaderText>환경설정</styles.HeaderText>
              <styles.SettingContainer>
                <styles.BodyText>다크모드</styles.BodyText>
                <styles.ToggleContainer isDarkMode={isDarkMode} onClick={onToggleContainer}>
                  <styles.ToggleKnob isDarkMode={isDarkMode} />
                </styles.ToggleContainer>
              </styles.SettingContainer>
            </styles.BlockContainer>
          </styles.BodyContainer>
          <styles.ButtonContainer currentTheme={currentTheme}>
            <styles.Button onClick={onConfirm}>확인</styles.Button>
          </styles.ButtonContainer>
        </styles.Modal>
      </styles.ModalContainer>
    </styles.Backdrop>
  )
}
export default SettingModal
