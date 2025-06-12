const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { isClient } = require('../middleware/roleMiddleware');
const { createJob, getAllJobs } = require('../controllers/jobController');

router.post('/create', protect, isClient, createJob);
router.get('/', protect, getAllJobs);

module.exports = router;