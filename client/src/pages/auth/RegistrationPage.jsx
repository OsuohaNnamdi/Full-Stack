import React, { useState } from "react";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress
} from "@mui/material";
import axios from 'axios';
import Swal from 'sweetalert2';

const RegistrationPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("STUDENT");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://note-api-vaqd.onrender.com/api/v1/register', {
        fullName, email, schoolId, password, accountType
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You can now log in.',
      }).then(() => {
        setFullName("");
        setEmail("");
        setSchoolId("");
        setPassword("");
        setAccountType("STUDENT");
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Please try again.',
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
              Register
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleRegister}>
            <TextField
              id="full-name"
              label="Full Name"
              variant="outlined"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              sx={{ mb: 2 }}
            />
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
              id="school-id"
              label="School ID or Matric Number"
              variant="outlined"
              fullWidth
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
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
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="account-type-label">Account Type</InputLabel>
              <Select
                labelId="account-type-label"
                id="account-type"
                value={accountType}
                label="Account Type"
                onChange={(e) => setAccountType(e.target.value)}
              >
                <MenuItem value="STUDENT">Student</MenuItem>
                <MenuItem value="LECTURER">Lecturer</MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{ position: 'relative', minWidth: 100 }}
              >
                {loading && <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />}
                Register
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationPage;
