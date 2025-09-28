const nodemailer = require('nodemailer');
require('dotenv').config(); // This loads the environment variables from your .env file

// Create a transporter object using your email service's SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your email provider like 'hotmail', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address from the .env file
    pass: process.env.EMAIL_PASS, // Your email password or app password from the .env file
  },
});

// Function to send the email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error to be caught by the server.js route
  }
};

module.exports = { sendEmail };

