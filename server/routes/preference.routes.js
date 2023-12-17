const express = require('express');
const router = express.Router();
const PreferenceController = require('../controllers/preference.controller');

router.post('/', PreferenceController.createPreference);
router.put('/:userId', PreferenceController.updatePreferences);
router.get('/:userId', PreferenceController.getUserPreferences);

module.exports = router;