const nodemailer = require('nodemailer');

const sendEmail = async (events, settings) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  let htmlBody = `<h3>🌅 Good morning, ${settings.adminName}!</h3><p>Here are your upcoming dates:</p><ul>`;
  
  events.forEach(event => {
    const dayText = event.daysUntil === 0 ? "Today!" : event.daysUntil === 1 ? "Tomorrow" : `In ${event.daysUntil} days`;
    htmlBody += `<li><b>${event.title}</b> ${event.person ? `(${event.person})` : ''} — ${dayText}</li>`;
  });
  htmlBody += `</ul><p>— My Dates App</p>`;

  try {
    await transporter.sendMail({
      from: `"My Dates App" <${process.env.GMAIL_USER}>`,
      to: settings.adminEmail,
      subject: `📅 You have ${events.length} upcoming date(s)!`,
      html: htmlBody
    });
    console.log('✅ Email sent successfully');
  } catch (err) {
    console.error('❌ Nodemailer Error:', err.message);
  }
};

module.exports = { sendEmail };