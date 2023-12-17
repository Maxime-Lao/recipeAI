const FavoriteRecipe = require('../models/favoriteRecipe.model');

const addFavoriteRecipe = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    const existingFavorite = await FavoriteRecipe.findOne({
      where: {
        userId: userId,
        recipeId: recipeId,
      },
    });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Cette recette est déjà dans les favoris de l\'utilisateur.' });
    }

    const newFavorite = await FavoriteRecipe.create({
      userId: userId,
      recipeId: recipeId,
    });

    res.status(201).json({ message: 'Recette ajoutée aux favoris avec succès.', favoriteRecipe: newFavorite });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFavoriteRecipe = async (req, res) => {
  const { userId, recipeId } = req.params;

  try {
    const favoriteToDelete = await FavoriteRecipe.findOne({
      where: {
        userId: userId,
        recipeId: recipeId,
      },
    });

    if (!favoriteToDelete) {
      return res.status(404).json({ message: 'Cette recette n\'est pas dans les favoris de l\'utilisateur.' });
    }

    await favoriteToDelete.destroy();

    res.status(200).json({ message: 'Recette retirée des favoris avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserFavoriteRecipes = async (req, res) => {
  const { userId } = req.params;

  try {
    const userFavorites = await FavoriteRecipe.findAll({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({ favoriteRecipes: userFavorites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addFavoriteRecipe,
  removeFavoriteRecipe,
  getUserFavoriteRecipes,
};
