import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'>
        <h2>
          ভর্তি ও চাকরি প্রস্তুতি <br /> শুরু হোক
          <br /> জয়কলি’র সাথেই
        </h2>
        <p>
          মূল বইয়ের পাশাপাশি বুয়েট পদার্থ/পদার্থ বিচিত্রা, বুয়েট রসায়ন /
          রসায়ন বিচিত্রা, বুয়েট গণিত/গণিত বিচিত্রা, বায়োলজি বিচিত্রা এবং
          প্রশ্নব্যাংক বইগুলো ভালোভাবে অনুশীলন করলে ভর্তি পরীক্ষায় ভালো ফলাফল
          অর্জন করা সম্ভব। |{' '}
        </p>
        <Link to='/shop'>
          <button>Buy Now</button>
        </Link>
      </div>
    </div>
  )
}

export default Header
