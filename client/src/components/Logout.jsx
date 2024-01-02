import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav>
      <Button onClick={handleLogout}>Déconnexion</Button>
      {/* Autres éléments de navigation */}
    </nav>
  );
};

export default Navbar;
