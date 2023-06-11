import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
      localStorage.setItem("loginStatus", "Please log in to view the dashboard!");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return <Component />;
};

export default ProtectedRoute;
