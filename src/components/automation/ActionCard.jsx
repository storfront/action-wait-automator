
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
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { JoditEditor } from 'jodit-react';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ActionCard = ({ id, onAdd, onDelete, onInsert, isLast, groupId, branchId }) => {
  const [open, setOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
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

  const handleBodyChange = (content) => {
    setEmailData({
      ...emailData,
      body: content
    });
  };

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
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
      <Box className="card-header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography variant="subtitle2" fontWeight="medium">Action</Typography>
        <IconButton size="small" onClick={handleOpenMenu}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleOpenDialog}>
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
                onClick={handleOpenDialog}
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
      
      {/* Email content editor dialog */}
      <Dialog 
        open={open} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit Email Content
          <IconButton
            onClick={handleCloseDialog}
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
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Subject"
                name="subject"
                value={emailData.subject}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  label="From"
                  name="from"
                  value={emailData.from}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="To"
                  name="to"
                  value={emailData.to}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Box>
              
              <TextField
                label="CC"
                name="cc"
                value={emailData.cc}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Box>
            
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>
              Email Body
            </Typography>
            
            <Box sx={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: 1, mb: 2 }}>
              <JoditEditor
                value={emailData.body}
                onChange={handleBodyChange}
                config={{
                  readonly: false,
                  height: 400,
                  buttons: [
                    'source', '|',
                    'bold', 'italic', 'underline', '|',
                    'ul', 'ol', '|',
                    'font', 'fontsize', 'brush', 'paragraph', '|',
                    'image', 'table', 'link', '|',
                    'left', 'center', 'right', 'justify', '|',
                    'undo', 'redo', '|',
                    'hr', 'eraser', 'fullsize'
                  ],
                  uploader: { insertImageAsBase64URI: true },
                }}
              />
            </Box>
            
            <Typography variant="caption" color="text.secondary">
              You can use HTML and dynamic variables in the email body. Insert variables by typing {'{variable_name}'}.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} variant="contained">Save</Button>
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
