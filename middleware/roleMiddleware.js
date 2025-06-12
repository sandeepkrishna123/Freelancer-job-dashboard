const isClient = (req, res, next) => {
  if (req.user.role !== 'client') {
    return res.status(403).json({ message: 'Access denied: Clients only' });
  }
  next();
};

const isFreelancer = (req, res, next) => {
  if (req.user.role !== 'freelancer') {
    return res.status(403).json({ message: 'Access denied: Freelancers only' });
  }
  next();
};

module.exports = { isClient, isFreelancer };