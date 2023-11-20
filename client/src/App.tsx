import { Route, Routes } from 'react-router-dom'
import GlobalStyle from '@/styles/GlobalStyles.styles'
import MainPage from '@/pages/MainPage/MainPage'
import BroadcastPage from '@/pages/BroadcastPage/BroadcastPage'

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/broadcastPage" element={<BroadcastPage />} />
      </Routes>
    </>
  )
}

export default App
