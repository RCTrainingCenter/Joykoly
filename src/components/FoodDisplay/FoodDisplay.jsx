import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category, search = '' }) => {
  const { food_list } = useContext(StoreContext)
  const searchLower = search.toLowerCase()

  // Filter by BOTH category and search term
  const filteredList = food_list
    ? food_list.filter(
        (item) =>
          (category === 'All' || item.category === category) &&
          item.name.toLowerCase().includes(searchLower)
      )
    : []

  return (
    <div className='Food-display'>
      <div className='Food-display-list'>
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <FoodItem
              key={item._id || index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <div>No products found.</div>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay
