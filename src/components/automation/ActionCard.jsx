
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

// We'll import JoditEditor for the rich text editing
// Note: This will require installing jodit-react
const ActionCard = ({ id, onAdd, onDelete, isLast, groupId, branchId }) => {
  const [open, setOpen] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: '',
    from: '',
    to: '',
    cc: '',
    body: '<p>Write your email content here...</p>'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                label="Subject"
                name="subject"
                value={emailData.subject}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
              
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  label="From"
                  name="from"
                  value={emailData.from}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
                <TextField
                  label="To"
                  name="to"
                  value={emailData.to}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
              
              <TextField
                label="CC"
                name="cc"
                value={emailData.cc}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
              
              <Button
                onClick={handleOpen}
                startIcon={<EditIcon />}
                variant="outlined"
                size="small"
              >
                Edit Email Content
              </Button>
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
      
      {/* Email content editor dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit Email Content
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email Content (Rich Text Editor will be integrated here)
            </Typography>
            <TextField
              multiline
              rows={10}
              fullWidth
              placeholder="Email body content will be edited here with Jodit editor"
              name="body"
              value={emailData.body}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      
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
