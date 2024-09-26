import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { BiPlusCircle } from 'react-icons/bi';
import ResourceCard from './ResourceCard';
import DashboardCards from './DashboardCards';
import axiosInstance from '../../auth/axiosInstance'; 

const LecturerDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Retrieve schoolId from localStorage or context
  const userProfile = JSON.parse(localStorage.getItem('profile')) || {};
  const schoolId = userProfile.schoolId || '';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get(`/courses/school/${schoolId}`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [schoolId]);

  return (
    <Container sx={{ my: 4, maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', borderRadius: 2, boxShadow: 3 }}>
            <div className="rounded-full p-8 bg-blue-500"></div>
            <div style={{ marginLeft: 16 }}>
              <Typography variant="h6" gutterBottom>Welcome {userProfile.fullName}</Typography>
              <Typography variant="body2" color="textSecondary">Here is an overview of your courses</Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCards
            title="Upload Course Materials"
            icon={<BiPlusCircle size={35} />}
            count={<span>Total: {courses.length}</span>}
          />
        </Grid>
      </Grid>
      <Typography variant="h4" sx={{ mt: 5 }}>Available Courses</Typography>
      <Typography variant="h6" sx={{ mt: 1 }}>All</Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        courses.map(course => (
          <ResourceCard
            key={course.id}
            id={course.id}
            courseCode={course.courseCode}
            courseTitle={course.courseTitle}
            file={course.file}
            isStudent={false}
          />
        ))
      )}
    </Container>
  );
};

export default LecturerDashboard;
