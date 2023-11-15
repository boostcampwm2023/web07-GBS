import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'

export const Container = styled.div`
  display: flex;
  justify-content: left;
  gap: 0rem 1rem;
  height: max-content;
`

export const Id = styled.div`
  ${TYPO.BOLD_R}
  line-height: 2rem;
`

export const Context = styled.div`
  ${TYPO.LIGHT_R}
  line-height: 2rem;
`
