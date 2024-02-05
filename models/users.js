// models/users.js
const db = require('../config/db');

const Users = {
  authenticateUser: async (matrimonyIdOrMobileOrEmail, password) => {
    try {
      // Your SQL query and execution here using db.query
      // Example:
      const query = 'SELECT * FROM User WHERE (MobileNumber = ? OR Email = ?) AND LoginPassword = ?';
      const queryParams = [matrimonyIdOrMobileOrEmail, matrimonyIdOrMobileOrEmail, password];

      const results = await new Promise((resolve, reject) => {
        db.query(query, queryParams, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      return results[0];
    } catch (error) {
      console.error('Error during user authentication:', error.message);
      throw error;
    }
  },
};

module.exports = Users;
