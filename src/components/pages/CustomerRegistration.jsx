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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';

const inputFieldIcon = {
  margin: "4px",
  color: "gray",
};

const formTitleStyle = {
  fontFamily: "'Carter One', cursive",
  margin: "20px",
};

const formInputStyle = {
  required: true,
  margin: "20px",
};

const formButtonStyle = {
  type: "submit",
  fullWidth: true,
  variant: "contained",
  backgroundColor: "#126925",
  "&:hover": {
    backgroundColor: "#3d8d48",
  },
  margin: "20px",
};

const errorTextStyle = {
  color: "red",
  margin: "20px",
};

const registrationSide = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "320px",
  height: "520px",
  border: '2px solid #000',
  boxShadow: 24,
  bgcolor: 'background.paper',
  borderRadius: "15px",
  margin: "20px",
};

export default function CustomerRegistration({ openRegistration, handleRegistrationClose }) {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleHomeNav = () => {
    navigate("/");
  };
  const handleCustomerLogIn = () => {
    navigate("/CustomerLogIn");
  };

  useEffect(() => {
    setTimeout(() => {
      setMsg("");
    }, 5000);
  }, [msg]);

  const handleInputChange = (e, type) => {
    setError("");
    if (type === "id") {
      setId(e.target.value);
    } else if (type === "name") {
      setName(e.target.value);
    } else if (type === "email") {
      setEmail(e.target.value);
    } else if (type === "pass") {
      setPass(e.target.value);
    }
  };

  function registerSubmit() {
    if (id !== "" && name !== "" && email !== "" && pass !== "") {
      const url = "http://localhost/register-customer.php";
      const headers = {
        "Content-Type": "application/json",
      };
      const data = {
        id: id,
        name: name,
        email: email,
        pass: pass,
      };
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            setError(response.error);
          } else {
            setMsg(response.message);
            setId("");
            setName("");
            setEmail("");
            setPass("");
          }
        })
        .catch((err) => {
          setError("An error occurred. Please try again.");
          console.log(err);
        });
    } else {
      setError("All fields are required!");
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    registerSubmit();
  };

  const theme = createTheme({
    palette: {
      background: {
        default: "black",
      },
    },
  });

  return (
    <Modal
      open={openRegistration}
      onClose={handleRegistrationClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={registrationSide}>
        <Image src="src\assets\logo\logo1.png" fit="contain" height="35px" />
        <div style={{marginBottom:"20px"}}>
        <Typography component="h1" variant="h6" sx={formTitleStyle}>
          Customer Registration
        </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "200px",
            justifyContent: "space-around",
          }}
        >
          <div style={{ height: "75px" }}>
            <TextField
              error={Boolean(error && id === "")}
              label="ID"
              name="id"
              value={id}
              onChange={(e) => handleInputChange(e, "id")}
              helperText={error && id === "" && "Incorrect entry."}
              sx={formInputStyle}
              InputProps={{
                endAdornment: <Grid3x3Icon sx={inputFieldIcon} />,
              }}
            />
          </div>
          <div style={{ height: "75px" }}>
            <TextField
              error={Boolean(error && name === "")}
              label="Name"
              name="name"
              value={name}
              onChange={(e) => handleInputChange(e, "name")}
              helperText={error && name === "" && "Incorrect entry."}
              sx={formInputStyle}
              InputProps={{
                endAdornment: <AccountCircleIcon sx={inputFieldIcon} />,
              }}
            />
          </div>
          <div style={{ height: "75px" }}>
            <TextField
              error={Boolean(error && (email === "" || error === "Email is already taken!"))}
              label="Email"
              name="email"
              value={email}
              onChange={(e) => handleInputChange(e, "email")}
              helperText={
                error &&
                (email === "" || error === "Email is already taken!") &&
                "Incorrect entry."
              }
              sx={formInputStyle}
              InputProps={{
                endAdornment: <AlternateEmailIcon sx={inputFieldIcon} />,
              }}
            />
          </div>
          <div style={{ height: "75px"}}>
            <TextField
              error={Boolean(error && pass === "")}
              name="password"
              label="Password"
              type="password"
              value={pass}
              onChange={(e) => handleInputChange(e, "pass")}
              helperText={error && pass === "" && "Incorrect entry."}
              sx={formInputStyle}
              InputProps={{
                endAdornment: <LockOutlinedIcon sx={inputFieldIcon} />,
              }}
            />
          </div>
        </div>
        <div style={{ marginTop: "55px" }}>
          <Button
            variant="contained"
            color="error"
            sx={formButtonStyle}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </div>
        <div style={{ height: "15px"}}>
          {error && (
            <Typography variant="body2" color="error" sx={errorTextStyle}>
              {error}
            </Typography>
          )}
          {msg && (
            <Typography variant="body2" color="success">
              {msg}
            </Typography>
          )}
        </div>
      </Paper>
    </Modal>
  );
}
