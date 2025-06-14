import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Admin Panel</Link>
            </div>
            {isAuthenticated && (
                <div className="navbar-links">
                    <Link to="/">Dashboard</Link>
                    <Link to="/add">Add Book</Link>
                    <Link to="/list">Book List</Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="/users">Users</Link>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar; 