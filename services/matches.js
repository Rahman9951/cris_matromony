// services/matches.js

const matchesModel = require('../models/matches');

// Function to get the count of matches for a user
async function getMatchCount(userId) {
  try {
    // Call the model to get the match count
    const matchCount = await matchesModel.getMatchCount(userId);

    return matchCount;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getMatchCount,
};
