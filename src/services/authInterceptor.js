import axios from 'axios';
import { getToken } from './api';

/**
 * This file defines the Axios interceptor for adding an Authorization header
 * with a Bearer token to all outgoing HTTP requests. The token is fetched
 * using the `getToken` function from the `api.js` file.
 */

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // Get the token from local storage or an API service
    const token = getToken();

    // If a token is available, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
