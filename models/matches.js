// models/matches.js

const db = require('../config/db');

// Function to get the count of matches for a user
async function getMatchCount(userId) {
  try {
    // Execute a query to get the count of matches
    const [results] = await pool.execute(
      'SELECT COUNT(*) AS matchCount FROM Matches WHERE UserID = ? OR MatchedUserID = ?',
      [userId, userId]
    );

    return results[0].matchCount;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getMatchCount,
};
