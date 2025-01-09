/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear View Track Component
 *
 * This component displays the details of a specific track, allows editing the track details,
 * and supports deleting the track with a confirmation dialog.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrackById, updateTrack, deleteTrack } from '../../services/api';
import './ViewTrack.css';
const ViewTrack = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const [track, setTrack] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  /**
   * Fetches the track details on component mount.
   */
  useEffect(() => {
    if (trackId) {
      fetchTrack(Number(trackId));
    }
  }, [trackId]);

  /**
   * Fetches the track details by ID.
   *
   * @param {number} trackId - The ID of the track to fetch.
   */
  const fetchTrack = async (trackId) => {
    try {
      const data = await getTrackById(trackId);
      setTrack(data);
    } catch (err) {
      if (err.response?.status === 404) {
        console.error('Track not found:', err);
        setTrack(null);
      } else {
        console.error('Error fetching track:', err);
      }
    }
  };

  /**
   * Toggles the editing mode for the track details.
   */
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  /**
   * Saves the changes made to the track details.
   */
  const saveChanges = async () => {
    if (track && track.track_id) {
      try {
        await updateTrack(track.track_id, track);
        alert('Track updated successfully!');
        setIsEditing(false);
      } catch (err) {
        console.error('Error updating track:', err);
        alert('Failed to update track.');
      }
    }
  };

  /**
   * Opens the delete confirmation dialog.
   */
  const openDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  /**
   * Confirms and deletes the track.
   */
  const confirmDelete = async () => {
    if (track && track.track_id) {
      try {
        await deleteTrack(track.track_id);
        alert('Track deleted successfully!');
        navigate('/tracks');
      } catch (err) {
        console.error('Error deleting track:', err);
        alert('Failed to delete track.');
      }
    }
  };

  /**
   * Cancels the delete confirmation dialog.
   */
  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  if (!track) {
    return (
      <div className="container mt-4 text-center">
        <h3>Track Not Found</h3>
        <p>The requested track could not be found. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Track Details</h2>

      <form className="card p-4 shadow-lg">
        {['title', 'artist', 'genre', 'duration'].map((field) => (
          <div className="mb-3" key={field}>
            <label htmlFor={field} className="form-label">
              <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
            </label>
            <input
              id={field}
              name={field}
              type="text"
              className="form-control"
              placeholder={`Enter ${field}`}
              value={track[field] || ''}
              readOnly={!isEditing}
              onChange={(e) =>
                setTrack({ ...track, [field]: e.target.value })
              }
            />
          </div>
        ))}

        <div className="d-flex justify-content-between">
        <div className="d-flex">
            <button
            type="button"
            className="btn-view"
            onClick={toggleEdit}
            >
            {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <button
            type="button"
            className={`btn-save ${isEditing ? 'edit-mode' : ''}`}
            disabled={!isEditing}
            onClick={saveChanges}
            >
            Save
            </button>
        </div>
        <button
            type="button"
            className="btn-danger btn-delete"
            onClick={openDeleteConfirmation}
        >
            Delete
        </button>
        </div>


      </form>

      {showConfirmation && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>
              Are you sure you want to delete "{track.title}"?
            </h3>
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-danger me-2"
                onClick={confirmDelete}
              >
                Confirm
              </button>
              <button
                className="btn btn-secondary"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTrack;
