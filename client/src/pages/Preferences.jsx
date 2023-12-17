import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const PreferencesComponent = () => {
  const [preference, setPreference] = useState('');
  const [userPreferences, setUserPreferences] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchUserPreferences();
  }, []);

  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(`http://localhost:3004/api/preferences/${userId}`);
      const data = await response.json();
      setUserPreferences(data.preferences || []);
    } catch (error) {
      console.error('Erreur pour afficher les préférences:', error);
    }
  };

  const handleAddPreference = () => {
    setUserPreferences([...userPreferences, preference]);
    setPreference('');
  };

  const handleRemovePreference = async (indexToRemove) => {
    const updatedPreferences = userPreferences.filter((_, index) => index !== indexToRemove);
    setUserPreferences(updatedPreferences);

    try {
      const response = await fetch(`http://localhost:3004/api/preferences/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences: updatedPreferences,
          userId: userId,
        }),
      });

      if (response.ok) {
        console.log('Préférence supprimée avec succès');
      } else {
        console.error('Échec de la suppression de la préférence', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la préférence:', error);
    }
  };

  const handleSavePreferences = async () => {
    try {
      const response = await fetch(`http://localhost:3004/api/preferences/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences: userPreferences,
          userId: userId,
        }),
      });

      if (response.ok) {
        console.log('Sauvegarde des préférences réussie');
      } else {
        console.error('Sauvegarde ratée', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences:', error);
    }
  };

  return (
    <Container>
      <div>
        <TextField
          label="Preference"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" onClick={handleAddPreference}>
          Ajouter une préférence
        </Button>
      </div>
      <div>
        {userPreferences.map((pref, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <p>{pref}</p>
            <IconButton onClick={() => handleRemovePreference(index)} aria-label="Supprimer">
              <ClearIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <Button variant="contained" onClick={handleSavePreferences}>
        Valider
      </Button>
    </Container>
  );
};

export default PreferencesComponent;
