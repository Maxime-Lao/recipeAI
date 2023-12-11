const Preference = require('../models/preference.model');

// Créer une nouvelle préférence pour un utilisateur
const createPreference = async (req, res) => {
  try {
    const { userId, preferences } = req.body;

    // Créer une nouvelle entrée de préférence pour l'utilisateur
    const newPreference = await Preference.create({ UserId: userId, preferences });

    res.status(201).json({ message: 'Préférence créée avec succès.', preference: newPreference });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir les préférences d'un utilisateur spécifique
const getUserPreferences = async (req, res) => {
  try {
    const { userId } = req.params;

    // Rechercher les préférences de l'utilisateur par son ID
    const userPreferences = await Preference.findOne({ where: { UserId: userId } });

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
  getUserPreferences,
  // Autres fonctions de contrôleur pour la gestion des préférences
};