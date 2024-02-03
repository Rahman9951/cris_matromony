// routes/shortlists.js

const express = require('express');
const router = express.Router();
const Shortlists = require('../models/shortlists');

// Endpoint to get the count of shortlists for a user
router.get('/shortlists/count/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const shortlistCount = await Shortlists.getCountByUserId(userId);
    res.json({ shortlistCount });
  } catch (error) {
    console.error('Error fetching shortlist count:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
