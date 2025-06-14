import React, { useState } from 'react'
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
import Academy from '../../components/Academy/Academy'
import Video from '../../components/Video/Video'
import QuestionDataSection from '../../components/QuestionDataSection/QuestionDataSection'
import NewArrivals from '../../components/NewArrivals/NewArrivals'

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

const Home = () => {
  const [category, setCategory] = useState('All')
  return (
    <div>
      <Header />
      <ServicesTag />
      <br />
      <Sale />
      <br />
      <QuestionDataSection />
      <br />
      <NewArrivals />
      <br />
      <Academy />
      <br />
      <Video />

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
