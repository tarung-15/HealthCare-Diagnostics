import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/token/', formData);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      localStorage.setItem('username', res.data.username);
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="auth-bg">
      <div className="login-container">
        <div className="card shadow p-4 w-100 login-card">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              className="form-control mb-3"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              className="form-control mb-3"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
          
          <div className="text-center mt-2">
          <Link to="/" className="back-to-home-link">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
