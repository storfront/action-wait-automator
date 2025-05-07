
import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';

const ActionCard = ({ id, onAdd, onDelete, isLast }) => {
  return (
    <Box 
      className="sequence-card action-card"
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
        <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>Action</Typography>
      </Box>
      <Box className="card-body">
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
            <Box 
              sx={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                bgcolor: '#f0fff0', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <SendIcon fontSize="small" sx={{ color: 'green' }} />
            </Box>
            <Typography variant="body2" fontWeight="medium">Send Email</Typography>
          </Box>
          
          <Box sx={{ pl: 5 }}>
            <Box sx={{ mb: 2 }}>
              <TextField
                id={`subject-${id}`}
                fullWidth
                placeholder="Email Subject"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                id={`content-${id}`}
                fullWidth
                placeholder="Email Content"
                variant="outlined"
                multiline
                rows={2}
              />
            </Box>
          </Box>

          {isLast && (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: 3, 
                pt: 1, 
                borderTop: '1px solid rgba(0,0,0,0.1)' 
              }}
            >
              <Button 
                onClick={onDelete} 
                startIcon={<DeleteOutlineIcon />}
                color="error"
                variant="outlined"
                size="small"
                sx={{ fontSize: '0.8rem' }}
              >
                Delete
              </Button>
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

export default ActionCard;
