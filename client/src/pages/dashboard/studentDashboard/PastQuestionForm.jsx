import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, CircularProgress } from '@mui/material';
import axiosInstance from '../../auth/axiosInstance'; // Ensure axiosInstance is correctly configured
import Swal from 'sweetalert2';

const PastQuestionForm = () => {
  const [file, setFile] = useState(null);
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [message, setMessage] = useState('');

  const userProfile = JSON.parse(localStorage.getItem('profile')) || {};
  const schoolId = userProfile.schoolId || '';

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = async () => {
    if (file && courseCode && description) {
      const formData = new FormData();
      formData.append('courseCode', courseCode);
      formData.append('courseTitle', description);
      formData.append('schoolId', schoolId);
      formData.append('document', file);

      setLoading(true); // Show spinner

      try {
        await axiosInstance.post('/past-questions', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setLoading(false); // Hide spinner
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Past question sent successfully!',
        });
        // Optionally, reset the form here
        setCourseCode('');
        setDescription('');
        setFile(null);
      } catch (error) {
        setLoading(false); // Hide spinner
        console.error('Error sending past question:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error sending past question',
        });
      }
    } else {
      setMessage('Please provide a file, course code, and description.');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Send Past Question</Typography>
        <TextField
          fullWidth
          label="Course Code"
          variant="outlined"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ display: 'block', marginBottom: '16px' }}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={loading} // Disable button while loading
        >
          {loading ? <CircularProgress size={24} /> : 'Send Past Question'}
        </Button>
        {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
      </CardContent>
    </Card>
  );
};

export default PastQuestionForm;
