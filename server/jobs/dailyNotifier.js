const cron = require('node-cron');
const Event = require('../models/Event');
const Settings = require('../models/Settings');
const { calculateNextOccurrence, isWithinDays } = require('../utils/dateHelpers');
const { sendWhatsApp } = require('../services/twilio');
const { sendEmail } = require('../services/mailer');

const runDailyCheck = async () => {
  console.log('⏳ Running daily date check...');
  try {
    // 1. Get settings
    const settings = await Settings.findOne();
    if (!settings) return console.log('⚠️ No settings found in DB. Skipping notifications.');

    // 2. Get all events
    const events = await Event.find();
    let upcomingEvents = [];

    // 3. Filter events that happen within the configured 'daysAhead' (e.g., 0, 1, 7 days)
    events.forEach(event => {
      const nextDate = calculateNextOccurrence(event.date, event.repeat);
      
      settings.daysAhead.forEach(days => {
        if (isWithinDays(nextDate, days)) {
          upcomingEvents.push({ ...event._doc, daysUntil: days });
        }
      });
    });

    // 4. Fire notifications if we found any matches
    if (upcomingEvents.length > 0) {
      if (settings.whatsappEnabled) await sendWhatsApp(upcomingEvents, settings);
    //   if (settings.emailEnabled) await sendEmail(upcomingEvents, settings);
    } else {
      console.log('✅ No events scheduled for today.');
    }
  } catch (err) {
    console.error('❌ Cron Job Error:', err);
  }
};

// Schedule to run every day at 6:00 AM
cron.schedule('0 6 * * *', runDailyCheck);

module.exports = { runDailyCheck };