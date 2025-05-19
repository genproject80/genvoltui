import React, { useState, useEffect, useMemo, useRef  } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-community/styles/ag-theme-material.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';
//import { Box, Container, Typography, Button,Stack } from '@mui/material';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Container,
    Stack,
  } from "@mui/material";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import api from '../Api';
// Register all community modules
ModuleRegistry.registerModules([ AllCommunityModule ]);
const initialFormState = {
    // id: "",
    name: "",
    address1: "",
    address2: "",
    address3: "",
    city: "",
    state: "",
    contactNo: "",
  };
const ClientDashboard = () => {
  const [clientData, setClientData]  = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [isEdit, setIsEdit] = useState(false);
  const gridRef = useRef();

  useEffect(() => {
    api.get('/client/getAll')
      .then(response => {
        setClientData(response.data);
      })
      .catch(error => {
        console.error('API call failed:', error);
      });
  }, []);
  const [rowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ]);
  const defaultColDef = useMemo( () =>{
    return {
        filter:true
    }
  });
  const handleAdd = () => {
    setIsEdit(false);
    setFormData(initialFormState);
    setDialogOpen(true);
  };
  const handleEdit = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    if (selectedNodes.length === 0) return;

    const selected = selectedNodes[0].data;
    setFormData(selected);
    setIsEdit(true);
    setDialogOpen(true);
  };
  const handleSave = () => {
    if (isEdit) {
      setClientData((prev) =>
        prev.map((row) => (row.id === formData.id ? formData : row))
      );
      console.log('in Then ',formData)
      api.put('/client/updateClient', formData);
    } else {
        setClientData((prev) => [...prev, { ...formData, id: Date.now().toString() }]);
        api.post('/client/addClient', formData);
    }
    setDialogOpen(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [columnDefs] = useState([
    // { headerName: 'ID', field: 'id', width: 80 },
    { headerName: '', checkboxSelection: true,width: 50,pinned: 'left',sortable: false,filter: false,},
    { headerName: 'Name', field: 'name', flex: 1 },
    { headerName: 'Address 1', field: 'address1', flex: 1 },
    { headerName: 'Address 2', field: 'address2', flex: 1 },
    { headerName: 'Address 3', field: 'address3', flex: 1 },
    { headerName: 'City', field: 'city', flex: 1 },
    { headerName: 'State', field: 'state', width: 100 },
    { headerName: 'Contact No', field: 'contactNo', flex: 1 },
  ]);

  return (
    <Container sx={{ mt: 4 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Client
        </Button>
        <Button variant="outlined" onClick={handleEdit}>
          Edit Client
        </Button>
      </Stack>

      <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={clientData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="single"
          animateRows
          pagination={true}
          paginationPageSize={50}
          paginationPageSizeSelector={[10,20]}
        />
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
        <DialogTitle>{isEdit ? "Edit Client" : "Add Client"}</DialogTitle>
        <DialogContent>
          {Object.keys(initialFormState).map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
              disabled= {field === "id" && isEdit}
              suppressRowClickSelection={true}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientDashboard;
