import React, { useState } from 'react';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import api from '../Api';
const ClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address1: '',
    address2: '',
    address3: '',
    city: '',
    state: '',
    contactNo: ''
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      api.post('/client/addClient', formData);
      setSuccess(true);
      setFormData({
        name: '',
        address1: '',
        address2: '',
        address3: '',
        city: '',
        state: '',
        contactNo: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400, mx: 'auto', mt: 5 }}
      onSubmit={handleSubmit}
    >
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
      <TextField label="Address 1" name="address1" value={formData.address1} onChange={handleChange} required />
      <TextField label="Address 2" name="address2" value={formData.address2} onChange={handleChange} />
      <TextField label="Address 3" name="address3" value={formData.address3} onChange={handleChange} />
      <TextField label="City" name="city" value={formData.city} onChange={handleChange} required />
      <TextField label="State" name="state" value={formData.state} onChange={handleChange} required />
      <TextField label="Contact No" name="contactNo" value={formData.contactNo} onChange={handleChange} required />
      <Button type="submit" variant="contained">Submit</Button>

      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Data submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClientForm;
