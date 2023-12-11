const express = require('express');
const router = express.Router();
const PreferenceController = require('../controllers/preference.controller');

// Créer une nouvelle préférence pour un utilisateur
router.post('/', PreferenceController.createPreference);

// Obtenir les préférences d'un utilisateur spécifique
router.get('/:userId', PreferenceController.getUserPreferences);

module.exports = router;