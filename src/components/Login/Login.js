/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear Login Component
 *
 * This component handles user authentication for the ears2hear application.
 * It collects user credentials, interacts with the ApiService to authenticate the user,
 * and redirects authenticated users to the home page. If authentication fails,
 * it displays an error message.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, saveToken } from '../../services/api';
import './Login.css';
const Login = () => {
  // State for user credentials and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  /**
   * Handles user authentication by sending credentials to the backend.
   * If successful, saves the authentication token and redirects to the home page.
   * If unsuccessful, sets an error message.
   *
   * @param {Event} e - Form submit event.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      console.log('Login successful:', response); // Log success for debugging

      // Save the token in localStorage
      saveToken(response.token);
      console.log('Received token:', response.token); // Log token for debugging
    
      // Save the user ID in localStorage
      localStorage.setItem('userId', response.user.id); // Ensure `response.user.id` contains the user ID



      // Redirect to the home page
      navigate('/home');
    } catch (err) {
      console.error('Login failed:', err); // Log error for debugging
      setLoginError('Invalid username or password'); // Display error message to the user
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        {loginError && (
          <div className="text-danger text-center mt-3">{loginError}</div>
        )}
        <div className="text-center mt-4">
          <a href="/register" className="register-link">
            Don't have an account? Register here!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
