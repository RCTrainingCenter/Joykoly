import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className='footer-newsletter'>
        <h2>Subscribe to our Newsletter</h2>
        <form
          className='footer-newsletter-form'
          onSubmit={(e) => e.preventDefault()}
        >
          <input type='email' placeholder='Enter your email' required />
          <button type='submit'>
            <a href='./blog'>Subscribe</a>
          </button>
        </form>
      </div>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img className='footer-logo' src={assets.logo} alt='Joykoly Logo' />
          <p>
            <b>যোগাযোগের ঠিকানা</b> <br />
            Joykoly Publications Ltd. <br />
            109, Green Road, Farmgate
            <br />
            Dhaka-1205, Bangladesh
          </p>
          <div className='footer-social-icons'>
            <a
              href='https://www.facebook.com/joykoly'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={assets.facebook_icon} alt='Facebook' />
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={assets.twitter_icon} alt='Twitter' />
            </a>
            <a
              href='https://www.instagram.com/joykoly/#'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={assets.linkedin_icon} alt='LinkedIn' />
            </a>
          </div>
        </div>
        <div className='footer-content-center'>
          <h2>COMPANY</h2>
          <ul>
            <li>
              <a href='/'>Home</a>
            </li>
            <li>
              <a href='./about'>About Us</a>
            </li>
            <li>
              <a href='./contact'>Contact Us</a>
            </li>
            <li>
              <a href='./about'>Blog</a>
            </li>
          </ul>
        </div>
        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+01-678-343-450</li>
            <li>info.joykoly@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>
        &copy; {new Date().getFullYear()} Joykoly.com - All Rights Reserved
      </p>
    </footer>
  )
}

export default Footer
