import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalStyle from '@/styles/GlobalStyles.styles'
import MainPage from '@/pages/MainPage/MainPage'
import BroadcastPage from '@/pages/BroadcastPage/BroadcastPage'
import { ThemeProvider } from 'styled-components'
import { useRecoilValue } from 'recoil'
import { themeState, ThemeFlag } from '@/state/theme'
import { lightTheme, darkTheme } from '@/styles/theme'

function App() {
  const currentTheme = useRecoilValue(themeState)
  const theme = currentTheme === ThemeFlag.light ? lightTheme : darkTheme
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle theme={theme} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<BroadcastPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
