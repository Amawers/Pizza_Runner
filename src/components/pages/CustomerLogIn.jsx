import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Box, Typography, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Image from "mui-image";

import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import bgImage from "../../assets/images/bg-home.png";
import "../../styling/Home.css";


const inputFieldIcon = {
  margin: "4px",
  color: "gray",
};

const formTitleStyle = {
  marginBottom: "4px",
  fontFamily: "'Carter One', cursive",
};

const formInputStyle = {
  margin: "normal",
  required: true,
  fullWidth: true,
};

const formButtonStyle = {
  type: "submit",
  fullWidth: true,
  variant: "contained",
  marginTop: "12px",
  marginBottom: "8px",
};

const errorTextStyle = {
  color: "red",
  marginTop: "0.5rem",
};
const loginSide = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "300px",
  margin: "auto",
  padding: "40px"
};


const appContainerStyle = {
  height: "100vh",
  width: "100vw",
  backgroundColor: "blue",
  display: "flex",
  justifyContent: "center",
};

function CustomerLogIn() {
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
            navigate("/CustomerDashboard", { replace: true });
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
        default: "black", // Set the default background color to black
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
       <div className="back">
        <Image
          src="src\assets\logo\logo-pizzarunner.png"
          fit="contain"
          height="50px"
          sx={{ paddingRight: "100px" }}
        />
      </div>
      <div className="arrow" />
      <AppBar  sx={{ backgroundColor: "black" }}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Stack
            spacing={2}
            direction="row"
            sx={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <Button
              color="inherit"
              sx={{
                fontFamily: "Carter One, cursive",
                color: "#BA110C",
                backgroundColor: "white"
              }}
            >
              HOME
            </Button>
            <Button
              color="inherit"
              sx={{
                fontFamily: "Carter One, cursive",
                color: "#FFF6E6"
              }}
            >
              ABOUT US
            </Button>
            <Button
              color="inherit"
              sx={{
                fontFamily: "Carter One, cursive",
                color: "#FFF6E6"
              }}
            >
              CONTACT INFO
            </Button>
          </Stack>
          <Stack spacing={2} direction="row">
            <Button
              color="inherit"
              sx={{
                fontFamily: "Carter One, cursive",
                color: "black",
                background: "linear-gradient(#9B8B6E, #FFF6E6)",
              }}
            >
              LOG IN
            </Button>
            <Button
              color="inherit"
              sx={{
                fontFamily: "Carter One, cursive",
                color: "black",
                background: "linear-gradient(#9B8B6E, #FFF6E6)",
              }}
            >
              REGISTER
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Grid container component="main" sx={appContainerStyle}>
        <Paper
          sx={loginSide}
        >
            <Image
              src="src\assets\logo\logo1.png"
              fit="contain"
              height="60px"
              sx={{ marginBottom: 3 }}
            />

            <Typography component="h1" variant="h6" sx={formTitleStyle}>
              Welcome Customer!
            </Typography>
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
      </Grid>
    </ThemeProvider>
  );
}

export default CustomerLogIn;
