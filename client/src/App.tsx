import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalStyle from '@/styles/GlobalStyles.styles'
import MainPage from '@/pages/MainPage/MainPage'
import BroadcastPage from '@/pages/BroadcastPage/BroadcastPage'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '@/styles/theme'
import useStoredTheme from '@/hooks/useStoredTheme'
import { ThemeFlag } from './types/theme'

function App() {
  const currentTheme = useStoredTheme()
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
