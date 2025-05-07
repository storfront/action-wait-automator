
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import AutomationSequence from '../components/automation/AutomationSequence';

const Index = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fc', py: 4 }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Email Automation Builder
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Create automated email sequences with custom wait times
          </Typography>
        </Box>
        
        <AutomationSequence />
      </Container>
    </Box>
  );
};

export default Index;
