import React from 'react'
import './Video.css'

const TestimonialSection = () => {
  return (
    <div className='video-section'>
      <div className='video-grid'>
        {/* Left - YouTube Video */}
        <div className='video-container'>
          <div className='video-wrapper'>
            <iframe
              src='https://www.youtube.com/embed/rq52kJbNdvA'
              title='YouTube video'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
          <a
            href='https://www.youtube.com/@JoykolyAcademy'
            target='_blank'
            rel='noopener noreferrer'
            className='cta-button'
          >
            এখানে ক্লিক করে সকল ভিডিও দেখুন
          </a>
        </div>

        {/* Right - Testimonial Card */}
        <div className='testimonial-card'>
          <img
            src='https://i.postimg.cc/851V4h09/Capture.jpg'
            alt='student'
            className='student-image'
          />
          <p className='testimonial-text'>
            একাদশ শ্রেণি থেকে ও ভর্তি প্রস্তুতির সময় কঠিন টেকনিক ও ঘরে রাখার
            Magic words সঙ্গে জয়কলির এক সেট বই যথেষ্ট।
          </p>
          <p className='student-name'>রাজীব নূর</p>
          <p className='student-details'>৪র্থ, মেডিকেল, ২০১৯-২০</p>
          <a
            href='https://joykoly.com/site/testimonials/'
            target='_blank'
            rel='noopener noreferrer'
            className='cta-button'
          >
            এখানে ক্লিক করে সকল মতামত দেখুন
          </a>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSection
