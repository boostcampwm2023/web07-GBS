import { css } from 'styled-components'

const getFontSize = (size: 'L' | 'M' | 'R' | 'S') => {
  switch (size) {
    case 'L':
      return '2.25rem'
    case 'M':
      return '1.5rem'
    case 'R':
      return '1.125rem'
    case 'S':
      return '0.75rem'
    default:
      return '1rem'
  }
}

const TYPO = {
  BOLD_L: css`
    font-family: 'Pretendard', sans-serif;
    font-weight: 700;
    font-size: ${getFontSize('L')};
    line-height: auto;
  `,
  BOLD_M: css`
    font-family: 'Pretendard', sans-serif;
    font-weight: 700;
    font-size: ${getFontSize('M')};
    line-height: auto;
  `,
  BOLD_R: css`
    font-family: 'Pretendard', sans-serif;
    font-weight: 700;
    font-size: ${getFontSize('R')};
    line-height: auto;
  `,
  BOLD_S: css`
    font-family: 'Pretendard', sans-serif;
    font-weight: 700;
    font-size: ${getFontSize('S')};
    line-height: auto;
  `,
  MEDIUM_M: css`
    font-family: 'Pretendard', sans-serif;
    font-weight: 500;
    font-size: ${getFontSize('M')};
    line-height: auto;
  `,
  MEDIUM_R: css`
    font-family: 'Pretendard', sans-serif;
    font-weight: 500;
    font-size: ${getFontSize('R')};
    line-height: auto;
  `,
  MEDIUM_S: css`
    font-family: 'Pretendard', sans-serif;
    font-weight: 500;
    font-size: ${getFontSize('S')};
    line-height: auto;
  `,
  LIGHT_M: css`
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: ${getFontSize('M')};
    line-height: auto;
  `,
  LIGHT_R: css`
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: ${getFontSize('R')};
    line-height: auto;
  `,
}

export default TYPO
