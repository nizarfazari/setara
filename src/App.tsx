import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppProvider from './context'
import Login from './pages/login'
import Home from './pages/homepage'
import TransactionFailed from './pages/transactionFailed'


function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/transactionFailed' element={<TransactionFailed />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
