import React, { useState } from 'react';
import { Button, Container, Box, Rating, Typography } from '@mui/material';

const CommentList = ( recipe ) => {
    const fetchCommentsData = async () => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_PATH_API}/api/comments/${recipe.recipe}`);
            const data = await response.json();
            setComments(data.comments);
            console.log(data);
        } catch (error) {
            console.error('Error fetching comments data:', error);
        }
    }

    const [comments, setComments] = useState([]);

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Button fullWidth variant="contained" type="submit" onClick={fetchCommentsData}>
                    Voir les commentaires
                </Button>
                {comments.map((comment) => (
                    <Container key={comment.id} sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Rating
                                name="rating"
                                value={comment.rating}
                                readOnly
                            />
                            <Typography variant="body2" gutterBottom>
                                de {comment.User.login}, le {comment.createdAt.slice(0, 10)}
                            </Typography>
                        </Box>
                        <Typography variant="body1" gutterBottom>
                            {comment.comment}
                        </Typography>
                    </Container>
                ))}
            </Box>
        </Container>
    );
}

export default CommentList;


