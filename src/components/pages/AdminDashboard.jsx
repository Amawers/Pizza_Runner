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
import { mainListItems, secondaryListItems } from "../ui/lisitems";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg-home.png";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    position: "relative",
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
    backgroundSize:"cover",
    boxShadow: "10px 2px 4px rgba(0, 0, 0, 0.4)", // Add a slight dark shadow
  },
}));


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", backgroundColor:"#FFF6E6" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{backgroundColor:"black"}}>
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
                ...(open && { display: "none" })
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
              Dashboard
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
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <Paper>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{  fontFamily: "Carter One, cursive",
              color:"black",
              padding:"5px"
            }}
            >
              Pizza Runner
            </Typography>
            </Paper>
            <IconButton onClick={toggleDrawer} sx={{color:"white", fontWeight:"bold", fontSize:"32px", backgroundColor:"black", padding:"0px", margin:"5px"}}>
              <ChevronLeftIcon sx={{color:"white", fontWeight:"bold", fontSize:"32px"}}/>
            </IconButton>
          </Toolbar>
          
          {/* <Divider /> */}
         <Paper sx={{margin:"10px"}}>
         <List component="nav" >
            {mainListItems}
            {/* <Divider sx={{ my: 1 }} /> */}
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
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, backgroundColor:"#FFF6E6"}}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <TableOne />
                <TableTwo />
              </Grid>
              <Grid item xs={12}>
                <TableThree />
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12}>
                <TableFour />
              </Grid>
              {/* Recent Orders */}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
