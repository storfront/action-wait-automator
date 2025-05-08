
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Autocomplete
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';

const TriggerCard = ({ id, onAdd, isLast }) => {
  const [triggerType, setTriggerType] = useState('ndaAction');
  const [selectedListings, setSelectedListings] = useState([]);
  
  const listings = [
    { id: 1, title: "Property A" },
    { id: 2, title: "Property B" },
    { id: 3, title: "Property C" },
    { id: 4, title: "Property D" }
  ];
  
  const handleTriggerTypeChange = (event) => {
    setTriggerType(event.target.value);
  };

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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
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
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              size="small"
              placeholder="When NDA status is..."
            />
          </Box>
          
          <Box sx={{ pl: 5, mb: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }} size="small">
              <InputLabel>Event</InputLabel>
              <Select
                value={triggerType}
                label="Event"
                onChange={handleTriggerTypeChange}
              >
                <MenuItem value="ndaAction">NDA Action</MenuItem>
                <MenuItem value="emailReceived">Email Received</MenuItem>
                <MenuItem value="listingUpdated">Listing Updated</MenuItem>
              </Select>
            </FormControl>
            
            <Autocomplete
              multiple
              id="listings-tags"
              options={listings}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Listings"
                  placeholder="Listings"
                  size="small"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip 
                    label={option.title} 
                    {...getTagProps({ index })} 
                    size="small"
                  />
                ))
              }
              value={selectedListings}
              onChange={(event, newValue) => {
                setSelectedListings(newValue);
              }}
            />
          </Box>

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
