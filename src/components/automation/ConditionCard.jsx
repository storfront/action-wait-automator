
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  TextField,
  Button,
  IconButton,
  Menu
} from '@mui/material';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ConditionCard = ({ id, onAddToTrueBranch, onAddToFalseBranch, onDelete, onInsert }) => {
  const [conditionType, setConditionType] = useState('ndaStatus');
  const [conditionValue, setConditionValue] = useState('submitted');
  const [conditionName, setConditionName] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  
  const handleConditionTypeChange = (event) => {
    setConditionType(event.target.value);
  };
  
  const handleConditionValueChange = (event) => {
    setConditionValue(event.target.value);
  };

  const handleConditionNameChange = (event) => {
    setConditionName(event.target.value);
  };

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleDelete = () => {
    handleCloseMenu();
    onDelete(id);
  };

  const handleInsert = () => {
    handleCloseMenu();
    onInsert(id);
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
      <Box className="card-header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography variant="subtitle2" fontWeight="medium">Condition</Typography>
        <IconButton size="small" onClick={handleOpenMenu}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem onClick={handleInsert}>
            <AddIcon fontSize="small" sx={{ mr: 1 }} /> Insert Card
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteOutlineIcon fontSize="small" sx={{ mr: 1 }} /> Delete
          </MenuItem>
        </Menu>
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
            value={conditionName}
            onChange={handleConditionNameChange}
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
              startIcon={<AddIcon />}
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
              startIcon={<AddIcon />}
            >
              Add Steps
            </Button>
          </Box>
        </Box>
      </Box>
      
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
    </Box>
  );
};

export default ConditionCard;
