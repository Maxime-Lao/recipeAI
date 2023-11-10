
import React from 'react';
import { IconButton } from '@mui/material';
import { Chat } from '@mui/icons-material';

const ChatIcon = () => {
  const handleClick = () => {
    window.location.href = '/chat';
  };

  return (
    <IconButton onClick={handleClick} sx={{ borderRadius: '50%' }}>
      <Chat />
    </IconButton>
  );
};

export default ChatIcon;
