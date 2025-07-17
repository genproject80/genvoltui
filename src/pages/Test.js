import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Button,
  Stack
} from '@mui/material';

const clients = [
  { id: 1, name: 'Client A' },
  { id: 2, name: 'Client B' },
  { id: 3, name: 'Client C' },
];

const Test = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address1: '',
    address2: '',
    address3: '',
    city: '',
    state: '',
    contactNo: '',
    client: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {[
            'id',
            'name',
            'address1',
            'address2',
            'address3',
            'city',
            'state',
            'contactNo'
          ].map((field) => (
            <TextField
              key={field}
              fullWidth
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
          ))}

          <FormControl fullWidth>
            <InputLabel>Client</InputLabel>
            <Select
              name="client"
              value={formData.client}
              label="Client"
              onChange={handleChange}
            >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Test;
