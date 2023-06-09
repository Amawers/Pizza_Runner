import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("../components/pages/Home"));
const Runner = React.lazy(() => import("../components/pages/Runner"));
const AdminDashboard = React.lazy(() =>
  import("../components/pages/AdminDashboard")
);

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/runner" element={<Runner />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
