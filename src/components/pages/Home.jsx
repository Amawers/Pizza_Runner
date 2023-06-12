import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Home() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate("/AdminLogIn");
  };

  const handleCustomerLogin = () => {
    navigate("/CustomerLogin");
  };


  return (
    <>
      <Stack spacing={2} direction="row">
        <Link to="/runner">
          <Button variant="text">Runner</Button>
        </Link>
        <Button variant="contained" onClick={handleCustomerLogin}>Customer</Button>
        <Button variant="outlined" onClick={handleAdminLogin}>
          Log in as Admin
        </Button>
      </Stack>
    </>
  );
}
