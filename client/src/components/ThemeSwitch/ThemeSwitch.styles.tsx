import styled from 'styled-components'

export const ToggleButton = styled.button`
  background: ${(props) => props.theme.colors.primary};
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: ${(props) => props.theme.colors.primaryWeak};
  }
`
