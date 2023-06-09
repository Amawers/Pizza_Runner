import * as React from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <Stack spacing={2} direction="row">
      <Link to="/runner">
        <Button variant="text">Runner</Button>
      </Link>
      <Button variant="contained">Customer</Button>
      <Link to="/AdminDashboard">
        <Button variant="outlined">Log in as Admin</Button>
      </Link>
    </Stack>
  );
}
