import AnchorLink from "react-anchor-link-smooth-scroll";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import bgImage from "../../assets/images/bg-home.png";
import "../../styling/Home.css";
import { Paper } from "@mui/material";
import Image from "mui-image";
import React, { useState } from "react";
import CustomerLogin from "../pages/CustomerLogIn";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AdminLogIn from "../pages/AdminLogIn";


function Home() {
  const [activeSection, setActiveSection] = useState("course");
  const [open, setOpen] = useState(false); // State variable for modal visibility
  const [openAdmin, setOpenAdmin] = useState(false); // State variable for modal visibility


  const [age, setAge] = React.useState('');


  
  const handleChange = (event) => {
    setAge(event.target.value);
  };

    const handleCustomerLogin = () => {
      console.log("Login clicked!");
      setOpen(true); // Open the modal directly
    };

    const handleAdminLogin = () => {
      console.log("Login clicked!");
      setOpenAdmin(true); // Open the modal directly
    };

  const handleLinkClick = (section) => {
    setActiveSection(section);
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
      <div>
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "black", width: "100vw" }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "160px",
                fontFamily: "Carter One, cursive",
                color: "#FFF6E6",
                width:"220px"
              }}
            >
              Runner Pizza
            </div>
            <div>
              <AnchorLink href="#course">
                <Button
                  color={activeSection === "course" ? "primary" : "inherit"}
                  onClick={() => handleLinkClick("course")}
                  sx={{
                    fontFamily: "Carter One, cursive",
                    color: activeSection === "course" ? "#BA110C" : "#FFF",
                    backgroundColor:
                      activeSection === "course" ? "white" : "transparent",
                  }}
                >
                  HOME
                </Button>
              </AnchorLink>
              <AnchorLink href="#article">
                <Button
                  color={activeSection === "article" ? "primary" : "inherit"}
                  onClick={() => handleLinkClick("article")}
                  sx={{
                    fontFamily: "Carter One, cursive",
                    color:
                      activeSection === "article" ? "#BA110C" : "#FFF6E6",
                    backgroundColor:
                      activeSection === "article" ? "white" : "transparent",
                  }}
                >
                  ABOUT US
                </Button>
              </AnchorLink>
              <AnchorLink href="#contact">
                <Button
                  color={activeSection === "contact" ? "primary" : "inherit"}
                  onClick={() => handleLinkClick("contact")}
                  sx={{
                    fontFamily: "Carter One, cursive",
                    color:
                      activeSection === "contact" ? "#BA110C" : "#FFF6E6",
                    backgroundColor:
                      activeSection === "contact" ? "white" : "transparent",
                  }}
                >
                  CONTACT INFO
                </Button>
              </AnchorLink>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "220px"
              }}
            >
              
              <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              fontFamily: "Carter One, cursive",
              color: "black",
              background: "linear-gradient(#9B8B6E, #FFF6E6)",
              height:"40px",
              fontSize:"14px"
            }}
          >
            <MenuItem value="">
              <em>LOGIN</em>
            </MenuItem>
            <MenuItem onClick={handleCustomerLogin} value={10}>Customer</MenuItem>
            <MenuItem onClick={handleAdminLogin}value={20}>Admin</MenuItem>
          </Select>

              <Button
                color="inherit"
                sx={{
                  fontFamily: "Carter One, cursive",
                  color: "black",
                  background: "linear-gradient(#9B8B6E, #FFF6E6)",
                  height:"40px",
                  fontSize:"14px"

                }}
              >
                REGISTER
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div
        className="background-image"
        id="course"
        style={{
          backgroundImage: `url(${bgImage})`,
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh", // Set the height of the container
          }}
        >
          <Paper
            elevation={12}
            sx={{
              width: "400px",
              height: "280px",
              display: "flex",
              justifyContent: "space-between",
              margin: "-10px",
            }}
          >
            <div
              style={{
                width: "200px",
                backgroundColor: "#FFF6E6",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                src="src\assets\images\meat.png"
                fit="contain"
                sx={{ marginTop: "-50px" }}
              />
              <Button
                variant="contained"
                sx={{
                  marginTop: "-70px",
                  width: "100px",
                  backgroundColor: "#126925",
                  fontWeight: "bold",
                }}
              >
                Order
              </Button>
            </div>
            <div
              style={{
                backgroundColor: "#126925",
                width: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Yellowtail, cursive",
                  color: "white",
                  textAlign: "center",
                  transform: "rotate(-10deg)",
                  transformOrigin: "center",
                }}
              >
                PIZZA 1
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Carter One, cursive",
                  color: "white",
                  fontSize: "24px",
                  textAlign: "center",
                }}
              >
                MEAT LOVERS PIZZA
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Trocchi, serif",
                  color: "white",
                  fontSize: "12px",
                  textAlign: "justify",
                  padding: "10px",
                }}
              >
                Every Meat Lover's pizza is fully loaded with pepperoni, Italian
                sausage, ham, bacon, seasoned pork & beef only, Italian sausage,
                ham, bacon, seasoned pork & beef.
              </Typography>
            </div>
          </Paper>
          <div style={{}}>
            <Image
              src="src\assets\images\test.png"
              fit="contain"
              height="340px"
            />
          </div>
          <Paper
            elevation={12}
            sx={{
              width: "400px",
              height: "280px",
              display: "flex",
              justifyContent: "space-between",
              margin: "-12px",
            }}
          >
            <div
              style={{
                width: "200px",
                backgroundColor: "#FFF6E6",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                src="src\assets\images\vegetarian.png"
                fit="contain"
                sx={{ marginTop: "-50px" }}
              />
              <Button
                variant="contained"
                sx={{
                  marginTop: "-70px",
                  width: "100px",
                  backgroundColor: "#126925",
                  fontWeight: "bold",
                }}
              >
                Order
              </Button>
            </div>
            <div
              style={{
                backgroundColor: "#126925",
                width: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Yellowtail, cursive",
                  color: "white",
                  textAlign: "center",
                  transform: "rotate(-10deg)",
                  transformOrigin: "center",
                }}
              >
                PIZZA 2
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Carter One, cursive",
                  color: "white",
                  fontSize: "24px",
                  textAlign: "center",
                }}
              >
                VEGETARIAN PIZZA
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Trocchi, serif",
                  color: "white",
                  fontSize: "12px",
                  textAlign: "justify",
                  padding: "10px",
                }}
              >
                Vegetarian pizza features the same cheeses, seasonings, and
                sauces that regular pizza has, though the meat is replaced with
                vegetables and meat substitutes.
              </Typography>
            </div>
          </Paper>
        </div>
      </div>
      <div
        id="article"
        style={{ backgroundColor: "red", height: "720px", width: "100vw" }}
      >
        Let's Read some Articles
      </div>
      <div
        id="contact"
        style={{ backgroundColor: "green", height: "720px", width: "100vw" }}
      >
        Let's Read some Articles
      </div>
      <CustomerLogin open={open} handleClose={() => setOpen(false)} />
      <AdminLogIn openAdmin={openAdmin} handleAdminClose={() => setAdminOpen(false)} />

    </ThemeProvider>
  );
}
export default Home;
