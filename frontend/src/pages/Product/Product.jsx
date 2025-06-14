import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { StoreContext } from '../../components/context/StoreContext'
import { assets } from '../../assets/assets'
import './Product.css'

const Product = () => {
  const { id } = useParams()
  const { food_list, addToCart, cartItems, url } = useContext(StoreContext)
  const product = food_list.find((item) => item._id === id)

  if (!product)
    return (
      <div className="product-not-found">Product not found.</div>
    )

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image-section">
          <img
            src={url + '/images/' + product.image}
            alt={product.name}
            className="product-image"
          />
        </div>
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-rating">
            <img src={assets.rating_starts} alt="Rating" />
            <span>4.8 (120 reviews)</span>
          </div>
          <p className="product-price">৳{product.price.toLocaleString('bn-BD')}</p>
          <p className="product-description">{product.description}</p>
          <ul className="product-highlights">
            <li>✅🚚 Fast delivery available</li>
            <li>🔒 Secure payment</li>
          </ul>
          <button
            className="product-add-to-cart"
            onClick={() => addToCart(product._id)}
          >
            {cartItems[product._id] > 0
              ? `Added (${cartItems[product._id]})`
              : 'Add to Cart'}
          </button>
        </div>
      </div>
      <div className="product-reviews-section">
        <h2>Customer Reviews</h2>
        <p className="product-reviews-placeholder">(Reviews coming soon!)</p>
      </div>
    </div>
  )
}

export default Product
