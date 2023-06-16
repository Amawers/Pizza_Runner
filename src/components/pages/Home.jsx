import React from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import bgImage from "../../assets/images/bg-home.png";
import "../../styling/Home.css";
import Image from "mui-image";
import { Paper } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate("/AdminLogIn");
  };

  const handleCustomerLogin = () => {
    navigate("/CustomerLogin");
  };

  return (
    <div className="home-container">
      <div className="back">
        <Image
          src="src\assets\logo\logo-pizzarunner.png"
          fit="contain"
          height="50px"
          sx={{ paddingRight: "100px" }}
        />
      </div>
      <div className="arrow" />
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Stack
            spacing={2}
            direction="row"
            sx={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <Button
              color="inherit"
              onClick={handleCustomerLogin}
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
              onClick={handleAdminLogin}
              sx={{
                fontFamily: "Carter One, cursive",
                color: "#FFF6E6"
              }}
            >
              ABOUT US
            </Button>
            <Button
              color="inherit"
              onClick={handleAdminLogin}
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
              onClick={handleCustomerLogin}
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
              onClick={handleAdminLogin}
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

      <div
        className="background-image"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>
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
              Vegetarian pizza features the same cheeses, seasonings, and sauces
              that regular pizza has, though the meat is replaced with
              vegetables and meat substitutes.
            </Typography>
          </div>
        </Paper>
      </div>
      <div className="bottom">
        <div>
          <Typography
            sx={{
              fontFamily: "'Carter One', cursive",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            EST. 2023
          </Typography>
          <Typography variant="h3" sx={{ fontFamily: "'Carter One', cursive" }}>
            Pizza Runner
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: "'Arial-bold', cursive" }}>
            THE BEST PLACE TO SATISFY <br />
            YOUR CRAVINGS
          </Typography>
        </div>
      </div>
    </div>
  );
}
