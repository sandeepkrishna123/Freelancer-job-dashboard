const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { isFreelancer } = require('../middleware/roleMiddleware');
const { submitProposal, getProposalsByJob } = require('../controllers/proposalController');
const { updateProposalStatus } = require('../controllers/proposalController');

router.patch('/:proposalId/status', protect, updateProposalStatus); 


router.post('/submit', protect, isFreelancer, submitProposal);
router.get('/job/:jobId', protect, getProposalsByJob);

module.exports = router;