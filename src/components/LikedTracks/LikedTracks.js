/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear Liked Tracks Component
 *
 * This component manages the user's liked tracks within the ears2hear application.
 * It interacts with the ApiService to retrieve, display, and remove liked tracks.
 * The component handles user interactions for unliking tracks and dynamically updates
 * the displayed list without refreshing the entire page.
 */

import React, { useState, useEffect } from 'react';
import { getLikedTracks, removeLikedTrack } from '../../services/api';
import './LikedTracks.css';
const LikedTracks = () => {
  const [likedTracks, setLikedTracks] = useState([]); // Array to store liked tracks
  const [errorMessage, setErrorMessage] = useState(''); // Error message for failures

  /**
   * Fetches the user's liked tracks on component mount.
   */
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchLikedTracks(userId);
    } else {
      console.error('User ID could not be retrieved from token.');
      setErrorMessage('Failed to retrieve user ID.');
    }
  }, []);

  /**
   * Fetches liked tracks for the specified user ID and updates the state.
   *
   * @param {number} userId - The ID of the user whose liked tracks are being fetched.
   */
  const fetchLikedTracks = async (userId) => {
    try {
      const data = await getLikedTracks(userId);
      setLikedTracks(data);
    } catch (err) {
      console.error('Error fetching liked tracks:', err);
      setErrorMessage('Failed to fetch liked tracks. Please try again later.');
    }
  };

  /**
   * Unlikes a track for the current user and removes it from the displayed list.
   *
   * @param {number} trackId - The ID of the track to be unliked.
   */
  const unlikeTrack = async (trackId) => {
    if (!trackId) {
      console.error('Invalid track ID:', trackId);
      setErrorMessage('Failed to unlike track: Invalid track ID.');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.warn('No valid token found. Cannot unlike track.');
      setErrorMessage('Failed to unlike track: User not authenticated.');
      return;
    }

    try {
      console.log(`Attempting to unlike track with ID: ${trackId} for user ID: ${userId}`);
      await removeLikedTrack(userId, trackId);
      console.log(`Track with ID: ${trackId} successfully unliked.`);
      setLikedTracks((prevTracks) =>
        prevTracks.filter((track) => track.track_id !== trackId)
      );
    } catch (err) {
      console.error('Error unliking track:', err);
      setErrorMessage('Failed to unlike the track. Please try again later.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Liked Tracks</h2>

      {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

      {likedTracks.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Genre</th>
                <th>Duration</th>
                <th>Liked Tracks</th>
              </tr>
            </thead>
            <tbody>
              {likedTracks.map((track, index) => (
                <tr key={track.track_id}>
                  <td>{index + 1}</td>
                  <td>{track.title}</td>
                  <td>{track.artist}</td>
                  <td>{track.genre}</td>
                  <td>{track.duration}</td>
                  <td>
                    <i
                      className="fa-heart fas"
                      style={{ color: '#9f7f7b', cursor: 'pointer', fontSize: '1.5rem' }}
                      title="Unlike"
                      onClick={() => unlikeTrack(track.track_id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted">You have not liked any tracks yet.</p>
      )}
    </div>
  );
};

export default LikedTracks;
