import { Route, Routes } from 'react-router-dom'

import GlobalStyle from '/src/styles/GlobalStyles.styles'
import HomePage from '/src/pages/HomePage/HomePage'
import ExPage from '/src/pages/ExPage/ExPage'
import BroadcastPage from '/src/pages/BroadcastPage/BroadcastPage'

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
