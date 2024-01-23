// otpRoutes.js
const express = require('express');
const otpController = require('../controllers/otpController');
const router = express.Router();

// Endpoint to generate OTP via email
router.post('/generate-email-otp', otpController.generateEmailOTP);

// Endpoint to generate OTP via mobile
router.post('/generate-mobile-otp', otpController.generateMobileOTP);

// Endpoint to verify OTP
router.post('/verify-otp', otpController.verifyOTP);

module.exports = router;
