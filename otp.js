// otp.js
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const nodemailer = require('nodemailer');
require('dotenv').config();
const router = express.Router();
const db = require('./config/db');

// MySQL Connection

// Twilio Configuration
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Middleware
router.use(bodyParser.json());

// API 1: Generate and Send OTP for Mobile
router.get('/generate/mobile/:userId', (req, res) => {
  const userId = req.params.userId;

  // Retrieve mobile number from User table
  db.query('SELECT MobileNumber FROM User WHERE UserID = ?', [userId], (err, results) => {
    if (err) throw err;

    const mobileNumber = results[0].MobileNumber;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Update OTP in OTP table
    db.query('INSERT INTO OTP (UserID, MobileOTP, MobileOTPExpiration) VALUES (?, ?, NOW() + INTERVAL 10 MINUTE) ON DUPLICATE KEY UPDATE MobileOTP = VALUES(MobileOTP), MobileOTPExpiration = VALUES(MobileOTPExpiration)', [userId, otp], (err) => {
      if (err) throw err;

      // Send OTP using Twilio
      twilioClient.messages.create({
        to: mobileNumber,
        from: '+16312505599',
        body: `Your OTP for Christian Matrimony is ${otp}. This OTP is valid for 10 minutes.`,
      })
        .then(() => res.json({ message: 'OTP sent successfully' }))
        .catch((err) => res.status(500).json({ error: err.message }));
    });
  });
});

// API 2: Validate Mobile OTP
router.post('/validate/mobile/:userId', (req, res) => {
  const userId = req.params.userId;
  const { otp } = req.body;

  // Validate OTP
  db.query('SELECT MobileOTP, MobileOTPExpiration FROM OTP WHERE UserID = ?', [userId], (err, results) => {
    if (err) throw err;

    const mobileOTP = results[0].MobileOTP;
    const expirationTime = new Date(results[0].MobileOTPExpiration).getTime();
    const currentTime = new Date().getTime();

    if (currentTime > expirationTime) {
      res.status(401).json({ error: 'OTP has expired' });
    } else if (mobileOTP === otp) {
      res.json({ message: 'OTP verified successfully' });
    } else {
      res.status(401).json({ error: 'Invalid OTP' });
    }
  });
});

// API 3: Generate and Send OTP for Email
router.get('/generate/email/:userId', (req, res) => {
  const userId = req.params.userId;

  // Retrieve email from User table
  db.query('SELECT Email FROM User WHERE UserID = ?', [userId], (err, results) => {
    if (err) throw err;

    const email = results[0].Email;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Update OTP in OTP table
    db.query('INSERT INTO OTP (UserID, EmailOTP, EmailOTPExpiration) VALUES (?, ?, NOW() + INTERVAL 10 MINUTE) ON DUPLICATE KEY UPDATE EmailOTP = VALUES(EmailOTP), EmailOTPExpiration = VALUES(EmailOTPExpiration)', [userId, otp], (err) => {
      if (err) throw err;

      // Send OTP using Nodemailer
      const mailOptions = {
        from: 'Cristian Matrimony',
        to: email,
        subject: 'Christian Matrimony - OTP Verification',
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  color: #333;
                }
                .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  background-color: #fff;
                }
                .header {
                  font-size: 20px;
                  font-weight: bold;
                  color: #555;
                }
                .message {
                  margin-top: 15px;
                  font-size: 16px;
                  line-height: 1.5;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">Christian Matrimony - OTP Verification</div>
                <div class="message">
                  <p>Hello,</p>
                  <p>Your OTP for Christian Matrimony is: <strong>${otp}</strong>.</p>
                  <p>This OTP is valid for 10 minutes.</p>
                  <p>Best regards,<br>Christian Matrimony Team</p>
                </div>
              </div>
            </body>
          </html>
        `,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.json({ message: 'OTP sent successfully' });
        }
      });
    });
  });
});

// API 4: Validate Email OTP
router.post('/validate/email/:userId', (req, res) => {
  const userId = req.params.userId;
  const { otp } = req.body;

  // Validate OTP
  db.query('SELECT EmailOTP, EmailOTPExpiration FROM OTP WHERE UserID = ?', [userId], (err, results) => {
    if (err) throw err;

    const emailOTP = results[0].EmailOTP;
    const expirationTime = new Date(results[0].EmailOTPExpiration).getTime();
    const currentTime = new Date().getTime();

    if (currentTime > expirationTime) {
      res.status(401).json({ error: 'OTP has expired' });
    } else if (emailOTP === otp) {
      res.json({ message: 'OTP verified successfully' });
    } else {
      res.status(401).json({ error: 'Invalid OTP' });
    }
  });
});

module.exports = router;
