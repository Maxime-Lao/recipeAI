import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { Stack, Typography, CircularProgress, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';

const Recette = () => {
    const { recipe } = useParams();
    const [recette, setRecette] = useState({});
    const [recommendations, setRecommendations] = useState([]);
    const [sideSuggestions, setSideSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3004/recette/${recipe}`);
                const data = await response.json();
                setRecette(data.output);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
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
            }
        };

        fetchRecommendationsData();
    }, [recipe]);

    const fetchSideSuggestionsData = async () => {
        try {
            const response = await fetch(`http://localhost:3004/side-suggestions/${recipe}`);
            const data = await response.json();
            setSideSuggestions(data);
            setIsClicked(true);
            console.log(data);
        } catch (error) {
            console.error('Error fetching side suggestions data:', error);
        }
    };

    useEffect(() => {
   
    }, [sideSuggestions]);

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

                    <Button
                        type="button" // "submit" changed to "button"
                        variant="contained"
                        sx={{ alignSelf: "center" }}
                        onClick={fetchSideSuggestionsData}
                    >
                        Proposition d’accompagnement
                    </Button>

                    {isClicked && (
                        <>
                            <List sx={{ maxHeight: '40vh', overflow: 'auto' }}> {/* Added overflow style */}
                                {sideSuggestions.output.map((recipe, index) => (
                                    <ListItem key={index}>
                                        <ListItemButton>
                                            <ListItemText primary={recipe} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </>
                    )}
                </>
            )}

            <Typography variant="h4" gutterBottom>
                Recommandations pour : {recipe}
            </Typography>

            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <List sx={{ maxHeight: '40vh', overflow: 'auto' }}> {/* Added overflow style */}
                        {recommendations.map((recipe, index) => (
                            <ListItem key={index} component={Link} to={`/recette/${recipe}`}>
                                <ListItemButton>
                                    <ListItemText primary={recipe} secondary="Cliquez pour en savoir plus" />
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
