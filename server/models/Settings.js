const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  adminName: { type: String, default: 'Admin' },
  adminPhone: { type: String, required: true }, // Twilio WhatsApp number
  adminEmail: { type: String, required: true }, // Gmail address
  notifyTime: { type: String, default: '06:00' },
  whatsappEnabled: { type: Boolean, default: true },
  emailEnabled: { type: Boolean, default: true },
  daysAhead: { type: [Number], default: [0, 1, 7] } 
});

module.exports = mongoose.model('Settings', settingsSchema);