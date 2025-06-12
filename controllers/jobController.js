const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { title, description, budget, deadline } = req.body;
    const newJob = new Job({
      title,
      description,
      budget,
      deadline,
      client: req.user.userId,
      status: 'open'
    });
    await newJob.save();
    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'open' }).populate('client', 'name email');
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};