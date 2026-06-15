const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  person: { type: String },
  category: { 
    type: String, 
    enum: ['birthday', 'anniversary', 'exam', 'reminder', 'festival', 'other'], 
    required: true 
  },
  date: { type: Date, required: true },
  repeat: { 
    type: String, 
    enum: ['yearly', 'monthly', 'once'], 
    default: 'once' 
  },
  note: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);