import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      {/* <h1>
        <main class='container'>
          <section class='animation'>
            <div class='first'>
              <div>
                ভর্তি ও চাকরি প্রাপ্তির নিশ্চয়তা দিতে আপনার পাশে আছে জয়কলি।
              </div>
            </div>
            <div class='second'>
              <div>জয়কলি’র বই পড়ে চান্স পেয়েছে হাজার হাজার শিক্ষার্থী।</div>
            </div>
            <div class='third'>
              <div>আপনার প্রয়োজনীয় বইটি নিচের ক্যাটাগরি থেকে বেছে নিন।</div>
            </div>
          </section>
        </main>
      </h1> */}
      {/* <h1> </h1> */}

      <marquee>
        <p className='explore-menu-text'>
          {' '}
          জয়কলি’র প্রশ্নকমনের ডেটাই প্রমান করে জয়কলি’র একসেট বই পড়লে
          বুয়েট-মেডিকেল-বিশ্ববিদ‌্যালয়ে চান্স ও চাকরি নিশ্চিত।{' '}
        </p>
      </marquee>
      <div className='explore-menu-list'>
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? 'All' : item.menu_name
                )
              }
              key={index}
              className='explore-menu-list-item text-center'
            >
              <img
                className={category === item.menu_name ? 'active' : ''}
                src={item.menu_image}
                alt=''
              />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
