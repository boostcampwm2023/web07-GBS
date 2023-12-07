import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'
import { ThemeFlag } from '@/types/theme'

interface BroadcastProps {
  index: number
  currentTheme: ThemeFlag
}

export const Broadcast = styled.div<BroadcastProps>`
  border-top: ${(props) => {
    if (props.index === 0) {
      return
    } else {
      if (props.currentTheme === ThemeFlag.light) return '0.0625rem solid #000000'
      else return '0.0625rem solid #ffffff'
    }
  }};
  position: relative;
  display: flex;
  width: 57rem;
  height: 15rem;
`

export const Thumbnail = styled.img`
  border: 0.0625rem solid #000000;
  position: absolute;
  top: 1.875rem;
  left: 1.875rem;
  width: 20rem;
  height: 11.25rem;
  background-color: #000000;
`

export const Title = styled.div`
  ${TYPO.BOLD_L}
  justify-content: right;
  position: absolute;
  top: 1.875rem;
  right: 1.875rem;
  width: 31.25rem;
  line-height: 4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Nickname = styled.div`
  ${TYPO.LIGHT_R}
  justify-content: right;
  position: absolute;
  right: 1.875rem;
  bottom: 4.125rem;
  width: 31.25rem;
  line-height: 2.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Viewer = styled.div`
  ${TYPO.LIGHT_R}
  justify-content: right;
  position: absolute;
  right: 1.875rem;
  bottom: 1.875rem;
  width: 31.25rem;
  line-height: 2.25rem;
  color: #db0000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
