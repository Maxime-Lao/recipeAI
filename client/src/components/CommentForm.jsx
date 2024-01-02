import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Rating } from '@mui/material';

const CommentForm = ( recipe ) => {
    const [formData, setFormData] = useState({
        comment: '',
        rating: 3,
        author: localStorage.getItem('userId'),
        recette_id: recipe.recipe,
    });

    const handleChange = (e) => {
        console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addComment = async (e) => {
        e.preventDefault();

        // Insérer le commentaire dans la table Comment avec l'id de la recette
        const commentRes = await fetch('http://localhost:3004/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (commentRes.status !== 200) {
            console.error('Error inserting comment');
            return;
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Commentaire
                </Typography>
                <Rating
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                />
                <form onSubmit={addComment}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                    />
                    <Button fullWidth variant="contained" type="submit">
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default CommentForm;

