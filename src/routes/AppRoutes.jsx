import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import Runner from "../components/pages/Runner";
import AdminLogIn from "../components/pages/AdminLogIn";
import AdminDashboard from "../components/pages/AdminDashboard";
import ProtectedRoute from "../components/pages/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/runner" element={<Runner />} />
        <Route path="/AdminLogIn" element={<AdminLogIn />} />
        <Route
          path="/AdminDashboard"
          element={<ProtectedRoute component={AdminDashboard} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
