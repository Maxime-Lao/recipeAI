import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Stack, Typography, CircularProgress } from '@mui/material';

const Recette = () => {
    const { recipe } = useParams();
    const [recette, setRecette] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/recette/${recipe}`);
                const data = await response.json();
                setRecette(data.output);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [recipe]); // Le tableau de dépendances assure que la requête est effectuée uniquement lorsque recipe change

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
        </Stack>
      );
};

export default Recette;
