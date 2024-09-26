import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { BiDotsVertical } from 'react-icons/bi';
import { Download as DownloadIcon } from '@mui/icons-material';
import DeleteResource from './DeleteResource';
import EditResource from './EditResource';

const ResourceCard = ({ id, courseCode, courseTitle, file, isStudent }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpenEditDialog(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const handleDownload = () => {
    if (file) {
      const link = document.createElement('a');
      link.href = file;
      link.download = file.split('/').pop(); // Extract file name from URL
      link.click();
    }
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{courseTitle}</Typography>
          <Typography variant="body2" color="textSecondary">{courseCode}</Typography>
          <IconButton onClick={isStudent ? handleDownload : handleMenuOpen}>
            {isStudent ? <DownloadIcon /> : <BiDotsVertical />}
          </IconButton>
        </Box>
        {!isStudent && (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
          </Menu>
        )}
      </CardContent>
      <DeleteResource open={openDeleteDialog} courseId={id} onClose={setOpenDeleteDialog} />
      <EditResource open={openEditDialog} courseId={id} onClose={setOpenEditDialog} />
    </Card>
  );
};

export default ResourceCard;
