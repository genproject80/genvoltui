import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Box
} from '@mui/material';

const initialClients = [
  { id: 1, name: 'John Doe', address1: '123 St', address2: 'Block A', address3: '', city: 'NYC', state: 'NY', contactNo: '1234567890' },
];

const clientOptions = ['Client A', 'Client B', 'Client C'];

const Test = () => {
  const [rowData, setRowData] = useState(initialClients);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '', name: '', address1: '', address2: '', address3: '', city: '', state: '', contactNo: '', client: '',
  });
  const gridRef = useRef();

  const columnDefs = [
    { field: 'id' },
    { field: 'name' },
    { field: 'address1' },
    { field: 'address2' },
    { field: 'address3' },
    { field: 'city' },
    { field: 'state' },
    { field: 'contactNo' },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <Button variant="outlined" size="small" onClick={() => handleEdit(params.data)}>Edit</Button>
      )
    }
  ];

  const handleEdit = (data) => {
    setEditMode(true);
    setFormData({ ...data, client: '' }); // Assume client info is not stored in table
    setOpen(true);
  };

  const handleAddClick = () => {
    setEditMode(false);
    setFormData({ id: '', name: '', address1: '', address2: '', address3: '', city: '', state: '', contactNo: '', client: '' });
    setOpen(true);
  };

  const handleSave = () => {
    if (editMode) {
      setRowData(prev => prev.map(row => (row.id === formData.id ? formData : row)));
    } else {
      setRowData(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    setOpen(false);
  };

  return (
    <Box sx={{ height: 500, width: '100%', padding: 2 }}>
      <Button variant="contained" onClick={handleAddClick} sx={{ mb: 2 }}>
        Add Client
      </Button>
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, sortable: true, filter: true, editable: false }}
        />
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Client' : 'Add Client'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth margin="dense" label="Name"
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Address 1"
            value={formData.address1} onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Address 2"
            value={formData.address2} onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Address 3"
            value={formData.address3} onChange={(e) => setFormData({ ...formData, address3: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="City"
            value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="State"
            value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Contact No"
            value={formData.contactNo} onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
          />
          {!editMode && (
            <TextField
              select fullWidth margin="dense" label="Client"
              value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            >
              {clientOptions.map((client, index) => (
                <MenuItem key={index} value={client}>{client}</MenuItem>
              ))}
            </TextField>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Test;
