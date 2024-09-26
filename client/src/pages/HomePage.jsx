import React from "react";
import { Box, Button, Typography, Grid, Container, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import image from '../assets/img.jpg'

const HomePage = () => {
  return (
    <Box>
      
      <Box
        sx={{
          height: "80vh",
          background: `url(${image}) no-repeat center center`,
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
            This is a Note Sharing Web Application
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4 }}>
            Your go-to platform for managing and sharing educational materials.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ textTransform: "none", fontSize: "1rem" }}
            component={Link}
            to="/register"
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ my: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Explore Our Features
        </Typography>
        <Typography variant="body1" align="center" gutterBottom sx={{ mb: 4 }}>
          Whether you're a student, lecturer, or admin, The note sharing platform offers the tools you need to succeed.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  For Students
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Access course materials, upload past questions, and stay on top of your studies.
                </Typography>
                <Button variant="outlined" color="primary" component={Link} to="/">
                  Student Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  For Lecturers
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Manage courses, upload materials, and guide your students effectively.
                </Typography>
                <Button variant="outlined" color="primary" component={Link} to="/">
                  Lecturer Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  For Admins
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Oversee system activities, manage users, and handle course administration.
                </Typography>
                <Button variant="outlined" color="primary" component={Link} to="/">
                  Admin Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ backgroundColor: "#f4f4f4", py: 4, textAlign: "center" }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Ready to Start? 
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/register"
          sx={{ mx: 1 }}
        >
          Register Now
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          component={Link}
          to="/login"
          sx={{ mx: 1 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
