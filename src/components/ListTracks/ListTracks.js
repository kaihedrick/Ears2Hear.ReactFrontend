/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear List Tracks Component
 *
 * This component displays all available tracks in the ears2hear application and allows users to like tracks.
 * It interacts with the ApiService to retrieve tracks and the user's liked tracks. The component dynamically updates
 * the UI based on user actions, such as liking a track, and provides feedback messages to the user.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTracks, getLikedTracks, addLikedTrack, removeLikedTrack } from '../../services/api';
import './ListTracks.css';
const ListTracks = () => {
  const [tracks, setTracks] = useState([]); // Array to store all tracks
  const [likedTracksIds, setLikedTracksIds] = useState([]); // Array to store IDs of liked tracks
  const [message] = useState(''); // Feedback message to display to the user
  const [errorMessage, setErrorMessage] = useState(''); // Error message to display in case of failures
  const [showMessage] = useState(false); // Controls visibility of feedback message
  const navigate = useNavigate();

  /**
   * Fetches all tracks and the user's liked tracks on component mount.
   */
  useEffect(() => {
    fetchTracks();
    fetchLikedTracks();
  }, []);

  /**
   * Fetches all available tracks from the backend and updates the tracks array.
   */
  const fetchTracks = async () => {
    try {
      const data = await getTracks();
      setTracks(data);
    } catch (err) {
      console.error('Error fetching tracks:', err);
      setErrorMessage('Failed to load tracks.');
    }
  };

  /**
   * Fetches the list of liked tracks for the current user and updates the likedTracksIds array.
   */
  const fetchLikedTracks = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found.');
        return;
      }
      const data = await getLikedTracks(userId);
      setLikedTracksIds(data.map((track) => track.track_id));
    } catch (err) {
      console.error('Error fetching liked tracks:', err);
    }
  };

  /**
   * Toggles the like/unlike state of a track.
   */
  const toggleLikeTrack = (trackId) => {
    if (likedTracksIds.includes(trackId)) {
      unlikeTrack(trackId);
    } else {
      likeTrack(trackId);
    }
  };

  /**
   * Likes a track and updates the UI.
   */
  const likeTrack = async (trackId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User not authenticated.');
        return;
      }
      await addLikedTrack(userId, trackId);
      setLikedTracksIds((prev) => [...prev, trackId]);
    } catch (err) {
      console.error('Error liking track:', err);
    }
  };

  /**
   * Unlikes a track and updates the UI.
   */
  const unlikeTrack = async (trackId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User not authenticated.');
        return;
      }
      await removeLikedTrack(userId, trackId);
      setLikedTracksIds((prev) => prev.filter((id) => id !== trackId));
    } catch (err) {
      console.error('Error unliking track:', err);
    }
  };



  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Tracks</h2>

      {showMessage && <div className="alert alert-info text-center">{message}</div>}
      {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Genre</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => (
              <tr key={track.track_id}>
                <td>{index + 1}</td>
                <td>{track.title}</td>
                <td>{track.artist}</td>
                <td>{track.genre}</td>
                <td>{track.duration}</td>
                <td>
                    <div className="actions-column">
                        {/* Wrench Icon for View */}
                        <i
                        className="fas fa-wrench settings-icon"
                        onClick={() => navigate(`/view-track/${track.track_id}`)}
                        title="View Track Settings"
                        ></i>

                        {/* Heart Icon for Like/Unlike */}
                        <i
                        className={`fa-heart ${likedTracksIds.includes(track.track_id) ? 'fas' : 'far'}`}
                        onClick={() => toggleLikeTrack(track.track_id)}
                        title="Toggle Like"
                        ></i>
                    </div>
                    </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTracks;
