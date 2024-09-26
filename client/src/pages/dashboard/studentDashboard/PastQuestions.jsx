import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, CircularProgress, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import ResourceCard from '../LecturerDashboard/ResourceCard';
import axiosInstance from '../../auth/axiosInstance';

const PastQuestions = () => {
  const [semester, setSemester] = useState('by me');
  const [uploadedQuestions, setUploadedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/past-questions')
      .then(response => {
        setUploadedQuestions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching past questions:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axiosInstance.delete(`/past-questions/${id}`)
      .then(() => {
        setUploadedQuestions(prev => prev.filter(q => q.id !== id));
      })
      .catch(error => {
        console.error('Error deleting past question:', error);
      });
  };

  return (
    <Box sx={{ maxHeight: '100vh', overflowY: 'scroll' }}>
      <Box sx={{ p: 5, sm: { p: 10 }, my: 20 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <Box sx={{ borderRadius: '50%', p: 8, bgcolor: 'primary.main', width: 'fit-content' }} />
            <Box>
              <Typography variant="h6" fontWeight="medium">Welcome Joe Doe</Typography>
              <Typography variant="body2" mt={2}>Here is an overview of your past questions</Typography>
            </Box>
          </Box>

          <Button sx={{ maxWidth: 'md', textAlign: 'start' }}>
            <Typography variant="h6">Total uploaded: {uploadedQuestions.length}</Typography>
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 5, mt: 5 }}>
          <Button
            sx={{
              borderBottom: semester === 'by me' ? '2px solid' : '2px solid transparent',
              borderColor: semester === 'by me' ? 'primary.main' : 'transparent',
            }}
            onClick={() => setSemester('by me')}
          >
            Uploaded By Me
          </Button>
          <Button
            sx={{
              borderBottom: semester === 'first' ? '2px solid' : '2px solid transparent',
              borderColor: semester === 'first' ? 'primary.main' : 'transparent',
            }}
            onClick={() => setSemester('first')}
          >
            Harmattan Semester (1st)
          </Button>
          <Button
            sx={{
              borderBottom: semester === 'second' ? '2px solid' : '2px solid transparent',
              borderColor: semester === 'second' ? 'primary.main' : 'transparent',
            }}
            onClick={() => setSemester('second')}
          >
            Rain Semester (2nd)
          </Button>
        </Box>

        <Box sx={{ mt: 5 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            uploadedQuestions.length > 0 ? (
              uploadedQuestions.map((question) => (
                <Paper key={question.id} sx={{ p: 2, mb: 2, position: 'relative' }}>
                  <ResourceCard
                    courseCode={question.courseCode}
                    courseTitle={question.courseTitle}
                    file={question.file}
                    isStudent={true}
                  />
                  <IconButton
                    onClick={() => handleDelete(question.id)}
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              ))
            ) : (
              <Typography variant="h6">No past questions available</Typography>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PastQuestions;
