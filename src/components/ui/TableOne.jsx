import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';

function CardAbove() {
  return (
    <Paper
      elevation={8}
      sx={{
        borderRadius: "6px",
        position: "relative",
        zIndex: 2,
        width: "64px",
        height: "64px",
        marginBottom: "-20px",
        marginLeft: "20px",
        backgroundColor: "green",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <LocalPizzaIcon sx={{ color: "white", width: "40px", height: "40px"}} />
    </Paper>
  );
}

export default function TableOne() {
  const [sales, setSales] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setFormattedDate(formattedDate);
    fetchSalesData(formattedDate);
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  const fetchSalesData = async (targetDate) => {
    try {
      const response = await fetch(
        `http://localhost/sales.php?target_date=${targetDate}`
      );
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <CardAbove />

      <Paper
        elevation={12}
        sx={{
          marginTop: 2,
          width: "261.5px",
          height: "170px",
          borderRadius: "10px",
          position: "relative",
          top: "-25px",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "gray",
            fontSize: "14px",
            marginLeft: "125px",
            paddingTop: "10px",
          }}
        >
          Ordered Pizzas
        </Typography>
        {sales.map((sale, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{ fontWeight: "bold", fontSize: "20px", textAlign: "center" }}
          >
            {sale.num_pizzas_ordered} <br />
          </Typography>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Divider sx={{ width: "160px" }} />
        </div>
        {sales.map((sale, index) => (
          <Typography key={index} variant="body1" sx={{ fontSize: "14px", padding: "10px", textAlign: "center" }}>
            {formattedDate}
          </Typography>
        ))}
      </Paper>
    </div>
  );
}
