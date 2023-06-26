import Modal from '@mui/material/Modal';

import { Paper, Box, Typography, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Image from "mui-image";
import Link from "@mui/material/Link";
import "../../styling/Home.css";
import DvrIcon from '@mui/icons-material/Dvr';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
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
  backgroundColor: "#126925",
  "&:hover": {
    backgroundColor: "#3d8d48", // Change this value to the lighter color you desire
  },
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
  height: "440px",
  border: '2px solid #000',
  boxShadow: 24,
  bgcolor: 'background.paper',
  borderRadius:"15px"
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};



export default function CustomerLoginModal({ openA, handleClose }) {
    const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleHomeNav = () => {
    navigate("/");
  };
  const handleAdminLogIn = () => {
    navigate("/AdminLogIn");
  };

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
      var url = "http://localhost/login-customer.php";
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
            localStorage.setItem("customerId", response[0].customer_id); // Store the customer_id
            setIsLoggedIn(true); // Set the isLoggedIn state to true
            navigate("/CustomerDashboard"); // Navigate to the CustomerDashboard

          }
        })
        .catch((err) => {
          setError("Invalid input. Please enter valid credentials.");
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
        default: "black", // Set the default background color to black
      },
    },
  });
  return (
    <Modal
      open={openA}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={loginSide}>
          <Image src="src\assets\logo\logo1.png" fit="contain" height="40px" />

          <Typography component="h1" variant="h6" sx={formTitleStyle}>
            Welcome Customer!
          </Typography>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "160px",
              justifyContent: "space-around",
            }}
          >
            <div style={{ height: "75px" }}>
              <TextField
                error={Boolean(
                  error &&
                    (user === "" ||
                      error === "Invalid username!" ||
                      error === "Invalid password!")
                )}
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
            </div>
            <div style={{ height: "75px" }}>
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
            </div>
          </div>
          <div style={{margin: "5px"}}>
            <Button
              variant="contained"
              color="error"
              sx={formButtonStyle}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </div>
        </Paper>
    </Modal>
  );
}
//////////////////////////////////////
//////////////////////////////////////

////////////////////////////////////
////////////////////////////////////