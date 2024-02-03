const db = require('../config/db');

class OTPModel {
  static async getUserMobileNumber(userId) {
    // Implementation to retrieve user's mobile number from the database
    try {
      const [rows, fields] = await db.execute('SELECT MobileNumber FROM User WHERE UserID = ?', [userId]);
      return rows[0].MobileNumber;
    } catch (error) {
      console.error('Error in getUserMobileNumber:', error);
      throw error;
    }
  }

  static async getUserEmail(userId) {
    // Implementation to retrieve user's email from the database
    try {
      const [rows, fields] = await db.execute('SELECT Email FROM User WHERE UserID = ?', [userId]);
      return rows[0].Email;
    } catch (error) {
      console.error('Error in getUserEmail:', error);
      throw error;
    }
  }

  static async generateOTP(userId, otpType, otpValue) {
    // Implementation to generate and store OTP in the database
    try {
      const tableName = otpType === 'MobileOTP' ? 'MobileOTP' : 'EmailOTP';
      const expirationColumn = otpType === 'MobileOTP' ? 'MobileOTPExpiration' : 'EmailOTPExpiration';

      await db.execute(
        `INSERT INTO OTP (UserID, ${tableName}, ${expirationColumn}) VALUES (?, ?, NOW() + INTERVAL 5 MINUTE)
        ON DUPLICATE KEY UPDATE ${tableName} = VALUES(${tableName}), ${expirationColumn} = VALUES(${expirationColumn})`,
        [userId, otpValue]
      );
    } catch (error) {
      console.error('Error in generateOTP:', error);
      throw error;
    }
  }

  static async validateOTP(userId, otpType, enteredOTP) {
    // Implementation to validate the entered OTP with the stored OTP in the database
    try {
      const tableName = otpType === 'MobileOTP' ? 'MobileOTP' : 'EmailOTP';
      const expirationColumn = otpType === 'MobileOTP' ? 'MobileOTPExpiration' : 'EmailOTPExpiration';

      const [rows, fields] = await db.execute(
        `SELECT ${tableName}, ${expirationColumn} FROM OTP WHERE UserID = ?`,
        [userId]
      );

      const storedOTP = rows[0][tableName];
      const expirationTime = new Date(rows[0][expirationColumn]).getTime();
      const currentTime = new Date().getTime();

      return storedOTP === enteredOTP && expirationTime > currentTime;
    } catch (error) {
      console.error('Error in validateOTP:', error);
      throw error;
    }
  }
}

module.exports = OTPModel;
