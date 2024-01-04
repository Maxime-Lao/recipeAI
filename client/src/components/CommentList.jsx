import React, { useState } from 'react';
import { Button, Container, Box } from '@mui/material';

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
                    <Box key={comment.id}>
                        <p>{comment.comment}</p>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}

export default CommentList;


