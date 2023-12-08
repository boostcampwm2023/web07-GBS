import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'

export const Chatting = styled.div`
  display: flex;
  gap: 0rem 1rem;
  justify-content: left;
  padding: 0rem 0.5rem 0rem 1rem;
  width: 100%;
  height: max-content;
`

export const Nickname = styled.div`
  ${TYPO.BOLD_R}
  overflow: hidden;
  max-width: 4rem;
  line-height: 2rem;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  text-overflow: ellipsis;
`

export const Message = styled.div`
  ${TYPO.LIGHT_R}
  max-width: 19.375rem;
  line-height: 2rem;
  text-align: left;
  word-break: break-all;
`
