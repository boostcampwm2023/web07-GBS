import styled from 'styled-components'

export const ToggleContainer = styled.div<{ isDarkMode: boolean }>`
  cursor: pointer;
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#333' : '#ddd')};
  border-radius: 50px;
  padding: 0.3rem;
  display: flex;
  align-items: center;
  width: 6rem; // rem 단위 사용
  height: 3.5rem; // rem 단위 사용
  position: relative;
  transition: background-color 0.3s ease;
  border: ${({ isDarkMode }) => (isDarkMode ? '1px solid #555' : '1px solid #aaa')};
`

export const ToggleKnob = styled.div<{ isDarkMode: boolean }>`
  background-color: white;
  border-radius: 50%;
  width: 2rem; // rem 단위 사용
  height: 2rem; // rem 단위 사용
  position: absolute;
  left: 5px;
  transition: transform 0.3s ease;

  ${({ isDarkMode }) => isDarkMode && `transform: translateX(2.8rem);`}
`
