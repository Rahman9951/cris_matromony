const OTPModel = require('../models/otp.model');
const { twilioClient, transporter } = require('../config/config');

class OTPService {
  static async generateMobileOTP(req, res) {
    try {
      const { userId } = req.params;

      const mobileNumber = await OTPModel.getUserMobileNumber(userId);
      const otp = Math.floor(100000 + Math.random() * 900000);

      await OTPModel.generateOTP(userId, 'MobileOTP', otp);

      await twilioClient.messages.create({
        to: mobileNumber,
        from: '+16312505599',
        body: `Your OTP is: ${otp}`,
      });

      res.send('OTP sent successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async validateMobileOTP(req, res) {
    try {
      const { userId } = req.params;
      const { otp } = req.body;

      const isValidOTP = await OTPModel.validateOTP(userId, 'MobileOTP', otp);

      if (isValidOTP) {
        res.send('OTP verified successfully');
      } else {
        res.status(401).send('Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async generateEmailOTP(req, res) {
    try {
      const { userId } = req.params;

      const email = await OTPModel.getUserEmail(userId);
      const otp = Math.floor(100000 + Math.random() * 900000);

      await OTPModel.generateOTP(userId, 'EmailOTP', otp);

      const mailOptions = {
        from: 'your_email',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`,
      };

      await transporter.sendMail(mailOptions);

      res.send('OTP sent successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async validateEmailOTP(req, res) {
    try {
      const { userId } = req.params;
      const { otp } = req.body;

      const isValidOTP = await OTPModel.validateOTP(userId, 'EmailOTP', otp);

      if (isValidOTP) {
        res.send('OTP verified successfully');
      } else {
        res.status(401).send('Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = OTPService;
