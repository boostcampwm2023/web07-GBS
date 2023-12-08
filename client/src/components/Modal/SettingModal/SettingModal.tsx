import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import * as styles from './SettingModal.styles'
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
  const [changeUser, setChangeUser] = useState<boolean>(false)
  const [streamKey, setStreamKey] = useState<string>('')
  const [streamLink, setStreamLink] = useState<string>('')
  const isDarkMode = currentTheme === ThemeFlag.dark

  const onToggleContainer = () => {
    setTheme(isDarkMode ? ThemeFlag.light : ThemeFlag.dark)
    localStorage.setItem('theme', `${currentTheme}`)
  }

  const onIdInputButton = () => {
    if (id.trim() === '') {
      setId(user.id)
      alert('올바른 ID를 입력해주세요.')

      return
    } else if (id.trim() === user.id) {
      setId(user.id)

      return
    }

    fetch(`${import.meta.env.VITE_API_URL}` + '/users', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname: user.nickname, userId: id.trim() }),
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok === true) {
          return res.json()
        } else {
          if (res.status === 500) {
            throw new Error('ID Already Exists')
          } else {
            throw new Error('ID Save Failed')
          }
        }
      })
      .then((res) => {
        const userId = res.userId
        const userNickname = res.nickname

        setUser({ id: userId, nickname: userNickname })
        setChangeUser(true)
        localStorage.setItem('user', JSON.stringify({ id: userId, nickname: userNickname }))
        alert('ID가 저장되었습니다.')
      })
      .catch((err) => {
        console.error(err)
        if (err.message === 'ID Already Exists') {
          alert('이미 존재하는 ID입니다.')
        } else {
          alert('ID 변경에 실패 했습니다.')
        }
      })
  }

  const onNicknameInputButton = () => {
    if (nickname.trim() === '') {
      setNickname(user.nickname)
      alert('올바른 닉네임을 입력해주세요.')

      return
    } else if (nickname.trim() === user.nickname) {
      setNickname(user.nickname)

      return
    }

    fetch(`${import.meta.env.VITE_API_URL}` + '/users', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname: nickname.trim(), userId: user.id }),
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok === true) {
          return res.json()
        } else {
          if (res.status === 500) {
            throw new Error('Nickname Already Exists')
          } else {
            throw new Error('Nickname Save Failed')
          }
        }
      })
      .then((res) => {
        const userId = res.userId
        const userNickname = res.nickname

        setUser({ id: userId, nickname: userNickname })
        setChangeUser(true)
        localStorage.setItem('user', JSON.stringify({ id: userId, nickname: userNickname }))
        alert('닉네임이 저장되었습니다.')
      })
      .catch((err) => {
        console.error(err)
        if (err.message === 'Nickname Already Exists') {
          alert('이미 존재하는 닉네임입니다.')
        } else {
          alert('닉네임 변경에 실패 했습니다.')
        }
      })
  }

  const onCopyButton = (copy: 'key' | 'link') => {
    if (copy === 'key') {
      navigator.clipboard
        .writeText(streamKey)
        .then(() => {
          alert('방송 비밀 키가 클립보드에 복사되었습니다.')
        })
        .catch((err) => {
          console.error(err)
          alert('방송 비밀키 복사에 실패 했습니다.')
        })
    } else if (copy === 'link') {
      navigator.clipboard
        .writeText(streamLink)
        .then(() => {
          alert('방송 송출 링크가 클립보드에 복사되었습니다.')
        })
        .catch((err) => {
          console.error(err)
          alert('방송 송출 링크 복사에 실패 했습니다.')
        })
    }
  }

  useEffect(() => {
    setStreamLink('rtmp://stream.gbs-live.site/live')
    if (user.id !== '') {
      fetch(`${import.meta.env.VITE_API_URL}` + '/stream-keys/me', { method: 'GET', credentials: 'include' })
        .then((res) => {
          if (res.ok === true) {
            return res.json()
          } else {
            throw new Error('Get Stream Keys Failed')
          }
        })
        .then((res) => {
          setStreamKey(res.streamKey)
        })
        .catch((err) => console.error(err))
    }
  }, [])

  return (
    <styles.Backdrop
      onClick={() => {
        onConfirm()
        if (changeUser === true) {
          window.location.reload()
        }
      }}
    >
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
                  <styles.InputButton onClick={() => onCopyButton('key')} currentTheme={currentTheme}>
                    복사하기
                  </styles.InputButton>
                </styles.InputContainer>
                <styles.BodyText>방송 송출 링크</styles.BodyText>
                <styles.InputContainer>
                  <styles.Input value={streamLink} type="password" readOnly={true} currentTheme={currentTheme} />
                  <styles.InputButton onClick={() => onCopyButton('link')} currentTheme={currentTheme}>
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
            <styles.Button
              onClick={() => {
                onConfirm()
                if (changeUser === true) {
                  window.location.reload()
                }
              }}
            >
              확인
            </styles.Button>
          </styles.ButtonContainer>
        </styles.Modal>
      </styles.ModalContainer>
    </styles.Backdrop>
  )
}
export default SettingModal
