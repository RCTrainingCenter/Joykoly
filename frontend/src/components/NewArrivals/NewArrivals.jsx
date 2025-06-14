import React, { useState, useContext, useEffect, useCallback } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import './NewArrivals.css'

const NewArrivals = () => {
  const { url, food_list } = useContext(StoreContext)
  const [arrivals, setArrivals] = useState([])
  const [current, setCurrent] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [slidesToShow, setSlidesToShow] = useState(5)

  // Update slides to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1)
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2)
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3)
      } else {
        setSlidesToShow(5)
      }
    }

    handleResize() // Initial call
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    fetch(url + '/api/food/newarrivals')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setArrivals((data.data || []).slice(0, 10))
        setIsLoading(false)
      })
      .catch(() => {
        setArrivals(food_list.slice(0, 10))
        setIsLoading(false)
      })
  }, [url, food_list])

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + slidesToShow >= arrivals.length ? 0 : prev + slidesToShow))
  }, [arrivals.length, slidesToShow])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - slidesToShow < 0 ? Math.max(0, arrivals.length - slidesToShow) : prev - slidesToShow))
  }, [arrivals.length, slidesToShow])

  // Auto-slide functionality
  useEffect(() => {
    let interval
    if (isPlaying && !isHovered) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, isHovered, nextSlide])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const visible = arrivals.slice(current, current + slidesToShow)
  const totalPages = Math.ceil(arrivals.length / slidesToShow)
  const currentPage = Math.floor(current / slidesToShow) + 1

  return (
    <div className='new-arrivals-container w-full py-8 sm:py-12 md:py-16 px-2 sm:px-4 md:px-8 flex justify-center items-center'>
      <div className='max-w-7xl mx-auto w-full'>
        {/* Header Section */}
        <div className='text-center mb-8 sm:mb-12'>
          <h2 className='new-arrivals-title text-2xl sm:text-3xl md:text-4xl font-["Baloo_Da_2"] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 via-indigo-700 to-blue-900 mb-2 sm:mb-4'>
            নতুন বই সমূহ
          </h2>
          <div className='overflow-hidden'>
            <marquee className='text-sm sm:text-base md:text-lg'>
              <p className='text-gray-600 font-["Hind_Siliguri"] max-w-2xl mx-auto px-4'>
                আমাদের সর্বশেষ প্রকাশিত বইগুলো দেখুন এবং আপনার প্রয়োজন অনুযায়ী বেছে নিন
              </p>
            </marquee>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className='flex justify-center items-center min-h-[300px] sm:min-h-[400px]'>
            <div className='loading-spinner rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-indigo-600'></div>
          </div>
        ) : (
          <>
            {/* Navigation and Progress Section */}
            <div className='flex flex-col items-center mb-6 sm:mb-8'>
              {/* Navigation Buttons */}
              <div className='flex justify-between items-center w-full max-w-3xl mb-4 px-2 sm:px-4'>
                <button
                  onClick={prevSlide}
                  className='nav-button p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-indigo-50 group'
                  aria-label='Previous'
                >
                  <ChevronLeft className='w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 group-hover:text-indigo-800' />
                </button>

                {/* Play/Pause Button */}
                <button
                  onClick={togglePlayPause}
                  className='play-pause-button p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-indigo-50 group'
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className='w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 group-hover:text-indigo-800' />
                  ) : (
                    <Play className='w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 group-hover:text-indigo-800' />
                  )}
                </button>

                {/* Progress Indicators */}
                <div className='flex items-center gap-2 sm:gap-4'>
                  {/* Page Numbers */}
                  <div className='text-xs sm:text-sm font-["Hind_Siliguri"] text-gray-600'>
                    <span className='font-bold text-indigo-600'>{currentPage}</span>
                    <span className='mx-1'>/</span>
                    <span>{totalPages}</span>
                  </div>

                  {/* Progress Dots */}
                  <div className='flex gap-1 sm:gap-2'>
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrent(idx * slidesToShow)}
                        className={`progress-dot group relative ${
                          current === idx * slidesToShow ? 'active' : ''
                        }`}
                        aria-label={`Go to page ${idx + 1}`}
                      >
                        <div
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                            current === idx * slidesToShow
                              ? 'bg-indigo-600 scale-125'
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                        <div className='tooltip hidden sm:block'>
                          Page {idx + 1}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={nextSlide}
                  className='nav-button p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-indigo-50 group'
                  aria-label='Next'
                >
                  <ChevronRight className='w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 group-hover:text-indigo-800' />
                </button>
              </div>

              {/* Progress Bar */}
              <div className='progress-bar-container w-full max-w-3xl h-1 bg-gray-200 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500 ease-out'
                  style={{
                    width: `${((currentPage - 1) / (totalPages - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Books Grid with Hover Detection */}
            <div 
              className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 justify-items-center'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {visible.map((item, idx) => (
                <div
                  key={item._id || idx}
                  className='book-card transform transition-all duration-300 hover:scale-105'
                >
                  <FoodItem
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                  />
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className='text-center mt-8 sm:mt-12'>
              <a
                href='/shop'
                className='view-all-button inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 text-white px-8 sm:px-16 py-3 sm:py-4 rounded-full font-["Baloo_Da_2"] font-bold tracking-wide text-base sm:text-lg shadow-lg hover:shadow-xl hover:from-indigo-700 hover:via-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-white/20'
              >
                <span>সব বই দেখুন</span>
                <svg 
                  className="w-5 h-5 sm:w-6 sm:h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default NewArrivals 