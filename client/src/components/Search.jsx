import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemButton, ListItemText, TextField, Button, Stack, CircularProgress } from '@mui/material';

import { Link } from 'react-router-dom';

const App = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem('userId');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch('http://' + process.env.REACT_APP_PATH_API + '/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search, userId }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setRecipes(data.output);
      console.log(data.output);
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <Stack spacing={3}>
        <Typography variant="h4" align="center">
            Rechercher une recette
        </Typography>
        <Stack
        component="form"
        spacing={1}
        onSubmit={handleSearch}
        noValidate
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 1 }}
        >
            <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Donne moi une recette sans gluten..."
                sx={{ width: '45%' }} />
            <Button
                type="submit"
                variant="contained"
                sx={{ alignSelf: "center" }}>
                Rechercher
            </Button>
        </Stack>
    
        {isLoading ? (
            <CircularProgress />
        ) : 
        <List sx={{ maxHeight: '40vh' }}>
        {recipes.map((recipe) => (
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
        }
    </Stack>
  );
};

export default App;

