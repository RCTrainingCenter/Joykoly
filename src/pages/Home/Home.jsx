import React, { useState, useContext, useEffect } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Sale from '../../components/Sale/Sale'
import AppDownload from '../../components/AppDownload/AppDownload'
import ServicesTag from '../../components/ServicesTag/ServicesTag'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../components/context/StoreContext'
import { Link } from 'react-router-dom'
import FoodItem from '../../components/FoodItem/FoodItem'

const blogPosts = [
  {
    title: 'How to Prepare for University Admission Exams',
    image: assets.saleImgOne,
    excerpt:
      'Discover the best strategies and resources to ace your university admission tests. Tips, tricks, and more!',
    date: 'June 1, 2024',
    author: 'Admin',
  },
  {
    title: 'Top 5 Study Habits for Success',
    image: assets.saleImgTwo,
    excerpt:
      'Build habits that lead to academic excellence. Learn what top students do differently!',
    date: 'May 20, 2024',
    author: 'Joykoly Team',
  },
  {
    title: 'Balancing Study and Life',
    image: assets.saleImgThree,
    excerpt:
      'Tips on how to maintain a healthy balance between your studies and personal life.',
    date: 'May 10, 2024',
    author: 'Guest Writer',
  },
]

// NewArrivalsGrid component (replaces slider)
const NewArrivalsGrid = () => {
  const { url, food_list } = useContext(StoreContext)
  const [arrivals, setArrivals] = useState([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetch(url + '/api/food/newarrivals')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setArrivals((data.data || []).slice(0, 10)))
      .catch(() => {
        setArrivals(food_list.slice(0, 10))
      })
  }, [url, food_list])

  // Auto-slide logic
  useEffect(() => {
    if (arrivals.length <= 5) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 5 >= arrivals.length ? 0 : prev + 5))
    }, 3000)
    return () => clearInterval(interval)
  }, [arrivals])

  const visible = arrivals.slice(current, current + 5)

  return (
    <div className='new-arrivals-grid'>
      <h2 className='new-arrivals-title'>New Arrivals</h2>
      <div className='Food-display-list new-arrivals-slider-list'>
        {visible.map((item, idx) => (
          <FoodItem
            key={item._id || idx}
            id={item._id}
            name={item.name}
            // description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}

const Home = () => {
  const [category, setCategory] = useState('All')
  return (
    <div>
      <Header />
      <ServicesTag />
      <br />
      <Sale />
      <NewArrivalsGrid />

      {/* Blog Preview Section */}
      <div className='home-blog-preview'>
        <h2 className='home-blog-title'>Latest from Our Blog</h2>
        <div className='home-blog-list'>
          {blogPosts.slice(0, 2).map((post, idx) => (
            <div className='home-blog-card' key={idx}>
              <img
                src={post.image}
                alt={post.title}
                className='home-blog-card-img'
              />
              <div className='home-blog-card-content'>
                <h3>{post.title}</h3>
                <p className='home-blog-card-excerpt'>{post.excerpt}</p>
                <div className='home-blog-card-meta'>
                  <span>{post.date}</span> | <span>{post.author}</span>
                </div>
                <button className='home-blog-read-more'>
                  <a href='/shop'>Buy Now</a>
                </button>
              </div>
            </div>
          ))}
          <AppDownload />
        </div>
      </div>
    </div>
  )
}

export default Home
