import { createGlobalStyle } from 'styled-components'
import { Theme } from '@/styles/theme'

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video, input, textarea {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    color:inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }

  /* HTML5 display-role reset for older browsers */

  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }

  /* HTML5 hidden-attribute fix for newer browsers */

  *[hidden] {
    display: none;
  }

  body {
    line-height: 1;
    background-color: ${({ theme }) => theme.colors.background_color};
    color: ${({ theme }) => theme.colors.text_color};
  }

  menu, ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* responsive web design */

  html {
    font-size: 16px;
  }

  @media (max-width: 1600px) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: 1366px) {
    html {
      font-size: 12px;
    }
  }

  @media (max-width: 1280px) {
    html {
      font-size: 10px;
    }
  }

  @media (max-width: 1024px) {
    html {
      font-size: 8px;
    }
  }
`
export default GlobalStyle
