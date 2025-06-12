import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../css/postJob.css';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', budget: '', deadline: '' });
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/jobs/create', formData, { headers: { Authorization: `Bearer ${token}` } });
    alert('Job posted!');
    navigate('/dashboard');
  };

  return (
    <div className="postjob-container">
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input name="budget" placeholder="Budget" type="number" onChange={handleChange} required />
        <input name="deadline" type="date" onChange={handleChange} required />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostJob;