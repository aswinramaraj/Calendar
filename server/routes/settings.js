const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// GET: Fetch settings (or create defaults if none exist)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        adminName: 'Admin',
        adminPhone: 'whatsapp:+91XXXXXXXXXX', // Change to your actual number later
        adminEmail: 'your.email@gmail.com'
      });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT: Update settings
router.put('/', async (req, res) => {
  try {
    // findOneAndUpdate with an empty filter {} targets the single settings document
    const updatedSettings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(updatedSettings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;