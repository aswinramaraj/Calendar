require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));

// Health Check Route (Just to test if it's working)
app.get('/api/health', (req, res) => {
    res.json({ message: 'My Dates Backend is alive and kicking! 🚀' });
});

// Initialize Cron Job
require('./jobs/dailyNotifier');
// Middleware

// // Initialize Cron Job
// const { runDailyCheck } = require('./jobs/dailyNotifier');
// setTimeout(() => { runDailyCheck(); }, 5000); // Forces the check to run 5 seconds after server boots!
// Routes
app.use('/api/events', require('./routes/events'));
// Routes
app.use('/api/events', require('./routes/events'));
app.use('/api/settings', require('./routes/settings')); // <-- UNCOMMENT THIS LINE

// MongoDB Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));