import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppProvider from './context'
import Login from './pages/login/index'
import Home from './pages/Home'
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
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
