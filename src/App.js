import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PostJob from './pages/PostJob';
import ApplyProposal from './pages/ApplyProposal';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ClientProposals from './pages/ClientProposals';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/apply/:jobId" element={<ApplyProposal />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job/:jobId/proposals" element={<ClientProposals />} />


      </Routes>
    </Router>
  );
}

export default App;