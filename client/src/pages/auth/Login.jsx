import React, { useState } from "react";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading spinner

  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner
  
    try {
      const response = await axios.post('https://note-api-vaqd.onrender.com/api/v1/login', {
        email,
        password
      });
  
      const { profileDTO, token } = response.data;
      const { accountType } = profileDTO;
  
      localStorage.setItem('profile', JSON.stringify(profileDTO));
      localStorage.setItem('jwtToken', token);
  
      // Redirect to appropriate dashboard based on accountType
      switch (accountType) {
        case 'LECTURER':
          localStorage.setItem('TYPE', accountType);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Redirecting to Lecturer Dashboard...',
          }).then(() => {
            nav("/lecturer-dashboard");
            window.location.reload();
          });
          break;
        case "STUDENT":
          localStorage.setItem('TYPES', accountType);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Redirecting to Student Dashboard...',
          }).then(() => {
            nav("/dashboard");
            window.location.reload();
          });
          break;
        case "ADMIN":
          localStorage.setItem('TYPESS', accountType);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Redirecting to Admin Dashboard...',
          }).then(() => {
            nav("/admin");
            window.location.reload();
          });
          break;
        default:
          console.error('Unknown user type:', accountType);
      }
    } catch (error) {
      console.error('Login error', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password.',
      });
    } finally {
      setLoading(false); 
    }
  };
  
  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Login
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleLogin}>
            <TextField
              id="email-text"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              id="password-input"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={loading} // Disable button while loading
                sx={{ position: 'relative', minWidth: 100 }} // Ensures button has some minimum width
              >
                {loading && <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />}
                Login
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
