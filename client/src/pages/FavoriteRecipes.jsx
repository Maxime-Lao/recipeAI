import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Container, Grid } from '@mui/material';
import Navbar from "../components/Navbar";

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://${process.env.REACT_APP_PATH_API}/api/favorite-recipes/${userId}`);
        const { favoriteRecipes } = await response.json();

        if (favoriteRecipes.length === 0) {
          setIsLoading(false);
          return;
        }

        const recipesData = await Promise.all(
          favoriteRecipes.map(async (favRecipe) => {
            const recipeId = favRecipe.recipeId;
            const recipeResponse = await fetch(`http://${process.env.REACT_APP_PATH_API}/api/recipes/${recipeId}`);
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
      await fetch(`http://${process.env.REACT_APP_PATH_API}/api/favorite-recipes/remove/${userId}/${recipeIdToRemove}`, {
        method: 'DELETE',
      });

      const updatedFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.recipe.id !== recipeIdToRemove);
      setFavoriteRecipes(updatedFavoriteRecipes);
    } catch (error) {
      console.error('Error removing favorite recipe:', error);
    }
  };

  return (
    <Container>
    <Navbar />
    <div style={{ marginTop: "40px" }}>
      <h2>Recettes favorites</h2>
      {isLoading ? (
        <p>Chargement...</p>
      ) : favoriteRecipes.length === 0 ? (
        <p>Aucune recette favorite pour le moment.</p>
      ) : (
        <Grid container spacing={3}>
          {favoriteRecipes.map((recipe, index) => (
            <Grid item xs={12} key={index}>
              <Card style={{ marginBottom: '20px' }}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {recipe.recipe.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Temps de préparation :</strong> {recipe.recipe.duration}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Ingrédients :</strong> {recipe.recipe.ingredients}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Instructions :</strong> {recipe.recipe.instructions}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Nombre de portions :</strong> {recipe.recipe.servings}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleRemoveFavorite(recipe.recipe.id)}>
                    Supprimer
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  </Container>
  );
};

export default FavoriteRecipes;
