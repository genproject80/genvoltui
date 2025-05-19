import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar open={open} setOpen={setOpen} />
      <div style={{ flexGrow: 1 }}>
        <Header user={user} toggleSidebar={() => setOpen(!open)} />
        <main style={{ padding: '20px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
