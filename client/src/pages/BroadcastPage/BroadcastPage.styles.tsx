import styled from 'styled-components'
import TYPO from '@/styles/typo/TYPO'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

export const Logo = styled.div`
  position: absolute;
  top: 0rem;
  left: 1.875rem;
`

export const Access = styled.div`
  position: absolute;
  top: 2.375rem;
  left: 80.125rem;
`

export const Broadcast = styled.div`
  border: 0.0625rem solid #000000;
  position: absolute;
  top: 6.25rem;
  left: 1.875rem;
  width: 64rem;
  height: 45.5rem;
`

export const Chatting = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.0625rem solid #000000;
  position: absolute;
  top: 6.25rem;
  left: 67.75rem;
  width: 24.875rem;
  height: 53.25rem;
`

export const ChattingList = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  width: 100%;
  height: 43.75rem;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 0.5rem;
  }
`

export const ChattingInput = styled.div`
  border-top: 0.0625rem solid #000000;
  height: 9.4375rem;
  width: 100%;
`

export const InputBox = styled.textarea`
  ${TYPO.LIGHT_R}
  border: 0.0625rem solid #000000;
  position: absolute;
  bottom: 0.9375rem;
  left: 0.9375rem;
  width: 16.875rem;
  height: 7.5625rem;
  border-radius: 0.625rem;
  padding: 1rem;
  resize: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const InputSend = styled.div`
  ${TYPO.LIGHT_R}
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.0625rem solid #000000;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 0.9375rem;
  bottom: 0.9375rem;
  width: 5rem;
  height: 7.5625rem;
  border-radius: 0.625rem;
  cursor: pointer;
`

export const Info = styled.div`
  display: flex;
  border: 0.0625rem solid #000000;
  position: absolute;
  top: 53.625rem;
  left: 1.875rem;
  width: 64rem;
  height: 5.875rem;
  border-radius: 1.25rem;
`

export const InfoTitle = styled.div`
  ${TYPO.BOLD_L}
  display: flex;
  align-items: center;
  justify-content: left;
  position: absolute;
  top: 0.9375rem;
  left: 1.875rem;
  width: 45rem;
  height: 4rem;
`

export const InfoViewer = styled.div`
  ${TYPO.LIGHT_R}
  display: flex;
  align-items: center;
  justify-content: right;
  position: absolute;
  top: 0.9375rem;
  right: 1.875rem;
  width: 12.5rem;
  height: 2rem;
`

export const InfoID = styled.div`
  ${TYPO.LIGHT_R}
  display: flex;
  align-items: center;
  justify-content: right;
  position: absolute;
  right: 1.875rem;
  bottom: 0.9375rem;
  width: 12.5rem;
  height: 2rem;
  color: #db0000;
`
