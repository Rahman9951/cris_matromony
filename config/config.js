const twilioAccountSid = 'AC3be071c3431875fbd49a120fc66844d6';
const twilioAuthToken = '507f49a7b6b7676aef81d147ed534c4f';
const nodemailerConfig = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'your_email@gmail.com',  // Replace with your Gmail address
    pass: 'your_email_password'    // Replace with your Gmail password
  },
};

module.exports = { twilioAccountSid, twilioAuthToken, nodemailerConfig };
