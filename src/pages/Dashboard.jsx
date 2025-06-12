import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../css/dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const navigate = useNavigate();
  const [proposalStats, setProposalStats] = useState({
  submitted: 0,
  shortlisted: 0,
  hired: 0
});


  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleApply = async (jobId) => {
  const token = localStorage.getItem('token');
  try {
    const message = prompt("Enter your proposal message:");
    const price = prompt("Enter your proposed price:");

    if (!message || !price) return;

    await api.post('/proposals/submit', {
      jobId,
      message,
      price
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Proposal submitted!");


    await fetchMyProposals(token);
  } catch (err) {
    alert(err.response?.data?.message || "Failed to apply.");
  }
};


  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      return navigate('/login');
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchJobs(token);

    if (parsedUser.role === 'freelancer') {
      fetchMyProposals(token);
    }
  }, []);

  const fetchJobs = async (token) => {
    try {
      const res = await api.get('/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err.message);
    }
  };

 const fetchMyProposals = async (token) => {
  try {
    const res = await api.get('/proposals/my', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const ids = res.data.map(p => String(p.job._id));
    setAppliedJobIds(ids);

  
    const statusCount = {
      submitted: 0,
      shortlisted: 0,
      hired: 0
    };

    res.data.forEach(p => {
      if (statusCount[p.status] !== undefined) {
        statusCount[p.status]++;
      }
    });

    setProposalStats(statusCount);
  } catch (err) {
    console.error('Error fetching proposals:', err.message);
  }
};


  const handlePostJob = () => navigate('/post-job');

  if (!user) return <div>Loading...</div>;

  return (
    
    <div className="dashboard-container">
      <button onClick={() => navigate('/profile')} style={{ marginBottom: '20px', marginRight:'20px' }}>
  View My Profile
</button>
      

      
      {user.role === 'client' && (
        <>
          <button onClick={handlePostJob}>Post a New Job</button>
          <h3>Your Posted Jobs:</h3>
          {jobs
            .filter(job => job.client._id === user._id)
            
            .map(job => (
              <div className="job-item" key={job._id}>
                <h4> Job Posting Summary:</h4>
<ul>
  <li>Total Jobs Posted: {
    jobs.filter(job => job.client._id === user._id).length
  }</li>
</ul>

                
                <h4>{job.title}</h4>
                <p>{job.description}</p>
                <p>₹{job.budget} | Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
                <a href={`/job/${job._id}/proposals`}>View Proposals</a>
                
              </div>
            ))}
        </>
      )}


      {user.role === 'freelancer' && (
        <div className="job-list">
          <h3>Available Jobs:</h3>
          {jobs.map(job => (
            <div className="job-item" key={job._id}>
              <h4>📈 My Proposal Stats:</h4>
  <ul>
  <li>Total Applied: {appliedJobIds.length}</li>
  <li>Submitted: {proposalStats.submitted}</li>
  <li>Shortlisted: {proposalStats.shortlisted}</li>
  <li>Hired: {proposalStats.hired}</li>
</ul>

              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <p>₹{job.budget} | Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
              {appliedJobIds.includes(job._id) ? (
                <button disabled style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }}>
                  Already Applied
                </button>
              ) : (
                <button onClick={() => handleApply(job._id)}>Apply</button>
              )}
            </div>
          ))}
        </div>
      )}

      <button onClick={handleLogout} style={{ marginTop: '30px', backgroundColor: '#dc3545' }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
