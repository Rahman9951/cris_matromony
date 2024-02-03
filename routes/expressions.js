// routes/expressions.js

const express = require('express');
const router = express.Router();
const Expressions = require('../models/expressions');

// Endpoint to get the count of expressions for a user
router.get('/expressions/count/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const expressionCount = await Expressions.getCountByUserId(userId);
    res.json({ expressionCount });
  } catch (error) {
    console.error('Error fetching expression count:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to express interest in a user's profile
router.post('/expressions/express/:userId/:expresserUserId', async (req, res) => {
  const userId = req.params.userId;
  const expresserUserId = req.params.expresserUserId;

  try {
    // Insert the expression record
    await Expressions.insertExpression(userId, expresserUserId);

    // Get the updated expression count
    const expressionCount = await Expressions.getCountByUserId(userId);

    // Send the updated count as JSON response
    res.json({ expressionCount });
  } catch (error) {
    console.error('Error expressing interest:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
