const preferencesModel = require('../models/preferencesModel');

class PreferencesService {
  static async createPreferences(req, res) {
    try {
      const preferencesData = req.body;
      const result = await preferencesModel.createPreferences(preferencesData);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating preferences:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getPreferencesByUserID(req, res) {
    try {
      const userID = req.params.userID;
      const preferences = await preferencesModel.getPreferencesByUserID(userID);
      res.status(200).json(preferences);
    } catch (error) {
      console.error('Error fetching preferences:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updatePreferences(req, res) {
    try {
      const userID = req.params.userID;
      const preferencesData = req.body;
      const result = await preferencesModel.updatePreferences(userID, preferencesData);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error updating preferences:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deletePreferences(req, res) {
    try {
      const userID = req.params.userID;
      const result = await preferencesModel.deletePreferences(userID);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error deleting preferences:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = PreferencesService;
