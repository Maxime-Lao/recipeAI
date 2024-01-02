import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { Stack, Typography, CircularProgress, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';
import { FaWhatsapp , FaTwitter, FaCopy, FaEnvelope } from 'react-icons/fa'; // Import des icônes
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

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

    const shareOnWhatsapp = () => {
        const text = `Voici la liste d'ingrédients : ${recette.ingredients}`; // Texte à partager sur WhatsApp
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`; // URL de partage WhatsApp

        window.open(url, '_blank');
    };

    const shareOnTwitter = () => {
        const shareUrl = `https://twitter.com/intent/tweet?text=Regardez%20ma%20liste%20de%20course%20pour%20la%20recette%20${recipe}:%20${recette.ingredients}`;
        window.open(shareUrl, '_blank');
    };

    const copyToClipboard = () => {
        const recipeLink = recette.ingredients;
        navigator.clipboard.writeText(recipeLink)
            .then(() => alert('Recette copiée dans le presse-papier'))
            .catch(err => console.error('Erreur lors de la copie : ', err));
    };

    // Fonction pour envoyer par email
    const sendByEmail = () => {
        const recipeLink = recette.ingredients;
        window.location.href = `mailto:?subject=Liste de course&body=Voici la liste de course pour cette recette : ${recipeLink}`;
    };

    return (
        <Stack spacing={3}>
            <Typography variant="h4" gutterBottom>
                Recette : {recipe}
            </Typography>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            startIcon={<FaWhatsapp />}
                            onClick={shareOnWhatsapp}
                        >
                            WhatsApp
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<FaTwitter />}
                            onClick={shareOnTwitter}
                        >
                            Twitter
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<FaCopy />}
                            onClick={copyToClipboard}
                        >
                            Copier
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<FaEnvelope />}
                            onClick={sendByEmail}
                        >
                            Email
                        </Button>
                    </Stack>
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

                    <CommentForm recipe={recette.id} />
                    <CommentList recipe={recette.id} />


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
