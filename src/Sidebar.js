import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Settings', path: '/settings' },
  ];

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={() => setOpen(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => {
            navigate(item.path);
            setOpen(false);
          }}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
