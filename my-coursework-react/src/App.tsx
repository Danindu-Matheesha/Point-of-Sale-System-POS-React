import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ItemCategory from './pages/ItemCategory/ItemCategory'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/auth/Login'
import ProtectedRoute from './components/ProtectedRoute'


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
            <Route path="/categories" element={<ItemCategory />} />
          </Route>
          <Route path='/auth/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
