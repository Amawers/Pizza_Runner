import Modal from '@mui/material/Modal';

import { Paper, Box, Typography, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Image from "mui-image";
import Link from "@mui/material/Link";
import "../../styling/Home.css";


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const inputFieldIcon = {
  margin: "4px",
  color: "gray",
};

const formTitleStyle = {
  fontFamily: "'Carter One', cursive",
  margin: "5px"
};

const formInputStyle = {
  required: true,
};

const formButtonStyle = {
  type: "submit",
  fullWidth: true,
  variant: "contained",
};

const errorTextStyle = {
  color: "red",
};
const loginSide = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "320px",
  height: "370px",
  border: '2px solid #000',
  boxShadow: 24,
  bgcolor: 'background.paper'
};

function AdminLogIn({openAdmin, handleAdminClose}) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");


  useEffect(() => {
    let loginStatus = localStorage.getItem("loginStatus");
    if (loginStatus) {
      setError(loginStatus);
      setTimeout(function () {
        localStorage.clear();
        window.location.reload();
      }, 3000);
    }
    setTimeout(function () {
      setMsg("");
    }, 5000);
  }, [msg]);

  const handleInputChange = (e, type) => {
    setError("");
    if (type === "user") {
      setUser(e.target.value);
    } else if (type === "pass") {
      setPass(e.target.value);
    }
  };

  function loginSubmit() {
    if (user !== "" && pass !== "") {
      var url = "http://localhost/login.php";
      var headers = {
        "Content-Type": "application/json",
      };
      var Data = {
        user: user,
        pass: pass,
      };
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (
            response[0].result === "Invalid username!" ||
            response[0].result === "Invalid password!"
          ) {
            setError(response[0].result);
          } else {
            setMsg(response[0].result);
            localStorage.setItem("login", true);
            navigate("/AdminDashboard", { replace: true });
          }
        })
        .catch((err) => {
          setError(err.toString());
          console.log(err);
        });
    } else {
      setError("All fields are required!");
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    loginSubmit();
  };

  const theme = createTheme({
    palette: {
      background: {
        default: "red", // Set the default background color to black
      },
    },
  });

  return (
    <Modal
    openAdmin={openAdmin}
      onClose={handleAdminClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <Paper elevation={24} sx={{display:"flex", justifyContent:"space-between", height:"400px",width:"800px"}}>

            <Typography component="h1" variant="h6" sx={formTitleStyle}>
              Welcome Admin
            </Typography>

              <TextField
                error={Boolean(
                  error &&
                    (user === "" ||
                      error === "Invalid username!" ||
                      error === "Invalid password!")
                )}
                id="username"
                label="Email"
                name="username"
                value={user}
                onChange={(e) => handleInputChange(e, "user")}
                helperText={
                  error &&
                  (user === "" ||
                    error === "Invalid username!" ||
                    error === "Invalid password!") &&
                  "Incorrect entry."
                }
                sx={formInputStyle}
                InputProps={{
                  endAdornment: <AlternateEmailIcon sx={inputFieldIcon} />,
                }}
              />

              <TextField
                error={Boolean(
                  error &&
                    (user === "" ||
                      error === "Invalid username!" ||
                      error === "Invalid password!")
                )}
                name="password"
                label="Password"
                type="password"
                id="password"
                value={pass}
                onChange={(e) => handleInputChange(e, "pass")}
                helperText={
                  error &&
                  (pass === "" ||
                    error === "Invalid password!" ||
                    error === "Invalid username!") &&
                  "Incorrect entry."
                }
                sx={formInputStyle}
                InputProps={{
                  endAdornment: <LockOutlinedIcon sx={inputFieldIcon} />,
                }}
              />

              <Button
                variant="contained"
                color="error"
                sx={formButtonStyle}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              {error && (
                <Typography variant="body2" color="error" sx={errorTextStyle}>
                  {error}
                </Typography>
              )}
        </Paper>
        </Modal>
  );
}

export default AdminLogIn;
