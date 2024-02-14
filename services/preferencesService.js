// services/preferencesService.js
const Preferences = require('../models/preferencesModel');

class PreferencesService {
  static createPreferences(req, res) {
    const userId = req.params.userId;
    const preferencesData = req.body;
    preferencesData.UserID = userId;

    Preferences.createPreferences(preferencesData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Preferences created successfully' });
      }
    });
  }

  static getPreferencesById(req, res) {
    const userId = req.params.userId;

    Preferences.getPreferencesById(userId, (err, preferences) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        if (!preferences) {
          res.status(404).json({ message: 'Preferences not found' });
        } else {
          res.status(200).json(preferences);
        }
      }
    });
  }

  static updatePartnerPreferences(req, res) {
    const userId = req.params.userId;
    const partnerPreferences = req.body;

    Preferences.getPreferencesById(userId, (err, preferences) => {
        if (err) {
            console.error('Error fetching preferences:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            if (!preferences) {
                res.status(404).json({ message: 'Preferences not found' });
            } else {
                const updatedPreferences = { ...preferences, ...partnerPreferences };
                Preferences.updatePreferences(userId, updatedPreferences, (err, results) => {
                    if (err) {
                        console.error('Error updating partner preferences:', err);
                        res.status(500).json({ message: 'Internal Server Error' });
                    } else {
                        console.log('Partner preferences updated successfully');
                        res.status(200).json({ message: 'Partner preferences updated successfully' });
                    }
                });
            }
        }
    });
}


static updateBasicPreferences(req, res) {
  const userId = req.params.userId;
  const basicPreferences = req.body;

  Preferences.getPreferencesById(userId, (err, preferences) => {
      if (err) {
          console.error('Error fetching preferences:', err);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          if (!preferences) {
              res.status(404).json({ message: 'Preferences not found' });
          } else {
              const updatedPreferences = { ...preferences, ...basicPreferences };
              Preferences.updatePreferences(userId, updatedPreferences, (err, results) => {
                  if (err) {
                      console.error('Error updating basic preferences:', err);
                      res.status(500).json({ message: 'Internal Server Error' });
                  } else {
                      console.log('Basic preferences updated successfully');
                      res.status(200).json({ message: 'Basic preferences updated successfully' });
                  }
              });
          }
      }
  });
}

static updateCastePreferences(req, res) {
  const userId = req.params.userId;
  const castePreferences = req.body;

  Preferences.getPreferencesById(userId, (err, preferences) => {
      if (err) {
          console.error('Error fetching preferences:', err);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          if (!preferences) {
              res.status(404).json({ message: 'Preferences not found' });
          } else {
              const updatedPreferences = { ...preferences, ...castePreferences };
              Preferences.updatePreferences(userId, updatedPreferences, (err, results) => {
                  if (err) {
                      console.error('Error updating caste preferences:', err);
                      res.status(500).json({ message: 'Internal Server Error' });
                  } else {
                      console.log('Caste preferences updated successfully');
                      res.status(200).json({ message: 'Caste preferences updated successfully' });
                  }
              });
          }
      }
  });
}


static updateEducationalPreferences(req, res) {
  const userId = req.params.userId;
  const educationalPreferences = req.body;

  Preferences.getPreferencesById(userId, (err, preferences) => {
      if (err) {
          console.error('Error fetching preferences:', err);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          if (!preferences) {
              res.status(404).json({ message: 'Preferences not found' });
          } else {
              const updatedPreferences = { ...preferences, ...educationalPreferences };
              Preferences.updatePreferences(userId, updatedPreferences, (err, results) => {
                  if (err) {
                      console.error('Error updating educational preferences:', err);
                      res.status(500).json({ message: 'Internal Server Error' });
                  } else {
                      console.log('Educational preferences updated successfully');
                      res.status(200).json({ message: 'Educational preferences updated successfully' });
                  }
              });
          }
      }
  });
}


static updateEmploymentPreferences(req, res) {
  const userId = req.params.userId;
  const employmentPreferences = req.body;

  Preferences.getPreferencesById(userId, (err, preferences) => {
      if (err) {
          console.error('Error fetching preferences:', err);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          if (!preferences) {
              res.status(404).json({ message: 'Preferences not found' });
          } else {
              const updatedPreferences = { ...preferences, ...employmentPreferences };
              Preferences.updatePreferences(userId, updatedPreferences, (err, results) => {
                  if (err) {
                      console.error('Error updating employment preferences:', err);
                      res.status(500).json({ message: 'Internal Server Error' });
                  } else {
                      console.log('Employment preferences updated successfully');
                      res.status(200).json({ message: 'Employment preferences updated successfully' });
                  }
              });
          }
      }
  });
}


static updateLocationPreferences(req, res) {
  const userId = req.params.userId;
  const locationPreferences = req.body;

  Preferences.getPreferencesById(userId, (err, preferences) => {
      if (err) {
          console.error('Error fetching preferences:', err);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          if (!preferences) {
              res.status(404).json({ message: 'Preferences not found' });
          } else {
              const updatedPreferences = { ...preferences, ...locationPreferences };
              Preferences.updatePreferences(userId, updatedPreferences, (err, results) => {
                  if (err) {
                      console.error('Error updating location preferences:', err);
                      res.status(500).json({ message: 'Internal Server Error' });
                  } else {
                      console.log('Location preferences updated successfully');
                      res.status(200).json({ message: 'Location preferences updated successfully' });
                  }
              });
          }
      }
  });
}


static deletePreferences(req, res) {
  const userId = req.params.userId;

  Preferences.deletePreferences(userId, (err, results) => {
      if (err) {
          console.error('Error deleting preferences:', err);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          console.log('Preferences deleted successfully');
          res.status(200).json({ message: 'Preferences deleted successfully' });
      }
  });
}

}

module.exports = PreferencesService;
