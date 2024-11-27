// app/user_data/page.js

'use client' // Ensures this component is rendered client-side

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); // Router is available now since this is a client-side component

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      if (!token) {
        router.push('/login'); // Redirect to login if no token is found
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
  }, [router]); // Run the effect again if router changes (not typically necessary)

  if (loading) return <div>Loading...</div>; // Show loading text while fetching data
  if (error) return <div>{error}</div>; // Show error message if something goes wrong

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>User ID:</strong> {user?.id}</p>
    </div>
  );
};

export default ProfilePage;
