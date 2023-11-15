import { Route, Routes } from 'react-router-dom'
import GlobalStyle from '@/styles/GlobalStyles.styles'
import HomePage from '@/pages/HomePage/HomePage'
import ExPage from '@/pages/ExPage/ExPage'
import BroadcastPage from '@/pages/BroadcastPage/BroadcastPage'

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exPage" element={<ExPage />} />
        <Route path="/broadcastPage" element={<BroadcastPage />} />
      </Routes>
    </>
  )
}

export default App
