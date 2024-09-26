import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Button, Box, CircularProgress } from '@mui/material';
import ResourceCard from '../LecturerDashboard/ResourceCard';
import axiosInstance from '../../auth/axiosInstance'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [semester, setSemester] = useState('first');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [semesterCourses, setSemesterCourses] = useState([]);
  const [pastQuestions, setPastQuestions] = useState([]);
  const userProfile = JSON.parse(localStorage.getItem('profile')) || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoursesAndPastQuestions = async () => {
      setLoading(true);
      try {
        const courseResponse = await axiosInstance.get('/courses');
        setCourses(courseResponse.data);
        console.log(courseResponse.data);

        const pastQuestionsResponse = await axiosInstance.get('/past-questions');
        setPastQuestions(pastQuestionsResponse.data);
        console.log(pastQuestionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesAndPastQuestions();
  }, []);

  useEffect(() => {
    const filterCourses = (allCourses, semester) => {
      const filteredCourses = allCourses.filter(course =>
        (semester === 'first' && course.semester === 'Harmattan') ||
        (semester === 'second' && course.semester === 'Rain')
      );
      setSemesterCourses(filteredCourses);
    };

    filterCourses(courses, semester);
  }, [semester, courses]);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <Container sx={{ my: 4, maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', borderRadius: 2, boxShadow: 3 }}>
            <div style={{ marginLeft: 16 }}>
              <Typography variant="h6" gutterBottom>Welcome {userProfile.fullName}</Typography>
              <Typography variant="body2" color="textSecondary">Here is an overview of your courses</Typography>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button
            sx={{
              borderBottom: semester === 'first' ? '2px solid' : '2px solid transparent',
              borderColor: semester === 'first' ? 'primary.main' : 'transparent',
              mr: 2
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
          <Button
            sx={{
              borderBottom: semester === 'past' ? '2px solid' : '2px solid transparent',
              borderColor: semester === 'past' ? 'primary.main' : 'transparent',
              ml: 2
            }}
            onClick={() => setSemester('past')}
          >
            Past Questions
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ mt: 5 }}>Available Resources</Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ mt: 5 }}>
          {semester === 'past' ? (
            <Box>
              {pastQuestions.map((question) => (
                <Paper key={question.id} sx={{ p: 2, mb: 2 }}>
                  <ResourceCard
                    courseCode={question.courseCode}
                    courseTitle={question.courseTitle}
                    file={question.file}
                    isStudent
                  />
                </Paper>
              ))}
            </Box>
          ) : (
            <Box>
              <Typography variant="h6">{semester === 'first' ? 'Harmattan Semester' : 'Rain Semester'}</Typography>
              {semesterCourses.map((course) => (
                <Paper key={course.id} sx={{ p: 2, mb: 2 }} onClick={() => handleCourseClick(course.id)}>
                  <ResourceCard id={course.id} courseCode={course.courseCode} courseTitle={course.courseTitle} file={course.file} isStudent={true} />
                </Paper>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;