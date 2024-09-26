import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CircularProgress
} from '@mui/material';
import axiosInstance from '../../auth/axiosInstance'; // Adjust the import path as needed
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseTitle: '',
    courseCode: '',
    schoolId: '', // This will be set after retrieving from localStorage
    semester: '',
    videoLink: '',
    file: null,
  });

  const [fileError, setFileError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Retrieve user's profile information from localStorage
    const userProfile = JSON.parse(localStorage.getItem('profile')) || {};
    const schoolId = userProfile.schoolId || '';

    setFormData((prev) => ({
      ...prev,
      schoolId: schoolId, // Set schoolId from localStorage
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInputChange = (e) => {
    setFileError('');
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const fileExtension = files[0].name.split('.').pop().toLowerCase();
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
      if (!allowedExtensions.includes(fileExtension)) {
        setFileError('Invalid file type. Please select an image (.jpg, .jpeg, .png) or a pdf file.');
        return;
      }
      setFormData((prev) => ({ ...prev, file: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('courseTitle', formData.courseTitle);
      formDataToSend.append('courseCode', formData.courseCode);
      formDataToSend.append('schoolId', formData.schoolId);
      formDataToSend.append('semester', formData.semester);
      formDataToSend.append('videoLink', formData.videoLink);
      if (formData.file) {
        formDataToSend.append('document', formData.file);
      }

      await axiosInstance.post('/courses/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        title: 'Success!',
        text: 'Course added successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Reset form data or handle success as needed
      setFormData({
        courseTitle: '',
        courseCode: '',
        schoolId: formData.schoolId, // Keep schoolId unchanged
        semester: '',
        videoLink: '',
        file: null,
      });
    } catch (error) {
      console.error('Error adding course:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add course.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        my: 4,
        p: 3,
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: 1
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add New Course
      </Typography>
      <TextField
        name="courseTitle"
        label="Course Title"
        fullWidth
        variant="outlined"
        value={formData.courseTitle}
        onChange={handleInputChange}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name="courseCode"
        label="Course Code"
        fullWidth
        variant="outlined"
        value={formData.courseCode}
        onChange={handleInputChange}
        required
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Semester</InputLabel>
        <Select
          name="semester"
          value={formData.semester}
          onChange={handleInputChange}
          label="Semester"
          required
        >
          <MenuItem value="Harmattan">Harmattan Semester</MenuItem>
          <MenuItem value="Rain">Rain Semester</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="videoLink"
        label="Video Link (optional)"
        fullWidth
        variant="outlined"
        value={formData.videoLink}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <Box
        sx={{
          border: '1px dotted',
          borderRadius: 2,
          padding: 2,
          textAlign: 'center',
          bgcolor: '#f5f5f5',
          mb: 2,
        }}
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileInputChange}
        />
        <label
          htmlFor="fileInput"
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
            backgroundColor: '#d1eaff',
          }}
        >
          Upload File
        </label>
        {formData.file && (
          <Box
            sx={{
              mt: 2,
              bgcolor: 'white',
              borderRadius: 1,
              border: '1px solid #ddd',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ p: 1 }}>{formData.file.name}</Typography>
          </Box>
        )}
        {fileError && <Typography color="error">{fileError}</Typography>}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="button"
          onClick={() => {
            // Handle cancel logic if needed
          }}
          color="primary"
          variant="outlined"
          sx={{ mr: 2 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={loading}
          sx={{ position: 'relative' }}
        >
          {loading && (
            <CircularProgress
              size={24}
              sx={{ position: 'absolute', left: '50%', top: '50%', marginLeft: '-12px', marginTop: '-12px' }}
            />
          )}
          {loading ? 'Adding...' : 'Add Course'}
        </Button>
      </Box>
    </Box>
  );
};

export default AddCourse;
