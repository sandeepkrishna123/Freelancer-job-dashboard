import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../css/applyProposal.css';

const ApplyProposal = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ message: '', price: '' });
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/proposals/submit', { jobId, ...formData }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Proposal submitted!');
    navigate('/dashboard');
  };

  return (
    <div className="apply-container">
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <textarea name="message" placeholder="Message" onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApplyProposal;