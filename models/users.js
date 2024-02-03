// models/users.js

const db = require('../config/db');

const Users = {
  // Function to authenticate a user by Matrimony ID, Mobile No, or Email ID and Password
  authenticateUser: async (matrimonyIdOrMobileOrEmail, password) => {
    const [results] = await pool.execute(
      'SELECT * FROM User WHERE (MobileNumber = ? OR Email = ?) AND LoginPassword = ?',
      [matrimonyIdOrMobileOrEmail, matrimonyIdOrMobileOrEmail, matrimonyIdOrMobileOrEmail, password]
    );

    return results[0];
  },
};

module.exports = Users;
