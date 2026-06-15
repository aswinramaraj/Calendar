require('dotenv').config();
const { sendWhatsApp } = require('./services/twilio');

const triggerTest = async () => {
  // 1. Mocking the data
  const mockEvents = [
    { title: "System Initialization", daysUntil: 0 },
    { title: "React Frontend Build", daysUntil: 1 }
  ];

  // 2. Mocking your personal settings
  const mockSettings = {
    adminName: "Aswin",
    adminPhone: "whatsapp:+919025958422" // <-- PUT YOUR NUMBER HERE
  };

  console.log("🚀 Firing test message to Twilio Sandbox...");
  
  // 3. Execute the service
  await sendWhatsApp(mockEvents, mockSettings);
};

triggerTest();