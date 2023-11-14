import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import ExPage from './pages/ExPage/ExPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/exPage" element={<ExPage />} />
    </Routes>
  )
}

export default App
