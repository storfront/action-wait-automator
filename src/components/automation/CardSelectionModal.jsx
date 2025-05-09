
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import SendIcon from '@mui/icons-material/Send';
import { Box, Typography } from '@mui/material';

const CardSelectionModal = ({ show, handleClose, handleSelect, position }) => {
  const cardTypes = [
    { 
      id: 'delay', 
      title: 'Delay', 
      description: 'Wait for a specific time period',
      icon: <AccessTimeIcon sx={{ color: 'primary.main' }} />,
      bgColor: '#f0f8ff'
    },
    { 
      id: 'condition', 
      title: 'Condition', 
      description: 'Branch based on specific criteria',
      icon: <CallSplitIcon sx={{ color: 'warning.main' }} />,
      bgColor: '#fff8e1'
    },
    { 
      id: 'action', 
      title: 'Action', 
      description: 'Send an email or perform an action',
      icon: <SendIcon sx={{ color: 'success.main' }} />,
      bgColor: '#f0fff0'
    }
  ];

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {cardTypes.map((cardType) => (
            <Button 
              key={cardType.id}
              variant="outline-light"
              onClick={() => {
                handleSelect(cardType.id, position);
                handleClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                textAlign: 'left',
                background: cardType.bgColor,
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '8px'
              }}
            >
              <Box sx={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                bgcolor: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 2,
                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
              }}>
                {cardType.icon}
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="medium">{cardType.title}</Typography>
                <Typography variant="body2" color="text.secondary">{cardType.description}</Typography>
              </Box>
            </Button>
          ))}
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default CardSelectionModal;
