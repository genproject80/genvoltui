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
    Select, MenuItem, InputLabel
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
    clientParentId: "",
  };
const ClientDashboard = () => {
  const [clientData, setClientData]  = useState([]);
  const [selected, setSelected] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [isEdit, setIsEdit] = useState(false);
  const gridRef = useRef();
  const getParentName =(data,client)=>{
    console.log('getParentName.client',client)
    console.log('getParentName.data',data)
    const parent = data.find(e=>e.id===client.clientParentId);
    console.log('return name',parent)
    //return data.filter(e=>e.id===client.clientParentId).name;
    return parent ? parent.name : null
  }
  useEffect(() => {
    api.get('/client/getAll')
      .then(response => {
        const dataWithParentName = response.data.map((obj)=>({
          ...obj,
          parentName:getParentName(response.data,obj)
        }))
        setClientData(dataWithParentName);
        
      })
      .catch(error => {
        console.error('API call failed:', error);
      });
  }, []);
  const defaultColDef = useMemo( () =>{
    return {
        filter:true
    }
  });
  const handleAdd = () => {
    setIsEdit(false);
    setSelected(initialFormState);
    setFormData(initialFormState);
    setDialogOpen(true);
  };
  const handleEdit = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    console.log('handleEdit',selectedNodes)
    if (selectedNodes.length === 0) return;

    const selected = selectedNodes[0].data;
    console.log('selected->',selected)
    setSelected(selected)
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
        console.log('handleSave Else formData ',formData)
        setClientData((prev) => [...prev, { ...formData, 
          id: Date.now().toString(),
          parentName:getParentName(clientData,formData)
          }]);//parentName:getParentName(clientData,prev)
        api.post('/client/addClient', formData);
    }
    setDialogOpen(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  /*
  const handleChangeClient = (event) => {
    setSelected(event.target.value);
  };
  */
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
    { headerName: 'Parent', field: 'parentName', flex: 1 }
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
          {Object.keys(initialFormState).filter(f=>f!='clientParentId').map((field) => (
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
          <InputLabel id="dropdown-label">Select Parent</InputLabel>
            <Select
                labelId="dropdown-label"
                name="clientParentId"
                value={formData.clientParentId}
                label="Select Parent"
                onChange={handleChange}
                sx={{ width: 540 }} 
            >
                {clientData.filter(f=>f.id != selected.id).map(obj => (
                <MenuItem key={obj.id} value={obj.id}>
                    {obj.name}
                </MenuItem>
                ))}
            </Select>
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
