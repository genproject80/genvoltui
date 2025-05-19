import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography,Alert } from '@mui/material';
import api from './Api';
const SignupPage = () => {
  const [successMsg, setSuccessMsg] = useState('');
  /*
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    phNo: '',
    email: '',
  });
  */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phNo, setPhNo] = useState("");
  const [email, setEmail] = useState("");
/*
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };*/
  const formData = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password,
    phNo: phNo,
    email: email
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can send this to an API or handle it as needed
    api.post('/auth/signup', {
        firstName,
        lastName,
        username,
        password,
        phNo,
        email
      })
      .then(response => {
        console.log('Data:', response.data);
        setSuccessMsg(response.data)
      });
      
    
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom>
            {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
        </Typography>
        <Typography variant="h6" gutterBottom>
          User Registration Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone Number"
            name="phNo"
            value={phNo}
            onChange={(e) => setPhNo(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
