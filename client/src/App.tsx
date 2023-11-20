import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalStyle from '@/styles/GlobalStyles.styles'
import MainPage from '@/pages/MainPage/MainPage'
import BroadcastPage from '@/pages/BroadcastPage/BroadcastPage'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<BroadcastPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
