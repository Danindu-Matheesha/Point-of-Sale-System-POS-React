import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ItemCategory from './pages/ItemCategory/ItemCategory'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/auth/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Item from './pages/Item/Item'
import Stock from './pages/stock/Stock'
import CreateStock from './pages/stock/CreateStock'
import Cart from './pages/cart/Cart'
import CreateCart from './pages/cart/CreateCart'
import GetItem from './pages/Item/GetItem'
import CreateUser from './pages/auth/CreateUser'


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
            <Route path="/categories" element={<ItemCategory />} />
            <Route path='/item' element={<Item />} />
            <Route path='/item/getitems' element={<GetItem />} />
            <Route path='/stock' element={<Stock />} />
            <Route path='/stock/Create' element={<CreateStock />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/cart/Create' element={<CreateCart />} />
          </Route>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/login/usercreate' element={<CreateUser />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
