
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  TextField,
  Button
} from '@mui/material';
import CallSplitIcon from '@mui/icons-material/CallSplit';

const ConditionCard = ({ id, onAddToTrueBranch, onAddToFalseBranch }) => {
  const [conditionType, setConditionType] = useState('ndaStatus');
  const [conditionValue, setConditionValue] = useState('submitted');
  
  const handleConditionTypeChange = (event) => {
    setConditionType(event.target.value);
  };
  
  const handleConditionValueChange = (event) => {
    setConditionValue(event.target.value);
  };

  return (
    <Box 
      className="sequence-card condition-card"
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
        <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>Condition</Typography>
      </Box>
      <Box className="card-body">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
          <Box 
            sx={{ 
              width: 32, 
              height: 32, 
              borderRadius: '50%', 
              bgcolor: '#fff8e1', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <CallSplitIcon fontSize="small" color="warning" />
          </Box>
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="When NDA status is..."
          />
        </Box>
        
        <Box sx={{ pl: 5, mb: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }} size="small">
            <InputLabel>Condition Type</InputLabel>
            <Select
              value={conditionType}
              label="Condition Type"
              onChange={handleConditionTypeChange}
            >
              <MenuItem value="ndaStatus">NDA Status</MenuItem>
              <MenuItem value="userRole">User Role</MenuItem>
              <MenuItem value="listingType">Listing Type</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth size="small">
            <InputLabel>Value</InputLabel>
            <Select
              value={conditionValue}
              label="Value"
              onChange={handleConditionValueChange}
            >
              <MenuItem value="inquired">Inquired</MenuItem>
              <MenuItem value="submitted">Submitted</MenuItem>
              <MenuItem value="signed">Signed</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      
      {/* Branching section */}
      <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ width: '48%', p: 1, bgcolor: '#f0fff0', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>If True</Typography>
            <Button 
              onClick={onAddToTrueBranch} 
              variant="outlined" 
              size="small" 
              color="success"
              fullWidth
            >
              Add Steps
            </Button>
          </Box>
          
          <Box sx={{ width: '48%', p: 1, bgcolor: '#fff0f0', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>If False</Typography>
            <Button 
              onClick={onAddToFalseBranch} 
              variant="outlined" 
              size="small" 
              color="error"
              fullWidth
            >
              Add Steps
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ConditionCard;
