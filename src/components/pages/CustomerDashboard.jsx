import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TableOne from "../ui/TableOne";
import TableTwo from "../ui/TableTwo";
import TableThree from "../ui/TableThree";
import TableFour from "../ui/TableFour";
import TableFive from "../ui/TableFive";
import TableSix from "../ui/TableSix";
import TableSeven from "../ui/TableSeven";
import CustomerOrder from "../ui/CustomerOrder"
import { mainListItems, secondaryListItems } from "../ui/lisitems";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg-home.png";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";

import { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AnchorLink from "react-anchor-link-smooth-scroll";
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative", // Add position: sticky
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    boxShadow: "10px 2px 4px rgba(0, 0, 0, 0.4)", // Add a slight dark shadow
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();

    const targetId = event.currentTarget.getAttribute("href"); // Use event.currentTarget instead of event.target
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        
      });
    }

    console.log("Clicked link:", targetId); // Add this line for debugging
  };

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", backgroundColor: "#FFF6E6", width: "100vw", height:"100vh"}}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ backgroundColor: "black" }}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              onClick={handleHome}
              sx={{ width: "32px", height: "32px" }}
            >
              <HomeIcon sx={{ fontSize: "28px", color: "white" }} />
            </IconButton>

            <span
              style={{ fontSize: "26px", fontWeight: "bold", margin: "10px" }}
            >
              {" "}
              /{" "}
            </span>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, fontFamily: "Carter One, cursive" }}
            >
              Customer Dashboard
            </Typography>
            <Button
              color="inherit"
              sx={{
                fontFamily: "Carter One, cursive",
                color: "black",
                background: "linear-gradient(#9B8B6E, #FFF6E6)",
                height: "40px",
                fontSize: "14px",
              }}
              onClick={handleHome}
            >
              LOGOUT
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer position="fixed" variant="permanent" open={open} sx={{height:"100vh"}}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1]
            }}
          >
            <Paper>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{
                  fontFamily: "Carter One, cursive",
                  color: "black",
                  padding: "5px",
                }}
              >
                Pizza Runner
              </Typography>
            </Paper>
            <IconButton
              onClick={toggleDrawer}
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "32px",
                backgroundColor: "black",
                padding: "0px",
                margin: "5px",
              }}
            >
              <ChevronLeftIcon
                sx={{ color: "white", fontWeight: "bold", fontSize: "32px" }}
              />
            </IconButton>
          </Toolbar>

          <Paper sx={{ margin: "10px" }}>
            <List component="nav">
              <AnchorLink href="#customerorder" onClick={handleClick}>
                <ListItemButton>
                  <ListItemIcon>
                    <LocalPizzaIcon />
                  </ListItemIcon>
                  <ListItemText style={{ fontFamily: "Arial  ", color:"black", fontWeight:"bold" }}>Your Orders</ListItemText>
                </ListItemButton>
              </AnchorLink>
            </List>
          </Paper>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            width: "100vw",
          }}
        >
          <Toolbar />
          <Container
            maxWidth="lg"
            sx={{ mt: 4, mb: 4}}
          >
            <div>
              <div style={{paddingTop:"95px"}} id="customerorder">
                <CustomerOrder />
              </div>
            </div>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
