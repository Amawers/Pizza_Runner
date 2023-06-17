import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Box, Typography, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Image from "mui-image";

const formContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between"
};

const inputFieldIcon = {
  margin: "4px",
  color: "gray",
};

const formTitleStyle = {
  marginBottom: "4px",
  fontFamily: "'Carter One', cursive",
};

const formStyle = {
  height: "215px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
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
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding:"50px"
};

const appContainerStyle = {
  height: "60vh",
  width: "100vw",
  display: "flex", 
  justifyContent:"center"
};

function AdminLogIn() {
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
    
    <ThemeProvider theme={theme} sx={{backgroundColor:"red", display: "flex", justifyContent: "center"}}>
      <Grid container component="main" sx={appContainerStyle}>
        <Paper elevation={24} sx={{display:"flex", justifyContent:"space-between", height:"400px",width:"800px"}}>
        <div style={{backgroundColor:"red", width:"60%", borderTopLeftRadius:"inherit", borderBottomLeftRadius:"inherit"}}>
            asd
        </div>
        <div style={{padding:"40px"}}>
        <Box sx={formContainerStyle}>
            <Image
              src="src\assets\logo\logo1.png"
              fit="contain"
              height="60px"
              sx={{ marginBottom: 3 }}
            />

            <Typography component="h1" variant="h6" sx={formTitleStyle}>
              Welcome Admin
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={formStyle}
            >
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
            </Box>
          </Box>
        </div>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}

export default AdminLogIn;
