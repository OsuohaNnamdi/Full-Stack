import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import axiosInstance from '../../auth/axiosInstance';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get('/all');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      Swal.fire('Error', 'Failed to fetch students.', 'error');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`/search/${searchQuery}`);
      setStudents(response.data);
      if (response.data.length === 0) {
        Swal.fire('No Results', 'No students found matching your search query.', 'info');
      }
    } catch (error) {
      console.error('Error searching students:', error);
      Swal.fire('Error', 'Failed to search students.', 'error');
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this student? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/${id}`);
          fetchStudents();
          Swal.fire('Deleted!', 'The student has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting student:', error);
          Swal.fire('Error', 'Failed to delete student.', 'error');
        }
      }
    });
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  const handleFormChange = (e) => {
    setSelectedStudent({ ...selectedStudent, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      await axiosInstance.put(`/${selectedStudent.id}`, selectedStudent);
      fetchStudents();
      Swal.fire('Updated!', 'The student has been updated.', 'success');
      handleClose();
    } catch (error) {
      console.error('Error updating student:', error);
      Swal.fire('Error', 'Failed to update student.', 'error');
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TextField
        label="Search Student"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>School ID</TableCell>
              <TableCell>Account Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.fullName}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.schoolId}</TableCell>
                <TableCell>{student.accountType}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleUpdate(student)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(student.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            name="fullName"
            value={selectedStudent?.fullName || ''}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={selectedStudent?.email || ''}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="School ID"
            name="schoolId"
            value={selectedStudent?.schoolId || ''}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Account Type"
            name="accountType"
            value={selectedStudent?.accountType || ''}
            onChange={handleFormChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default StudentTable;
