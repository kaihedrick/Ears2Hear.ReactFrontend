/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear Navbar Component
 *
 * This component provides a navigation bar for the ears2hear application.
 * It manages user authentication status, enabling dynamic display of login/logout functionality.
 * The navbar serves as a central point for user navigation within the application.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  const navigate = useNavigate();

  /**
   * Checks if the user is currently logged in by verifying the presence of a token.
   *
   * @returns A boolean value indicating whether the user is logged in.
   */
  const isLoggedIn = () => {
    const token = localStorage.getItem('authToken');
    return !!token; // Returns true if the token exists
  };

  /**
   * Logs the user out by clearing the stored authentication token.
   * After logging out, the user is redirected to the login page.
   */
  const logout = () => {
    localStorage.removeItem('authToken'); // Clear the token
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <a className="navbar-brand" href="/home">Ears2Hear</a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {isLoggedIn() && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/tracks">Tracks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/liked-tracks">Liked Tracks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-track">Create Track</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
              </li>
            </>
          )}
          {!isLoggedIn() && (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
