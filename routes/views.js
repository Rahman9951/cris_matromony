// routes/views.js

const express = require('express');
const router = express.Router();
const Views = require('../models/views');

// Endpoint to get the count of views for a user
router.get('/views/count/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const viewCount = await Views.getCountByUserId(userId);
    res.json({ viewCount });
  } catch (error) {
    console.error('Error fetching view count:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
