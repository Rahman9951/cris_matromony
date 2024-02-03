// controllers/matchesController.js

const mysql = require('mysql2/promise');


// Function to get the count of matches for a user
const getMatchCount = async (userId) => {
  try {
    // Create a MySQL connection pool
    const pool = await mysql.createPool(dbConfig);

    // Execute a query to get the count of matches
    const [results] = await pool.execute(
      'SELECT COUNT(*) AS matchCount FROM Matches WHERE UserID = ? OR MatchedUserID = ?',
      [userId, userId]
    );

    return results[0].matchCount;
  } catch (error) {
    console.error('Error fetching match count:', error.message);
    throw error;
  }
};

module.exports = {
  getMatchCount,
};
