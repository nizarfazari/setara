import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppProvider from './context'
import Login from './pages/login'
import Home from './pages/Home'
import DestinationNumberPage from './pages/DestinationNumber'

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/destination-number' element={<DestinationNumberPage />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
