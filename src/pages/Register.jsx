import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom'; 
import '../css/register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'client', bio: '', skills: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = formData.skills ? formData.skills.split(',').map(s => s.trim()) : [];
    try {
      await api.post('/auth/register', { ...formData, skills: skillsArray });
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange} value={formData.role}>
          <option value="client">Client</option>
          <option value="freelancer">Freelancer</option>
        </select>
        <textarea name="bio" placeholder="Short Bio" onChange={handleChange} />
        <input name="skills" placeholder="Skills (comma-separated)" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>

      
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
