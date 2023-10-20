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
import CustomerRegistration from "../pages/CustomerRegistration";
import CustomerLogin from "../pages/CustomerLogIn";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AdminLogIn from "../pages/AdminLogIn";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import ReactDOM from "react-dom";
import { Carousel } from "@trendyol-js/react-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import logoOne from "../../assets/logo/logo1.png";

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#course"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function Home(props) {
  const [activeSection, setActiveSection] = useState("course");
  const [openA, setOpen] = useState(false); // State variable for modal visibility
  const [openAdmin, setAdminOpen] = useState(false); // State variable for modal visibility
  const [openRegistration, setRegistrationOpen] = useState(false); // State variable for modal visibility

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleCustomerRegistration = () => {
    console.log("Registration Ongoing!");
    setRegistrationOpen(true); // Open the modal directly
  };

  const handleCustomerLogin = () => {
    console.log("Login clicked!");
    setOpen(true); // Open the modal directly
  };

  const handleAdminLogin = () => {
    console.log("Login clicked!");
    setAdminOpen(true); // Open the modal directly
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
      <AppBar
        position="sticky"
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
              width: "200px",
            }}
          >
          <Image sx={{padding:"5px"}} src={logoOne} fit="contain" height="40px" />

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
                  color: activeSection === "article" ? "#BA110C" : "#FFF6E6",
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
                  color: activeSection === "contact" ? "#BA110C" : "#FFF6E6",
                  backgroundColor:
                    activeSection === "contact" ? "white" : "transparent",
                }}
              >
                QUERIES
              </Button>
            </AnchorLink>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "220px",
            }}
          >
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                fontFamily: "Carter One, cursive",
                color: "black",
                background: "linear-gradient(#9B8B6E, #FFF6E6)",
                height: "40px",
                fontSize: "14px",
              }}
            >
              <MenuItem value="">
                <em>LOGIN</em>
              </MenuItem>
              <MenuItem onClick={handleCustomerLogin} value={10}>
                Customer
              </MenuItem>
              <MenuItem onClick={handleAdminLogin} value={20}>
                Admin
              </MenuItem>
            </Select>

            <Button
              color="inherit"
              sx={{
                fontFamily: "Carter One, cursive",
                color: "black",
                background: "linear-gradient(#9B8B6E, #FFF6E6)",
                height: "40px",
                fontSize: "14px",
              }}
              onClick={handleCustomerRegistration}
            >
              REGISTER
            </Button>
          </div>
        </Toolbar>
      </AppBar>
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
                  fontWeight: "bold",
                  backgroundColor:"#126925"
                }}
                onClick={() => {
                  localStorage.setItem('selectedOrder', 1);
                  handleCustomerLogin();
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#0F4A1F"}
  onMouseLeave={(e) => e.target.style.backgroundColor = "#126925"}
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
          <div style={{marginLeft:"-5px"}}>
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
                  fontWeight: "bold",
                  backgroundColor:"#126925"
                }}
                onClick={() => {
                  localStorage.setItem('selectedOrder', 2);
                  handleCustomerLogin();
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#0F4A1F"}
  onMouseLeave={(e) => e.target.style.backgroundColor = "#126925"}
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
        style={{
          background: "#FFF6E6",
          height: "100vh", // Set the height of the container to cover the whole page
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          style={{
            backgroundColor: "#126925",
            zIndex: "69",
            width: "1100px",
            height: "1260px", // Adjust the height as needed
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "calc(100vh - 130px)",
          }}
        >
          <div
            style={{
              width: "1100px",
              height: "620px",
              marginTop: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "400px",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                margin: "7px",
              }}
            >
              <Paper
                elevation={12}
                style={{
                  width: "350px",
                  height: "150px",
                  backgroundColor: "#FFF6E6",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Carter One, cursive",
                    color: "black",
                    fontSize: "24px",
                    padding: "10px",
                    paddingBottom: "0px",
                  }}
                >
                  Meet the team!
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Arial, cursive",
                    color: "black",
                    fontSize: "12px",
                    textAlign: "justify",
                    padding: "10px",
                  }}
                >
                  This is the final requirement for our subjects: Web Systems
                  and Technologies, and Information Management. It involves
                  integrating the front-end and backend applications based on
                  the case study of Pizza Runner.
                </Typography>
              </Paper>
              <div style={{ position: "relative", backgroundColor: "violet" }}>
                <Paper
                  elevation={12}
                  sx={{
                    width: "150px",
                    height: "150px",
                    position: "absolute",
                    zIndex: 2,
                    marginTop: "-15px",
                    marginLeft: "15px",
                    backgroundColor: "#126925",
                  }}
                >
                  <Image src="src\assets\images\kenneth.jpg" fit="cover" />
                </Paper>
                <Paper
                  elevation={12}
                  sx={{
                    width: "400px",
                    height: "150px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end", // Changed from "flex-start"
                    justifyContent: "center",
                    backgroundColor: "#FFF6E6",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Carter One, cursive",
                      color: "black",
                      fontSize: "14px",
                      padding: "10px",
                      paddingBottom: "0px",
                    }}
                  >
                    Kenneth Jhun N. Balino
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Arial, cursive",
                      color: "black",
                      fontSize: "12px",
                      padding: "10px",
                    }}
                  >
                    IT2R1
                  </Typography>
                </Paper>
              </div>
            </div>
            <div
              style={{
                margin: "7px",
                width: "400px",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div style={{ position: "relative", backgroundColor: "violet" }}>
                <Paper
                  elevation={12}
                  sx={{
                    width: "150px",
                    height: "150px",
                    position: "absolute",
                    zIndex: 2,
                    marginTop: "-15px",
                    marginLeft: "15px",
                    backgroundColor: "#126925",
                  }}
                >
                  <Image src="src\assets\images\michole.jpg" fit="cover" />
                </Paper>
                <Paper
                  elevation={12}
                  sx={{
                    width: "400px",
                    height: "150px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end", // Changed from "flex-start"
                    justifyContent: "center",
                    backgroundColor: "#FFF6E6",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Carter One, cursive",
                      color: "black",
                      fontSize: "14px",
                      padding: "10px",
                      paddingBottom: "0px",
                    }}
                  >
                    Michole Angelo A. Catublas
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Arial, cursive",
                      color: "black",
                      fontSize: "12px",
                      padding: "10px",
                    }}
                  >
                    IT2R1
                  </Typography>
                </Paper>
              </div>

              <div style={{ position: "relative", backgroundColor: "violet" }}>
                <Paper
                  elevation={12}
                  sx={{
                    width: "150px",
                    height: "150px",
                    position: "absolute",
                    zIndex: 2,
                    marginTop: "-15px",
                    marginLeft: "15px",
                    backgroundColor: "#126925",
                  }}
                >
                  <Image src="src\assets\images\christian.jpg" fit="cover" />
                </Paper>
                <Paper
                  elevation={12}
                  sx={{
                    width: "400px",
                    height: "150px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end", // Changed from "flex-start"
                    justifyContent: "center",
                    backgroundColor: "#FFF6E6",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Carter One, cursive",
                      color: "black",
                      fontSize: "14px",
                      padding: "10px",
                      paddingBottom: "0px",
                    }}
                  >
                    Christian Jericho A. Dacoroon
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Arial, cursive",
                      color: "black",
                      fontSize: "12px",
                      padding: "10px",
                    }}
                  >
                    IT2R1
                  </Typography>
                </Paper>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "",
              width: "1100px",
              height: "620px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection:"column",
                alignItems: "center",
                justifyContent: "center",
                width: "1100px",
                height: "450px",
                backgroundColor: "",
                marginTop:"90px"
              }}
            ><Typography
            sx={{
              fontFamily: "Carter One, cursive",
              color: "white",
              fontSize: "26px",
              padding: "10px"
            }}
          >
            DATABASE QUERIES AND ERD MODEL
          </Typography>
              <Carousel
                show={2}
                slide={2}
                transition={0.5}
                rightArrow={
                  <ArrowForwardIosIcon
                    style={{
                      marginTop: "160px",
                      fontSize: 40,
                      color: "white",
                      alignSelf: "center"
                    }}
                  />
                }
                leftArrow={
                  <ArrowBackIosNewIcon
                    style={{
                      marginTop: "160px",
                      fontSize: 40,
                      color: "white",
                      alignSelf: "center"
                    }}
                  />
                }
              >
  <Image
                src="src\assets\images\erd.png"
                fit="cover"
              />
                    <Image
                src="src\assets\images\query1.png"
                fit="cover"
              />
                 <Image
                src="src\assets\images\query2.png"
                fit="cover"
              />
                 <Image
                src="src\assets\images\query3.png"
                fit="cover"
              />
                <Image
                src="src\assets\images\query4.png"
                fit="cover"
              />
                <Image
                src="src\assets\images\query5.png"
                fit="cover"
              />
              </Carousel>
            </div>
          </div>
        </Paper>
      </div>
      <div
        id="contact"
        style={{
          backgroundColor: "#FFF6E6",
          height: "100vh", // Set the height of the container to cover the whole page
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
      <ScrollTop {...props}>
        <Fab
          size="small"
          aria-label="scroll back to top"
          style={{ color: "#FFF6E6", backgroundColor: "#126925"}}
        >
          <KeyboardArrowUpIcon style={{ color: "#FFF6E6", border:"none" }} />
        </Fab>
      </ScrollTop>

      <CustomerLogin openA={openA} handleClose={() => setOpen(false)} />
      <AdminLogIn
        openAdmin={openAdmin}
        handleAdminClose={() => setAdminOpen(false)}
      />
    <CustomerRegistration openRegistration={openRegistration} handleRegistrationClose={() => setRegistrationOpen(false)} />
    </ThemeProvider>
  );
}
export default Home;

////////////////////////////////////////////////
//////////////////////////////////////////////

////////////////////////////////////////////
////////////////////////////////////////

/////////////*******************888888888 */
