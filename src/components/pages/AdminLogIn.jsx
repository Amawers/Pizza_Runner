import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Box, Typography, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Image from 'mui-image'



const formContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
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
};

const appContainerStyle = {
    height: "500px",
    width: "1000px",
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
        default: "black", // Set the default background color to black
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={appContainerStyle}
      >
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://cottageinn.com/app/uploads/2020/10/life-pizza-meme.png)", // CHANGE
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          elevation={24}
          component={Paper}

        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={24}
          square
          sx={loginSide}
        >
          <Box sx={formContainerStyle}>
          <Image src="src\assets\logo\logo1.png" fit="contain" height="60px" sx={{ marginBottom: 3 }}/>

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
                error={
                  error &&
                  (user === "" ||
                    error === "Invalid username!" ||
                    error === "Invalid password!")
                }
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
                error={
                  error &&
                  (pass === "" ||
                    error === "Invalid password!" ||
                    error === "Invalid username!")
                }
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
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AdminLogIn;
