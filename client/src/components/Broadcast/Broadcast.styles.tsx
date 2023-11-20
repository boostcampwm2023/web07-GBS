import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'

interface BroadcastProps {
  index: number
}

export const Broadcast = styled.div<BroadcastProps>`
  border-top: ${(props) => {
    if (props.index === 0) {
      return
    } else {
      return '0.0625rem solid #000000'
    }
  }};
  position: relative;
  display: flex;
  width: 57rem;
  height: 15rem;
`

export const Thumbnail = styled.div`
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
  line-height: 4rem;
`

export const Id = styled.div`
  ${TYPO.MEDIUM_R}
  justify-content: right;
  position: absolute;
  right: 1.875rem;
  bottom: 4.125rem;
  line-height: 2.25rem;
`

export const Viewer = styled.div`
  ${TYPO.MEDIUM_R}
  justify-content: right;
  position: absolute;
  right: 1.875rem;
  bottom: 1.875rem;
  line-height: 2.25rem;
  color: #db0000;
`
