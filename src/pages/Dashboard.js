import React,{useEffect, useState } from 'react';
import { Box } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import api from '../Api';

function Dashboard() {
  const [user, setUser] = useState('');
  useEffect(() => {
    api.get('/signeduser/getdetails')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('API call failed:', error);
      });
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Fixed Header */}
      <Header user={user} />

      {/* Sidebar & Main Content */}
      <Box sx={{ display: "flex", marginTop: "64px" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, padding: "20px" }}>
          <Outlet /> {/* Dynamic content loads here! */}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
