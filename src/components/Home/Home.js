/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear Home Component
 *
 * This component serves as the landing page for authenticated users in the ears2hear application.
 * It retrieves the username from the authentication token and displays a personalized
 * welcome message. If the user is not authenticated, a default "Guest" message is displayed.
 */

import React, { useState, useEffect } from 'react';
import { getUsernameFromToken } from '../../services/api';
import './Home.css';
const Home = () => {
  const [username, setUsername] = useState(null); // Holds the username of the authenticated user

  /**
   * Initializes the component by retrieving the username from the authentication token.
   */
  useEffect(() => {
    const fetchedUsername = getUsernameFromToken();
    setUsername(fetchedUsername);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="welcome-message">
          <h1>Welcome, {username ? username : 'Guest'}!</h1>
          <p>Your music journey starts here.</p>
          <a href="/tracks" className="btn-primary">Explore Tracks</a>
          <a href="/liked-tracks" className="btn-secondary">View Liked Tracks</a>
        </div>
      </div>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <h2>Discover Worship Music</h2>
          <p>Explore uplifting worship tracks that resonate with your Christian walk.</p>
        </div>
        <div className="feature">
          <h2>Save Favorites</h2>
          <p>Bookmark your favorite hymns and worship songs to listen anytime.</p>
        </div>
        <div className="feature">
          <h2>Stay Connected</h2>
          <p>Share playlists of your favorite worship songs and grow in faith with others.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
