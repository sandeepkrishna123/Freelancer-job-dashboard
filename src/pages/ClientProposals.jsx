import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import '../css/proposals.css';

const ClientProposals = () => {
  const { jobId } = useParams();
  const token = localStorage.getItem('token');
  const [proposals, setProposals] = useState([]);

  const fetchProposals = async () => {
    const res = await api.get(`/proposals/job/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProposals(res.data);
  };

  const handleStatusUpdate = async (proposalId, newStatus) => {
    await api.patch(`/proposals/${proposalId}/status`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProposals();
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <div className="proposals-container">
      <h2>Proposals for This Job</h2>
      {proposals.length === 0 ? (
        <p>No proposals submitted yet.</p>
      ) : (
        proposals.map(proposal => (
          <div className="proposal-card" key={proposal._id}>
            <p><strong>Freelancer:</strong> {proposal.freelancer.name}</p>
            <p><strong>Message:</strong> {proposal.message}</p>
            <p><strong>Price:</strong> ₹{proposal.price}</p>
            <p><strong>Status:</strong> {proposal.status}</p>
            {proposal.status === 'submitted' && (
              <div className="proposal-actions">
                <button onClick={() => handleStatusUpdate(proposal._id, 'shortlisted')}>Shortlist</button>
                <button onClick={() => handleStatusUpdate(proposal._id, 'hired')}>Hire</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ClientProposals;
