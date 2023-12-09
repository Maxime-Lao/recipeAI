import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Stack, Typography, CircularProgress, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Recette = () => {
    const { recipe } = useParams();
    const [recette, setRecette] = useState({});
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3004/recette/${recipe}`);
                const data = await response.json();
                setRecette(data.output);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [recipe]);

    useEffect(() => {
      const fetchRecommendationsData = async () => {
          try {
            const response = await fetch(`http://localhost:3004/recommendations/${recipe}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            });
              const data = await response.json();
              setRecommendations(data.output);
          } catch (error) {
              console.error('Error:', error);
          } finally {
              setIsLoading(false);
          }
      };

      fetchRecommendationsData();
    }, [recipe]);

    return (
        <Stack spacing={3}>
          <Typography variant="h4" gutterBottom>
            Recette : {recipe}
          </Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography variant="body1" paragraph>
                Temps de préparation : {recette.duration}
              </Typography>
              <Typography variant="body1" paragraph>
                Ingrédients : {recette.ingredients}
              </Typography>
              <Typography variant="body1" paragraph>
                Instructions : {recette.instructions}
              </Typography>
              <Typography variant="body1" paragraph>
                Nombre de portions : {recette.servings}
              </Typography>
            </>
          )}

          <Typography variant="h4" gutterBottom>
            Recommandations pour : {recipe}
          </Typography>
          
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <List sx={{ maxHeight: '40vh' }}>
                {recommendations.map((recipe) => (
                        <ListItem
                      key={recipe}
                      component={Link}
                      to={`/recette/${recipe}`}
                  >
                      <ListItemButton>
                      <ListItemText
                          primary={recipe}
                          secondary="Cliquez pour en savoir plus" />
                      </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Stack>
      );
};

export default Recette;
