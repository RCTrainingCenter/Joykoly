import React from 'react'
import { BarChart2 } from 'lucide-react'
import './QuestionDataSection.css'

const QuestionDataSection = () => {
  const progressData = [
    { label: 'বুয়েট', percentage: 90 },
    { label: 'মেডিকেল', percentage: 95 },
    { label: 'ঢাকা বিশ্ববিদ্যালয় (ক ইউনিট)', percentage: 97 },
    { label: 'ঢাকা বিশ্ববিদ্যালয় (খ ইউনিট)', percentage: 95 },
    { label: 'ঢাকা বিশ্ববিদ্যালয় (ঘ ইউনিট)', percentage: 100 },
  ]

  return (
    <div className='question-data-container py-20 px-8 md:flex md:items-center md:justify-center gap-12'>
      {/* Circles */}
      <div className='circles-container w-full md:w-1/2 mb-12 md:mb-0'>
        <div className='stat-circle purple'>
          <BarChart2 size={32} className='mb-2 animate-pulse' />
          <div className='stat-number'>200+</div>
          <div className='stat-label'>লেখক ও সম্পাদক</div>
        </div>
        <div className='stat-circle indigo'>
          <BarChart2 size={32} className='mb-2 animate-pulse' />
          <div className='stat-number'>300+</div>
          <div className='stat-label'>বইমুখ</div>
        </div>
        <div className='stat-circle slate'>
          <BarChart2 size={32} className='mb-2 animate-pulse' />
          <div className='stat-number'>400+</div>
          <div className='stat-label'>পরিবেশক</div>
        </div>
      </div>

      {/* Text and Bars */}
      <div className='content-section w-full md:w-1/2'>
        <h2 className='section-title mb-4 flex items-center gap-3'>
          <BarChart2 className='text-indigo-700 animate-bounce' /> প্রশ্ন কমনের ডেটা
        </h2>
        <p className='mb-8 text-gray-800 text-xl leading-relaxed tracking-wide'>
          <span className='highlight-text'>
            জয়কলির একসেট বই পড়লে
          </span>{' '}
          <br />
          <span className='text-gray-900 font-medium leading-relaxed'>বুয়েট-মেডিকেল-বিশ্ববিদ্যালয়ে চান্স ও চাকরি নিশ্চিত।</span> <br />
          <span className='text-sm text-gray-600 mt-3 inline-block italic tracking-wide'>
            * ডেটা সর্বশেষ পরীক্ষার ভিত্তিতে আপডেট。
          </span>
        </p>
        {progressData.map((item, index) => (
          <div key={index} className='progress-container'>
            <div className='progress-header'>
              <span className='progress-label'>
                {item.label}
              </span>
              <span className='progress-percentage'>
                {item.percentage}%
              </span>
            </div>
            <div className='progress-bar-bg'>
              <div
                className='progress-bar-fill'
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
        <div className='mt-10 text-center'>
          <a
            href='https://joykoly.com/site/qs-common/'
            target='_blank'
            rel='noopener noreferrer'
            className='cta-button'
          >
            বিস্তারিত দেখুন
          </a>
        </div>
      </div>
    </div>
  )
}

export default QuestionDataSection
