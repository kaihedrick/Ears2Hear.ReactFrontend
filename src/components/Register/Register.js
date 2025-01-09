/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear Register Component
 *
 * This component provides a user registration form.
 * It validates user input and interacts with the API service to create a new user account.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/api'; // Import the API service for user creation
import './Register.css';
const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  /**
   * Handles input changes for user and confirmPassword fields.
   *
   * @param {Event} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  /**
   * Validates the form fields and updates the errors state.
   *
   * @returns {boolean} `true` if all fields are valid, otherwise `false`.
   */
  const validateFields = () => {
    const newErrors = {};
    let isValid = true;

    // Validate name
    if (!user.name) {
      newErrors.name = 'Name is required.';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(user.name)) {
      newErrors.name = 'Name can only contain letters and spaces.';
      isValid = false;
    }

    // Validate email
    if (!user.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }

    // Validate password
    if (!user.password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (
      !/^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/.test(user.password)
    ) {
      newErrors.password =
        'Password must be 8-20 characters long and include at least one special character.';
      isValid = false;
    }

    // Validate confirm password
    if (user.password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handles form submission for user registration.
   *
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    // Validate fields before submitting
    if (!validateFields()) return;

    try {
      // Submit user data
      await createUser(user);
      alert('Registration successful!');
      setUser({ name: '', email: '', password: '' });
      setConfirmPassword('');
      navigate('/login'); // Navigate to the login page
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Register</h2>
      <form className="card p-4 shadow-lg" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            <strong>Name:</strong>
          </label>
          {errors.name && <div className="text-danger">{errors.name}</div>}
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <strong>Email:</strong>
          </label>
          {errors.email && <div className="text-danger">{errors.email}</div>}
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <strong>Password:</strong>
          </label>
          {errors.password && <div className="text-danger">{errors.password}</div>}
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            <strong>Confirm Password:</strong>
          </label>
          {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="form-control"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
