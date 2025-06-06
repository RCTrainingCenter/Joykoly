import React from 'react'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import { useLocation } from 'react-router-dom'

const Shop = () => {
  const [category, setCategory] = React.useState('All')
  const location = useLocation()

  // Get the search query from the URL
  const params = new URLSearchParams(location.search)
  const search = params.get('search')?.toLowerCase() || ''

  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} search={search} />
    </div>
  )
}

export default Shop
