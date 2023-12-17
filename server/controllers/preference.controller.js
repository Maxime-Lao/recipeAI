const Preference = require('../models/preference.model');

const createPreference = async (req, res) => {
  try {
    const { userId, preferences } = req.body;

    const newPreference = await Preference.create({ preferences, userId: userId });

    res.status(201).json({ message: 'Préférence créée avec succès.', preference: newPreference });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePreferences = async (req, res) => {
  try {
    const { userId } = req.params;
    const { preferences } = req.body;

    const existingPreference = await Preference.findOne({ where: { userId } });

    if (!existingPreference) {
      return res.status(404).json({ message: 'Aucune préférence trouvée pour cet utilisateur.' });
    }

    existingPreference.preferences = preferences;
    await existingPreference.save();

    res.status(200).json({ message: 'Préférences mises à jour avec succès.', preferences: existingPreference.preferences });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserPreferences = async (req, res) => {
  try {
    const { userId } = req.params;

    const userPreferences = await Preference.findOne({ where: { userId: userId } });

    if (!userPreferences) {
      return res.status(404).json({ message: 'Aucune préférence trouvée pour cet utilisateur.' });
    }

    res.status(200).json({ preferences: userPreferences.preferences });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPreference,
  updatePreferences,
  getUserPreferences,
};