const express = require('express');
const router = express.Router();
const OTPService = require('../services/otp.service');

router.get('/generate/mobile/:userId', OTPService.generateMobileOTP);
router.post('/validate/mobile/:userId', OTPService.validateMobileOTP);
router.get('/generate/email/:userId', OTPService.generateEmailOTP);
router.post('/validate/email/:userId', OTPService.validateEmailOTP);

module.exports = router;
