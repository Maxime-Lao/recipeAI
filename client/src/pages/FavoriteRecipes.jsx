import React, { useState, useEffect } from 'react';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:3004/api/favorite-recipes/${userId}`);
        const { favoriteRecipes } = await response.json();

        if (favoriteRecipes.length === 0) {
          setIsLoading(false);
          return;
        }

        const recipesData = await Promise.all(
          favoriteRecipes.map(async (favRecipe) => {
            const recipeId = favRecipe.recipeId;
            const recipeResponse = await fetch(`http://localhost:3004/api/recipes/${recipeId}`);
            const recipeData = await recipeResponse.json();
            return recipeData;
          })
        );

        setFavoriteRecipes(recipesData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      }
    };

    fetchFavoriteRecipes();
  }, []);

  const handleRemoveFavorite = async (recipeIdToRemove) => {
    try {
      const userId = localStorage.getItem('userId');
      await fetch(`http://localhost:3004/api/favorite-recipes/remove/${userId}/${recipeIdToRemove}`, {
        method: 'DELETE',
      });

      const updatedFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.recipe.id !== recipeIdToRemove);
      setFavoriteRecipes(updatedFavoriteRecipes);
    } catch (error) {
      console.error('Error removing favorite recipe:', error);
    }
  };

  return (
    <div>
      <h2>Recettes favorites</h2>
      {isLoading ? (
        <p>Chargement...</p>
      ) : favoriteRecipes.length === 0 ? (
        <p>Aucune recette favorite pour le moment.</p>
      ) : (
        <ul>
          {favoriteRecipes.map((recipe, index) => (
            <li key={index}>
              <h3>{recipe.recipe.name}</h3>
              <p>Temps de préparation : {recipe.recipe.duration}</p>
              <p>Ingrédients : {recipe.recipe.ingredients}</p>
              <p>Instructions : {recipe.recipe.instructions}</p>
              <p>Nombre de portions : {recipe.recipe.servings}</p>
              <button onClick={() => handleRemoveFavorite(recipe.recipe.id)}>Supprimer</button>
              {/* Ajoutez d'autres détails de la recette si nécessaire */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteRecipes;
