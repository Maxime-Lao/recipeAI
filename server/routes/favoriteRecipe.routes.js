const express = require('express');
const router = express.Router();
const favoriteRecipeController = require('../controllers/favoriteRecipe.controller');

router.post('/', favoriteRecipeController.addFavoriteRecipe);
router.delete('/remove/:userId/:recipeId', favoriteRecipeController.removeFavoriteRecipe);
router.get('/:userId', favoriteRecipeController.getUserFavoriteRecipes);

module.exports = router;
