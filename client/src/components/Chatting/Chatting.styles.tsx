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

export const Id = styled.div`
  ${TYPO.BOLD_R}
  line-height: 2rem;
  cursor: pointer;
`

export const Text = styled.div`
  ${TYPO.LIGHT_R}
  word-break:break-all;
  line-height: 2rem;
`
