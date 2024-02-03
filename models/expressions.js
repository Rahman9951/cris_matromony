// models/expressions.js

const db = require('../config/db');

const Expressions = {
  // Function to get the count of expressions for a user
  getCountByUserId: async (userId) => {
    const [results] = await pool.execute('SELECT COUNT(*) AS expressionCount FROM Expressions WHERE UserID = ?', [userId]);
    return results[0].expressionCount;
  },

  // Function to insert an expression record
  insertExpression: async (userId, expresserUserId) => {
    await pool.execute('INSERT INTO Expressions (UserID, ExpresserUserID) VALUES (?, ?)', [userId, expresserUserId]);
  },
};

module.exports = Expressions;
