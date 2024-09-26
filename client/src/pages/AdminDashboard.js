import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { BiPlusCircle } from 'react-icons/bi';
import DashboardCards from './dashboard/LecturerDashboard/DashboardCards';
import StudentTable from './dashboard/studentDashboard/StudentTable'
import axiosInstance from './auth/axiosInstance';

const AdminDashboard = () => {
  const userProfile = JSON.parse(localStorage.getItem('profile')) || {};
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    fetchStudentCount();
  }, []);

  const fetchStudentCount = async () => {
    try {
      const response = await axiosInstance.get('/all'); 
      setStudentCount(response.data.length);
    } catch (error) {
      console.error('Error fetching students count:', error);
    }
  };

  return (
    <Container sx={{ my: 4, maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', borderRadius: 2, boxShadow: 3 }}>
            <div className="rounded-full p-8 bg-blue-500"></div>
            <div style={{ marginLeft: 16 }}>
              <Typography variant="h6" gutterBottom>
                Welcome {userProfile.fullName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Here is an overview of your dashboard
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCards
            title="Registered Users"
            icon={<BiPlusCircle size={35} />}
            count={<span>Total: {studentCount}</span>}
          />
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ mt: 5 }}>
        Overview
      </Typography>

      {/* Integrating the StudentTable component */}
      <Typography variant="h6" sx={{ mt: 1 }}>
        Registered Users
      </Typography>
      <StudentTable /> {/* Display the student table */}
    </Container>
  );
};

export default AdminDashboard;
