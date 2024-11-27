// app/user_data/page.js

'use client' // Ensures this component is rendered on the client side

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (!token) {
        // If no token, redirect to login manually
        window.location.href = '/login'; // Redirect to login page
        return;
      }

      setLoading(true);
      try {
        // Fetch the profile using the token
        const response = await axios.get('http://localhost:4000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the request headers
          },
        });

        setUser(response.data.user);  // Store user profile data in state
      } catch (err) {
        setError('Error fetching profile.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array, run only once when the component is mounted

  if (loading) return <div>Loading...</div>; // Show loading text while fetching data
  if (error) return <div>{error}</div>; // Show error message if something goes wrong

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>User ID:</strong> {user?.id}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
