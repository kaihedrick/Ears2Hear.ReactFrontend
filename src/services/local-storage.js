/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear Local Storage Service
 *
 * This service provides utility methods for interacting with the browser's local storage.
 * It abstracts local storage operations, ensuring consistency and reducing repetitive code.
 * The service supports storing, retrieving, and removing key-value pairs in local storage.
 */

/**
 * Retrieves an item from local storage by its key.
 *
 * @param {string} key - The key associated with the item to retrieve.
 * @returns {string | null} The value stored in local storage for the specified key, or `null` if not found.
 */
export const getItem = (key) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null; // Return null if local storage is not accessible
  };
  
  /**
   * Stores an item in local storage with the specified key and value.
   *
   * @param {string} key - The key under which the value will be stored.
   * @param {string} value - The value to store in local storage.
   */
  export const setItem = (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };
  
  /**
   * Removes an item from local storage by its key.
   *
   * @param {string} key - The key of the item to remove.
   */
  export const removeItem = (key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  };
  