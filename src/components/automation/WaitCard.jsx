
import React, { useState } from 'react';
import { 
  Box,
  Typography,
  Slider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Menu
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const WaitCard = ({ id, groupId, branchId, onDelete, onInsert }) => {
  const [waitTime, setWaitTime] = useState(2);
  const [timeUnit, setTimeUnit] = useState('days');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleSliderChange = (event, newValue) => {
    setWaitTime(newValue);
  };

  const handleInputChange = (event) => {
    setWaitTime(
      event.target.value === '' ? 0 : Number(event.target.value)
    );
  };

  const handleUnitChange = (event) => {
    setTimeUnit(event.target.value);
  };

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleDelete = () => {
    handleCloseMenu();
    onDelete(id, groupId);
  };

  const handleInsert = () => {
    handleCloseMenu();
    onInsert(id, groupId);
  };

  return (
    <Box 
      className="sequence-card wait-card"
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
        <Typography variant="subtitle2" fontWeight="medium">Wait</Typography>
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
              bgcolor: '#f0f8ff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <AccessTimeIcon fontSize="small" color="primary" />
          </Box>
          <Typography variant="body2" fontWeight="medium">Time Delay</Typography>
        </Box>
        
        <Box sx={{ pl: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 2 }}>
            <TextField
              value={waitTime}
              onChange={handleInputChange}
              inputProps={{
                step: 1,
                min: 1,
                max: 30,
                type: 'number',
              }}
              size="small"
              sx={{ width: 80 }}
            />
            <FormControl sx={{ width: 100 }} size="small">
              <Select
                value={timeUnit}
                onChange={handleUnitChange}
              >
                <MenuItem value="minutes">Minutes</MenuItem>
                <MenuItem value="hours">Hours</MenuItem>
                <MenuItem value="days">Days</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ px: 1, width: '90%' }}>
            <Slider
              value={typeof waitTime === 'number' ? waitTime : 2}
              onChange={handleSliderChange}
              min={1}
              max={30}
              valueLabelDisplay="auto"
            />
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

export default WaitCard;
