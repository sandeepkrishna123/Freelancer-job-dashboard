const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  price: Number,
  status: { type: String, enum: ['submitted', 'shortlisted', 'hired'], default: 'submitted' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Proposal', proposalSchema);