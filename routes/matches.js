// routes/matches.js

const express = require('express');
const router = express.Router();
const matchesService = require('../services/matches');

// Endpoint to get the count of matches for a user
router.get('/count/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Call the service to get the match count
    const matchCount = await matchesService.getMatchCount(userId);

    // Send the count as JSON response
    res.json({ matchCount });
  } catch (error) {
    console.error('Error fetching match count:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
