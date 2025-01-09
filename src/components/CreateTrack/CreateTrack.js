/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear Create Track Component
 *
 * This component manages the creation of new tracks within the ears2hear application.
 * It interacts with the ApiService to submit new track data to the backend and clears
 * the form fields upon successful creation.
 */

import React, { useState } from 'react';
import { createTrack } from '../../services/api';
import './CreateTrack.css';
const CreateTrack = () => {
  // State for managing form inputs
  const [track, setTrack] = useState({
    title: '',
    artist: '',
    genre: '',
    duration: '',
  });

  /**
   * Handles form submission to create a new track.
   * Clears the form and notifies the user upon successful creation.
   *
   * @param {Event} e - The form submit event.
   */
  const onCreateTrack = async (e) => {
    e.preventDefault();
    try {
      const response = await createTrack(track);
      console.log('Track created successfully:', response); // Debugging log
      alert('Track created successfully!');
      resetForm(); // Reset form fields
    } catch (error) {
      console.error('Error creating track:', error); // Debugging log
      alert('Failed to create track.');
    }
  };

  /**
   * Resets the form inputs to their initial state.
   */
  const resetForm = () => {
    setTrack({
      title: '',
      artist: '',
      genre: '',
      duration: '',
    });
  };

  /**
   * Updates form state when input fields change.
   *
   * @param {Event} e - The input change event.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrack((prevTrack) => ({ ...prevTrack, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Create a New Track</h2>

      <form className="card p-4 shadow-lg" onSubmit={onCreateTrack}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <strong>Title:</strong>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="form-control"
            placeholder="Enter track title"
            required
            value={track.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="artist" className="form-label">
            <strong>Artist:</strong>
          </label>
          <input
            id="artist"
            name="artist"
            type="text"
            className="form-control"
            placeholder="Enter artist name"
            required
            value={track.artist}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            <strong>Genre:</strong>
          </label>
          <input
            id="genre"
            name="genre"
            type="text"
            className="form-control"
            placeholder="Enter genre"
            required
            value={track.genre}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="duration" className="form-label">
            <strong>Duration:</strong>
          </label>
          <input
            id="duration"
            name="duration"
            type="text"
            className="form-control"
            placeholder="Enter duration (e.g., 03:45)"
            required
            value={track.duration}
            onChange={handleInputChange}
          />
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn">
            Create Track
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrack;
