import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import Shop from './pages/Shop/Shop'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Product from './pages/Product/Product'
import Blog from './pages/Blogs/Blog'
import Profile from './pages/Profile/Profile'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/product/:id' element={<Product />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
