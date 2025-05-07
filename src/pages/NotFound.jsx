
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: 3
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Page not found
      </Typography>
      <Button 
        component={Link} 
        to="/" 
        variant="contained" 
        color="primary" 
        sx={{ mt: 2 }}
      >
        Return to home page
      </Button>
    </Box>
  );
};

export default NotFound;
