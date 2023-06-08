import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

const Home = React.lazy(() => import('../components/pages/Home'));
const Runner = React.lazy(() => import('../components/pages/Runner'));
const LogInAdmin = React.lazy(() => import('../components/pages/LogInAdmin'));

export default function AppRoute() {
  const navigate = useNavigate();

  // Function to handle successful login and redirect to admin dashboard
  const handleLoginSuccess = () => {
    navigate('/admin-dashboard');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/runner" element={<Runner />} />
        <Route path="/login-admin" element={<LogInAdmin onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
