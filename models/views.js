// models/views.js

const db = require('../config/db');

const Views = {
  // Function to get the count of views for a user
  getCountByUserId: async (userId) => {
    const [results] = await pool.execute('SELECT COUNT(*) AS viewCount FROM Views WHERE UserID = ?', [userId]);
    return results[0].viewCount;
  },
};

module.exports = Views;
