import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false) // NEW
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    navigate('/')
  }

  const handleMenuClick = (menuName) => {
    setMenu(menuName)
    setMobileMenuOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Navigate to a search results page or filter products as needed
    navigate(`/shop?search=${encodeURIComponent(search)}`)
    setMobileMenuOpen(false)
    setShowSearch(false) // Hide after search
  }

  return (
    <div className='navbar'>
      <Link to='/'>
        <img className='logo' src={assets.logo} alt='' />
      </Link>
      <div
        className='navbar-hamburger'
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
      <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <Link
          to='/'
          onClick={() => handleMenuClick('home')}
          className={menu === 'home' ? 'active' : ''}
        >
          HOME
        </Link>
        <Link
          to='/shop'
          onClick={() => handleMenuClick('shop')}
          className={menu === 'shop' ? 'active' : ''}
        >
          SHOP PAGE
        </Link>
        <Link
          to='/about'
          onClick={() => handleMenuClick('about')}
          className={menu === 'about' ? 'active' : ''}
        >
          ABOUT US
        </Link>
        <Link
          to='/contact'
          onClick={() => handleMenuClick('contact')}
          className={menu === 'contact' ? 'active' : ''}
        >
          CONTACT US
        </Link>
        <Link
          to='/blog'
          onClick={() => handleMenuClick('blog')}
          className={menu === 'blog' ? 'active' : ''}
        >
          BLOG
        </Link>
        {/* Mobile-only: Cart and Search */}
        <li className='mobile-menu-icons'>
          <form
            onSubmit={handleSearch}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <input
              type='text'
              placeholder='Search...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='navbar-search-input'
            />
            <button type='submit' className='navbar-search-btn'>
              <img src={assets.search_icon} alt='search' />
            </button>
          </form>
          <Link to='/cart' onClick={() => setMobileMenuOpen(false)}>
            <img src={assets.basket_icon} alt='cart' />
            <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
          </Link>
          {!token ? (
            <button
              onClick={() => {
                setShowLogin(true)
                setMobileMenuOpen(false)
              }}
            >
              sign in
            </button>
          ) : (
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt='' />
              <ul className='nav-profile-dropdown'>
                <li
                  onClick={() => {
                    navigate('/myorders')
                    setMobileMenuOpen(false)
                  }}
                >
                  <img src={assets.bag_icon} alt='' />
                  <p>Orders</p>
                </li>
                <hr />
                <li>
                  <img src={assets.logout_icon} alt='' />
                  <p
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                  >
                    Logout
                  </p>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>

      {/* Desktop right section */}
      <div className='navbar-right'>
        <div className='navbar-search'>
          {!showSearch ? (
            <button
              className='navbar-search-icon-btn'
              onClick={() => setShowSearch(true)}
              type='button'
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <img src={assets.search_icon} alt='search' />
            </button>
          ) : (
            <form
              onSubmit={handleSearch}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <input
                type='text'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='navbar-search-input'
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
              <button type='submit' className='navbar-search-btn'>
                <img src={assets.search_icon} alt='search' />
              </button>
            </form>
          )}
        </div>
        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt='' />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='' />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/profile')}>
                <img src={assets.profile_icon} alt='' />
                <p>Profile</p>
              </li>
              <hr />
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt='' />
                <p>Orders</p>
              </li>
              <hr />
              <li>
                <img src={assets.logout_icon} alt='' />
                <p onClick={logout}>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
