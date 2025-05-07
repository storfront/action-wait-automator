
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';

const TriggerCard = ({ onAdd, isLast }) => {
  return (
    <Box 
      className="sequence-card trigger-card"
      sx={{
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: 2,
        padding: 2,
        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
        mb: 4
      }}
    >
      <Box className="card-header">
        <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>Trigger</Typography>
      </Box>
      <Box className="card-body">
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 2 }}>
            <Box 
              sx={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                bgcolor: '#e6f7ff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <EmailIcon fontSize="small" color="primary" />
            </Box>
            <Typography variant="body2" fontWeight="medium">Email Received</Typography>
          </Box>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ pl: 5 }}
          >
            When a new email is received that matches the criteria
          </Typography>

          {isLast && (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                mt: 3, 
                pt: 1, 
                borderTop: '1px solid rgba(0,0,0,0.1)' 
              }}
            >
              <Button 
                onClick={onAdd} 
                startIcon={<AddIcon />}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ fontSize: '0.8rem' }}
              >
                Add
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {!isLast && (
        <Box 
          className="connector-dot" 
          sx={{ 
            position: 'absolute',
            bottom: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 10,
            height: 10,
            borderRadius: '50%',
            bgcolor: '#ccc',
            zIndex: 1,
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '100%',
              left: '50%',
              height: 20,
              width: 2,
              transform: 'translateX(-50%)',
              bgcolor: '#ccc'
            }
          }}
        />
      )}
    </Box>
  );
};

export default TriggerCard;
