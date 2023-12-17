const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');

router.post('/', recipeController.createRecipe);
router.get('/', recipeController.getAllRecipes);
router.get('/:recipeId', recipeController.getRecipeById);
router.get('/name/:recipeName', recipeController.getRecipeByName);
router.put('/:recipeId', recipeController.updateRecipe);
router.delete('/:recipeId', recipeController.deleteRecipe);

module.exports = router;
