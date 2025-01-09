/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear API Service
 *
 * This service acts as a bridge between the React application and the backend API.
 * It handles HTTP requests for authentication, user data, and track-related operations.
 * It also manages token-based authentication using LocalStorage and provides utility methods for working with JWTs.
 */

import axios from 'axios';
import {jwtDecode} from 'jwt-decode';




// Base URL for backend API
const baseUrl = 'http://localhost:3000/api';

// LocalStorage key used for storing the authentication token
const tokenKey = 'authToken';

/**
 * Logs in the user by sending their credentials to the backend API.
 */
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Creates a new user.
 */
export const createUser = async (user) => {
  try {
    const response = await axios.post(`${baseUrl}/users`, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Retrieves the authentication token from LocalStorage.
 */
export const getToken = () => {
  return localStorage.getItem(tokenKey);
};

/**
 * Saves the authentication token to LocalStorage.
 */
export const saveToken = (token) => {
  localStorage.setItem(tokenKey, token);
};

/**
 * Clears the authentication token from LocalStorage.
 */
export const clearToken = () => {
  localStorage.removeItem(tokenKey);
};

/**
 * Extracts the user ID from the stored JWT token.
 */
export const getUserIdFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.userId || null;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

/**
 * Extracts the username from the stored JWT token.
 */
export const getUsernameFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.username || null;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

/**
 * Sends a GET request to the specified endpoint.
 */
export const get = async (endpoint) => {
  try {
    const headers = createAuthHeaders();
    const response = await axios.get(`${baseUrl}/${endpoint}`, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Sends a POST request to the specified endpoint with the provided data.
 */
export const post = async (endpoint, data) => {
  try {
    const headers = createAuthHeaders();
    const response = await axios.post(`${baseUrl}/${endpoint}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Retrieves all tracks from the backend API.
 */
export const getTracks = async () => {
  try {
    const response = await axios.get(`${baseUrl}/tracks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tracks:', error);
    throw error;
  }
};

/**
 * Retrieves a track by its ID.
 */
export const getTrackById = async (trackId) => {
  return get(`tracks/${trackId}`);
};

/**
 * Creates a new track.
 */
export const createTrack = async (track) => {
  return post('tracks', track);
};

/**
 * Updates a track by its ID.
 */
export const updateTrack = async (trackId, trackData) => {
  try {
    const headers = createAuthHeaders();
    const response = await axios.put(`${baseUrl}/tracks/${trackId}`, trackData, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error updating track ${trackId}:`, error);
    throw error;
  }
};

/**
 * Deletes a track by ID.
 */
export const deleteTrack = async (trackId) => {
  try {
    const headers = createAuthHeaders();
    const response = await axios.delete(`${baseUrl}/tracks/${trackId}`, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error deleting track ${trackId}:`, error);
    throw error;
  }
};

/**
 * Adds a track to the user's liked tracks.
 */
export const addLikedTrack = async (userId, trackId) => {
  try {
    const headers = createAuthHeaders();
    const response = await axios.post(`${baseUrl}/tracks/like`, { userId, trackId }, { headers });
    return response.data;
  } catch (error) {
    console.error('Error adding liked track:', error);
    throw error;
  }
};

/**
 * Removes a track from the user's liked tracks.
 */
export const removeLikedTrack = async (userId, trackId) => {
  try {
    const headers = createAuthHeaders();
    const response = await axios.post(`${baseUrl}/tracks/unlike`, { userId, trackId }, { headers });
    return response.data;
  } catch (error) {
    console.error('Error removing liked track:', error);
    throw error;
  }
};

/**
 * Retrieves all liked tracks for a specific user.
 */
export const getLikedTracks = async (userId) => {
  try {
    const headers = createAuthHeaders();
    const response = await axios.get(`${baseUrl}/tracks/${userId}/liked-tracks`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching liked tracks:', error);
    throw error;
  }
};

/**
 * Creates HTTP headers with the authentication token.
 */
const createAuthHeaders = () => {
  const token = getToken();
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};
