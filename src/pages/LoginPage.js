// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api';
import {
  Container, TextField, Button, Typography, Box, Alert,Link
} from '@mui/material';
import axios from 'axios';
// import { Api } from '@mui/icons-material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.clear();
    setErrorMsg('');
    setSuccessMsg('');
    api.post('/auth/signin', {
      username,
      password
    })
  .then(response => {
    localStorage.setItem('token', response.data);
    navigate('/dashboard');
  })
  .catch(error => {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      if (error.response && error.response.status === 401) {
        setErrorMsg('Invalid username or password');
      } 
    } else {
      console.error('Unexpected error:', error);
      setErrorMsg(error);
    }
  });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Login
          </Button>
          <Typography variant="body2" align="center">
            Not a member?{' '}
          <Link href="/signup" underline="hover">
            Register
          </Link>
      </Typography>
        </form>
        {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
        {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
      </Box>
    </Container>
  );
};

export default LoginPage;
