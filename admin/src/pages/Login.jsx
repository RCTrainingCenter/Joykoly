import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // For development/testing purposes
      if (formData.email === 'admin@joykoly.com' && formData.password === 'admin123') {
        localStorage.setItem('adminToken', 'admin-token');
        toast.success('Login successful!');
        navigate('/', { replace: true });
        return;
      }

      const response = await fetch('https://joykoly-server.onrender.com/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        toast.success('Login successful!');
        navigate('/', { replace: true });
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    }
  };

  // Redirect if already logged in
  if (localStorage.getItem('adminToken')) {
    navigate('/', { replace: true });
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>Admin Login</h2>
          <p>Welcome back! Please login to your account.</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="login-button">
            Sign in
          </button>
        </form>
        <div className="credentials-note">
          Only for RC
        </div>
      </div>
    </div>
  );
};

export default Login; 