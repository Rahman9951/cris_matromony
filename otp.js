// otp.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const twilio = require('twilio');
const nodemailer = require('nodemailer');

const router = express.Router();

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mat_db',
});

connection.connect();

// Twilio Configuration
const twilioAccountSid = 'AC3be071c3431875fbd49a120fc66844d6';
const twilioAuthToken = '507f49a7b6b7676aef81d147ed534c4f';
const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'muteeurrahmans8@gmail.com',
    pass: 'qdzu wmes uogp igrh',
  },
});

// Middleware
router.use(bodyParser.json());

// API 1: Generate and Send OTP for Mobile
router.get('/generate/mobile/:userId', (req, res) => {
  const userId = req.params.userId;

  // Retrieve mobile number from User table
  connection.query('SELECT MobileNumber FROM User WHERE UserID = ?', [userId], (err, results) => {
    if (err) throw err;

    const mobileNumber = results[0].MobileNumber;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Update OTP in OTP table
    connection.query('INSERT INTO OTP (UserID, MobileOTP, MobileOTPExpiration) VALUES (?, ?, NOW() + INTERVAL 5 MINUTE) ON DUPLICATE KEY UPDATE MobileOTP = VALUES(MobileOTP), MobileOTPExpiration = VALUES(MobileOTPExpiration)', [userId, otp], (err) => {
      if (err) throw err;

      // Send OTP using Twilio
      twilioClient.messages.create({
        to: mobileNumber,
        from: '+16312505599',
        body: `Your OTP is: ${otp}`,
      })
      .then(() => res.send('OTP sent successfully'))
      .catch((err) => res.status(500).send(err));
    });
  });
});

// API 2: Validate Mobile OTP
router.post('/validate/mobile/:userId', (req, res) => {
  const userId = req.params.userId;
  const { otp } = req.body;

  // Validate OTP
  connection.query('SELECT MobileOTP, MobileOTPExpiration FROM OTP WHERE UserID = ?', [userId], (err, results) => {
    if (err) throw err;

    const mobileOTP = results[0].MobileOTP;
    const expirationTime = new Date(results[0].MobileOTPExpiration).getTime();
    const currentTime = new Date().getTime();

    if (mobileOTP === otp && expirationTime > currentTime) {
      res.send('OTP verified successfully');
    } else {
      res.status(401).send('Invalid OTP');
    }
  });
});

// API 3: Generate and Send OTP for Email
router.get('/generate/email/:userId', (req, res) => {
  const userId = req.params.userId;

  // Retrieve email from User table
  connection.query('SELECT Email FROM User WHERE UserID = ?', [userId], (err, results) => {
    if (err) throw err;

    const email = results[0].Email;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Update OTP in OTP table
    connection.query('INSERT INTO OTP (UserID, EmailOTP, EmailOTPExpiration) VALUES (?, ?, NOW() + INTERVAL 5 MINUTE) ON DUPLICATE KEY UPDATE EmailOTP = VALUES(EmailOTP), EmailOTPExpiration = VALUES(EmailOTPExpiration)', [userId, otp], (err) => {
      if (err) throw err;

      // Send OTP using Nodemailer
      const mailOptions = {
        from: 'your_email',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send('OTP sent successfully');
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
  connection.query('SELECT EmailOTP, EmailOTPExpiration FROM OTP WHERE UserID = ?', [userId], (err, results) => {
    if (err) throw err;

    const emailOTP = results[0].EmailOTP;
    const expirationTime = new Date(results[0].EmailOTPExpiration).getTime();
    const currentTime = new Date().getTime();

    if (emailOTP === otp && expirationTime > currentTime) {
      res.send('OTP verified successfully');
    } else {
      res.status(401).send('Invalid OTP');
    }
  });
});

module.exports = router;
