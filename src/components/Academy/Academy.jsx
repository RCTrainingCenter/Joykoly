import React from 'react'
import { BookOpen, FileText, HelpCircle } from 'lucide-react'
import './Academy.css'

const Academy = () => {
  const items = [
    {
      icon: <BookOpen size={40} />,
      title: (
        <a
          href='https://web.joykolyacademy.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          জয়কলি একাডেমি
        </a>
      ),
      subtitle: 'VIDEO CLASS, MODEL TEST & SELF-TEST',
    },
    {
      icon: <FileText size={40} />,
      title: (
        <a
          href='https://educircular.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          নোটিশ বোর্ড
        </a>
      ),
      subtitle: 'ALL ADMISSION & JOB NOTICES',
    },
    {
      icon: <HelpCircle size={40} />,
      title: 'প্রশ্ন কমনের প্রমাণ',
      subtitle: 'QUESTION COMMON DATA',
    },
  ]

  return (
    <section className='academy-section'>
      <div className='academy-container'>
        <h2 className='academy-title'>
          জয়কলি একাডেমি ফিচারসমূহ
        </h2>
        <div className='academy-grid'>
          {items.map((item, idx) => (
            <div key={idx} className='feature-card'>
              <div className='icon-container'>
                {item.icon}
              </div>
              <h3 className='card-title'>
                {item.title}
              </h3>
              <p className='card-subtitle'>{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Academy
