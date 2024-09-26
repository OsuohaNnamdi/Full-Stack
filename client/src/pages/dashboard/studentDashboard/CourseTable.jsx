import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Modal, Box, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from '../../auth/axiosInstance';
import Swal from 'sweetalert2';


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get('/courses');
      setCourses(response.data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch courses.', 'error');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`/courses/search/${searchQuery}`);
      setCourses(response.data);
    } catch (error) {
      Swal.fire('Error', 'No courses found.', 'error');
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/courses/${id}`);
          fetchCourses(); // Refresh the list after deletion
          Swal.fire('Deleted!', 'The course has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error', 'Failed to delete course.', 'error');
        }
      }
    });
  };

  const handleUpdate = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put(`/courses/${selectedCourse.id}`, selectedCourse);
      fetchCourses();
      handleClose();
      Swal.fire('Success', 'Course updated successfully.', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to update course.', 'error');
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TextField
        label="Search Course"
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
        <Table sx={{ minWidth: 650 }} aria-label="course table">
          <TableHead>
            <TableRow>
              <TableCell>Course Title</TableCell>
              <TableCell>Course Code</TableCell>
              <TableCell>School ID</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.courseTitle}</TableCell>
                <TableCell>{course.courseCode}</TableCell>
                <TableCell>{course.schoolId}</TableCell>
                <TableCell>{course.semester}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleUpdate(course)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(course.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <h2>Edit Course</h2>
          <TextField
            label="Course Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedCourse?.courseTitle || ''}
            onChange={(e) => setSelectedCourse({ ...selectedCourse, courseTitle: e.target.value })}
          />
          <TextField
            label="Course Code"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedCourse?.courseCode || ''}
            onChange={(e) => setSelectedCourse({ ...selectedCourse, courseCode: e.target.value })}
          />
          <TextField
            label="School ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedCourse?.schoolId || ''}
            onChange={(e) => setSelectedCourse({ ...selectedCourse, schoolId: e.target.value })}
          />
          <TextField
            label="Semester"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedCourse?.semester || ''}
            onChange={(e) => setSelectedCourse({ ...selectedCourse, semester: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Paper>
  );
};

export default CourseTable;
