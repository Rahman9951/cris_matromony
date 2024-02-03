// models/shortlists.js

const db = require('../config/db');

const Shortlists = {
  // Function to get the count of shortlists for a user
  getCountByUserId: async (userId) => {
    const [results] = await pool.execute('SELECT COUNT(*) AS shortlistCount FROM Shortlists WHERE UserID = ?', [userId]);
    return results[0].shortlistCount;
  },
};

module.exports = Shortlists;
