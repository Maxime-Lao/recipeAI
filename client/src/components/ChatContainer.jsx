import React, { useState } from 'react';
import Chata from '../pages/Chat';
import { IconButton, Box } from '@mui/material';
import { Chat } from '@mui/icons-material';

const ChatContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
      {isOpen && <Chata onClose={toggleChat} />}
      {!isOpen &&
        <IconButton onClick={toggleChat}>
          <Chat />
        </IconButton>
      }
    </Box>
  );
};

export default ChatContainer;
