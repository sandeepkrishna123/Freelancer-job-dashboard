import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../css/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err.message);
      }
    };

    fetchProfile();
  }, [token]);

  if (!user) return <div className="profile-container">Loading profile...</div>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
      {user.skills?.length > 0 && (
        <p><strong>Skills:</strong> {user.skills.join(', ')}</p>
      )}
    </div>
  );
};

export default Profile;
