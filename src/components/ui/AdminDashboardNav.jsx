import React from 'react';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

function AdminDashboardNav() {
  return (
    <Container fixed style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <HomeIcon fontSize="small" style={{ color: '#6c757d' }} />
          <span style={{ marginLeft: '10px', color: '#6c757d', fontSize: '14px', fontWeight: 'bold' }}>Dashboard</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '60px'}}>
          <AccountCircleIcon fontSize="small" style={{ color: '#6c757d' }} />
          <SettingsIcon fontSize="small" style={{ color: '#6c757d' }} />
      </div>
    </Container>
  );
}

export default AdminDashboardNav;
