// app/login/page.js

'use client' // Ensures this component is rendered on the client side

import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:4000/api/user/signin', {
        username,
        password,
      });

      // Log success and save token to localStorage
      console.log("Login Successful:", response.data);
      setSuccess("Login successful! Redirecting...");

      const token = response.data.token;
      localStorage.setItem('token', token);  // Store token in localStorage

      // Redirect to profile page after successful login
      window.location.href = '/userdata';  // Navigate to the profile page manually

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        {success && <p className="text-sm text-green-600 text-center">{success}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
