import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppProvider from './context'
import Login from './pages/Login'
import Home from './pages/Home'
import DestinationNumberPage from './pages/DestinationNumber'
import PlainLayout from './layouts/PlainLayout'

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<PlainLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/destination-number' element={<DestinationNumberPage />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
