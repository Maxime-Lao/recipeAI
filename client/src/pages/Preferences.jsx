import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const PreferencesComponent = () => {
  const [preference, setPreference] = useState('');
  const [userPreferences, setUserPreferences] = useState([]);
  const [hasPreferencesInDB, setHasPreferencesInDB] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchUserPreferences();
  }, []);

  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(`http://${process.env.REACT_APP_PATH_API}/api/preferences/${userId}`);
      const data = await response.json();

      if (response.ok) {
        if (data && data.preferences && data.preferences.length > 0) {
          setUserPreferences(data.preferences);
          setHasPreferencesInDB(true);
        } else {
          console.log('Pas de préférences trouvées');
        }
      } else {
        console.error('Erreur d\'affichage des préférences de l\'utilsiateur:', data.message || response.statusText);
      }
    } catch (error) {
      console.error('Erreur d\'affichage des préférences de l\'utilsiateur:', error);
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
      const method = hasPreferencesInDB ? 'PUT' : 'POST';
      const url = hasPreferencesInDB
        ? `http://${process.env.REACT_APP_PATH_API}/api/preferences/${userId}`
        : `http://${process.env.REACT_APP_PATH_API}/api/preferences/`;
  
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences: updatedPreferences,
          userId: userId,
        }),
      });
  
      if (response.ok) {
        console.log('Preferences modifiées avec succès');
        if (!hasPreferencesInDB) {
          setHasPreferencesInDB(true);
        }
      } else {
        console.error('Erreur lors de la modification:', response.statusText);
      }
  
      // Si toutes les préférences ont été supprimées
      if (updatedPreferences.length === 0) {
        const deleteResponse = await fetch(`http://${process.env.REACT_APP_PATH_API}/api/preferences/${userId}`, {
          method: 'DELETE',
        });
  
        if (deleteResponse.ok) {
          console.log('Toutes les préférences ont été supprimées');
          setHasPreferencesInDB(false);
        } else {
          console.error('Erreur lors de la suppression des préférences:', deleteResponse.statusText);
        }
      }
    } catch (error) {
      console.error('Erreur de modification:', error);
    }
  };

  const handleSavePreferences = async () => {
    try {
      const method = hasPreferencesInDB ? 'PUT' : 'POST';
      const url = hasPreferencesInDB
        ? `http://${process.env.REACT_APP_PATH_API}/api/preferences/${userId}`
        : `http://${process.env.REACT_APP_PATH_API}/api/preferences/`;

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences: userPreferences,
          userId: userId,
        }),
      });

      if (response.ok) {
        console.log('Preferences sauvegardées avec succès');
        if (!hasPreferencesInDB) {
          setHasPreferencesInDB(true);
        }
      } else {
        console.error('Erreur lors de la sauvegarde:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur pour sauvegarder:', error);
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
          Ajouter
        </Button>
      </div>
      <div>
        {userPreferences.map((pref, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <p>{pref}</p>
            <IconButton onClick={() => handleRemovePreference(index)} aria-label="Delete">
              <ClearIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <Button variant="contained" onClick={handleSavePreferences}>
        Sauvegarder
      </Button>
    </Container>
  );
};

export default PreferencesComponent;
