const darkColors = {
  background_color: '#292929',
  text_color: '#ffffff',
}

const lightColors = {
  background_color: '#ffffff',
  text_color: '#000000',
}

export const lightTheme = {
  colors: lightColors,
}

export const darkTheme = {
  colors: darkColors,
}

export type Theme = typeof lightTheme | typeof darkTheme
