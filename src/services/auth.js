/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear Authentication Service
 *
 * This service provides utility methods for managing the user's authentication state.
 * It handles storing and retrieving the logged-in user's information and checks the login status.
 * The service also includes a method to log out and clear user data.
 */

// Store the currently logged-in user's information in memory
let user = null;

/**
 * Sets the currently logged-in user's information.
 *
 * @param {Object} userData - An object containing the user's name.
 */
export const setUser = (userData) => {
  user = userData;
};

/**
 * Retrieves the currently logged-in user's information.
 *
 * @returns {Object | null} The user's information object, or `null` if no user is logged in.
 */
export const getUser = () => {
  return user;
};

/**
 * Checks if a user is currently logged in.
 *
 * @returns {boolean} `true` if a user is logged in, `false` otherwise.
 */
export const isLoggedIn = () => {
  return !!user; // Returns true if `user` is not null
};

/**
 * Logs the user out by clearing the stored user information.
 */
export const logout = () => {
  user = null; // Clear user data in memory
};
