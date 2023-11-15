import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'

export const Container = styled.div`
  display: flex;
  justify-content: right;
  gap: 0rem 1rem;
  width: 12.5rem;
  height: 2.25rem;
`

export const Access = styled.div`
  ${TYPO.MEDIUM_M}
  display: flex;
  align-items: center;
  justify-content: right;
  cursor: pointer;
`
