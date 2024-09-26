import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Paper
} from '@mui/material';
import axiosInstance from '../../auth/axiosInstance'; // Adjust the import path as needed
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>Course Details</Typography>
      {course && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5">{course.courseTitle}</Typography>
          <Typography variant="h6" color="textSecondary">{course.courseCode}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>School ID:</strong> {course.schoolId}
          </Typography>
          <Typography variant="body1">
            <strong>Semester:</strong> {course.semester}
          </Typography>
          <Typography variant="body1">
            <strong>Video Link:</strong> {course.videoLink || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>File:</strong> {course.file ? (
              <a href={course.file} target="_blank" rel="noopener noreferrer">
                Download File
              </a>
            ) : 'No file available'}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleBack}>
              Back
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default CourseDetail;
