import React from 'react'
import './Welcome.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-header">
          <img src={assets.logo} alt="Logo" className="welcome-logo" />
          <h1>Welcome to Admin Dashboard</h1>
          <p>Manage your books and orders efficiently</p>
        </div>
        
        <div className="welcome-stats">
          <div 
            className="stat-card" 
            onClick={() => handleCardClick('/add')}
            role="button"
            tabIndex={0}
          >
            <img src={assets.add_icon} alt="Add" />
            <h3>Add New Book</h3>
            <p>Add new books to your collection</p>
            <span className="card-hover-text">Click to Add Books</span>
          </div>
          
          <div 
            className="stat-card"
            onClick={() => handleCardClick('/list')}
            role="button"
            tabIndex={0}
          >
            <img src={assets.order_icon} alt="List" />
            <h3>Manage Books</h3>
            <p>View and manage your book inventory</p>
            <span className="card-hover-text">Click to View Books</span>
          </div>
          
          <div 
            className="stat-card"
            onClick={() => handleCardClick('/orders')}
            role="button"
            tabIndex={0}
          >
            <img src={assets.parcel_icon} alt="Orders" />
            <h3>Track Orders</h3>
            <p>Monitor and manage customer orders</p>
            <span className="card-hover-text">Click to View Orders</span>
          </div>
        </div>

        <div className="welcome-footer">
          <p>Quick Links:</p>
          <div className="quick-links">
            <Link to="/add" className="quick-link-btn">
              <img src={assets.add_icon} alt="Add" />
              Add New Book
            </Link>
            <Link to="/list" className="quick-link-btn">
              <img src={assets.order_icon} alt="List" />
              View All Books
            </Link>
            <Link to="/orders" className="quick-link-btn">
              <img src={assets.parcel_icon} alt="Orders" />
              Check Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome 