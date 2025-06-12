import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Freelancer Job Board</h1>
      <p>Find freelance jobs or hire talented freelancers with ease.</p>
      <div className="home-buttons">
        <button onClick={() => navigate('/register')}>Get Started</button>
       
      </div>
    </div>
  );
};

export default Home;
