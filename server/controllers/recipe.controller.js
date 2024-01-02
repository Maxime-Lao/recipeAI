const Recipe = require('../models/recipe.model');

const createRecipe = async (req, res) => {
  const { name, duration, ingredients, instructions, servings } = req.body;

  try {
    const newRecipe = await Recipe.create({
      name: name,
      duration: duration,
      ingredients: ingredients,
      instructions: instructions,
      servings: servings,
    });

    res.status(201).json({ message: 'Recette créée avec succès.', recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();

    res.status(200).json({ recipes: recipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findByPk(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recette non trouvée.' });
    }

    res.status(200).json({ recipe: recipe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipeByName = async (req, res) => {
  const { recipeName } = req.params;

  try {
    const recipe = await Recipe.findOne({
      where: { name: recipeName }
    });

    if (!recipe) {
      return res.status(404).json({ message: 'Recette non trouvée.' });
    }

    res.status(200).json({ recipe: recipe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const { name, duration, ingredients, instructions, servings } = req.body;

  try {
    const recipeToUpdate = await Recipe.findByPk(recipeId);

    if (!recipeToUpdate) {
      return res.status(404).json({ message: 'Recette non trouvée.' });
    }

    await recipeToUpdate.update({
      name: name,
      duration: duration,
      ingredients: ingredients,
      instructions: instructions,
      servings: servings,
    });

    res.status(200).json({ message: 'Recette mise à jour avec succès.', recipe: recipeToUpdate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipeToDelete = await Recipe.findByPk(recipeId);

    if (!recipeToDelete) {
      return res.status(404).json({ message: 'Recette non trouvée.' });
    }

    await recipeToDelete.destroy();

    res.status(200).json({ message: 'Recette supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipeByName,
  updateRecipe,
  deleteRecipe,
};
