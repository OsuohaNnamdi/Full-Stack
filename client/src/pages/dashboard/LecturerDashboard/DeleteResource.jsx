import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, Typography, IconButton, CircularProgress } from '@mui/material';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import axiosInstance from "../../auth/axiosInstance";
import Swal from 'sweetalert2';

const DeleteResource = ({ open, courseId, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/courses/${courseId}`);
      Swal.fire({
        title: 'Success',
        text: 'Resource deleted successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        handleClose();
        // You may want to refresh the page or update the UI to reflect the deletion
      });
    } catch (error) {
      console.error('Error deleting resource', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete resource',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h6">Delete Resource</Typography>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
          <IoMdCloseCircleOutline size={30} color="red" />
        </IconButton>
      </DialogTitle>
      <Typography variant="body1" sx={{ p: 2, textAlign: 'center' }}>
        Are you sure you want to delete this resource?
      </Typography>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">No</Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="warning"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Deleting...' : 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteResource;
