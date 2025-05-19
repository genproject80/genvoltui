import { Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button BELOW Header */}
      <IconButton onClick={() => setIsOpen(!isOpen)} sx={{ position: "fixed", left: "10px", top: "70px" }}>
        <MenuIcon fontSize="large" />
      </IconButton>

      {/* Sidebar */}
      <Drawer 
        variant="persistent" 
        anchor="left" 
        open={isOpen} 
        onMouseLeave={() => setIsOpen(false)}
        sx={{
          width: isOpen ? "250px" : "0px",
          "& .MuiDrawer-paper": { width: "250px", marginTop: "64px", transition: "0.3s" },
        }}
      >
        <List>
          <ListItem button component={Link} to="clientDashboard">
            <ListItemText primary="Client Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="settings">
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Sidebar;
