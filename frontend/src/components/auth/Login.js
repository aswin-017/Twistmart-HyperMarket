import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/AuthContext';
import '../../assets/css/static/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        handleLogin(data.token, data.user.role, data.user.id, data.user.firstName, data.user.lastName);
        toast.success(`Login successful as ${data.user.role}`);
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error('An error occurred during login');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <button onClick={handleHome} className="home-button">
        Home
      </button>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="signup-box">
          <p>Don't have an account?</p>
          <button onClick={handleSignup} className="signup-button">
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
