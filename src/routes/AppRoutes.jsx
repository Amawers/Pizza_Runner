import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import Runner from "../components/pages/Runner";
import CustomerLogIn from "../components/pages/CustomerLogIn";
import AdminLogIn from "../components/pages/AdminLogIn";
import AdminDashboard from "../components/pages/AdminDashboard";
import ProtectedRoute from "../components/pages/ProtectedRoute";
import CustomerDashboard from "../components/pages/CustomerDashboard";
import OrderPizza from "../components/ui/OrderPizza";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/runner" element={<Runner />} />
        <Route path="/CustomerLogIn" element={<CustomerLogIn />} />
        <Route path="/AdminLogIn" element={<AdminLogIn />} />
        <Route
          path="/AdminDashboard"
          element={<ProtectedRoute component={AdminDashboard} />}
        />
        <Route
          path="/CustomerDashboard"
          element={<ProtectedRoute component={CustomerDashboard} />}
        />
        <Route
          path="/OrderPizza"
          element={<ProtectedRoute component={OrderPizza} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
