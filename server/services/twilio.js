const twilio = require('twilio');

const sendWhatsApp = async (events, settings) => {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
  
  let messageBody = `🌅 *Good morning, ${settings.adminName}!*\n\nYou have ${events.length} important date(s) coming up:\n\n`;
  
  events.forEach(event => {
    const dayText = event.daysUntil === 0 ? "Today!" : event.daysUntil === 1 ? "Tomorrow" : `In ${event.daysUntil} days`;
    messageBody += `📌 *${event.title}* ${event.person ? `(${event.person})` : ''} — ${dayText}\n`;
  });
  
  messageBody += `\n— My Dates App`;

  try {
    await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: settings.adminPhone
    });
    console.log('✅ WhatsApp message sent successfully');
  } catch (err) {
    console.error('❌ Twilio Error:', err.message);
  }
};

module.exports = { sendWhatsApp };