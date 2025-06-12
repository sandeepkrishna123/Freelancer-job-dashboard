const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();


app.use(cors());
app.use(bodyParser.json()); 
app.use(express.json());    

app.get('/', (req, res) => {
  res.send('API is running...');
});


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const proposalRoutes = require('./routes/proposalRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/proposals', proposalRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(' Database is connected');
})
.catch((err) => {
  console.error(' Error in DB connection:', err.message);
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(` Server is running on port ${port}`);
});
