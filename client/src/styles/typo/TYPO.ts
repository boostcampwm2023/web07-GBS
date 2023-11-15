import { css } from 'styled-components'

const getFontSize = (size: 'L' | 'M' | 'R' | 'S') => {
  switch (size) {
    case 'L':
      return '36px'
    case 'M':
      return '24px'
    case 'R':
      return '18px'
    case 'S':
      return '12px'
    default:
      return '16px'
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
}

export default TYPO
