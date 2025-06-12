const Proposal = require('../models/Proposal');

exports.submitProposal = async (req, res) => {
  try {
    const { jobId, message, price } = req.body;
    const proposal = new Proposal({
      job: jobId,
      freelancer: req.user.userId,
      message,
      price
    });
    await proposal.save();
    res.status(201).json({ message: 'Proposal submitted successfully', proposal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProposalsByJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const proposals = await Proposal.find({ job: jobId }).populate('freelancer', 'name email skills');
    res.status(200).json(proposals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateProposalStatus = async (req, res) => {
  try {
    const { proposalId } = req.params;
    const { status } = req.body;

    if (!['shortlisted', 'hired'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updated = await Proposal.findByIdAndUpdate(
      proposalId,
      { status },
      { new: true }
    ).populate('freelancer', 'name email');

    res.status(200).json({ message: 'Proposal status updated', proposal: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
