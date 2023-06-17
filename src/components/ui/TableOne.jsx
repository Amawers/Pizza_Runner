import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EventIcon from "@mui/icons-material/Event";
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
  const [targetDate, setTargetDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false); // State for toggling the date input
  const [showSalesData, setShowSalesData] = useState(false); // State for toggling the sales data display

  const handleDateChange = (event) => {
    setTargetDate(event.target.value);
  };

  const handleToggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleOkButtonClick = async () => {
    if (targetDate) {
      const selectedDate = new Date(targetDate);
      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setFormattedDate(formattedDate);
      setShowDatePicker(false); // Hide the date input field and OK button
      setShowSalesData(true); // Show the sales data

      try {
        const response = await fetch(
          `http://localhost/sales.php?target_date=${targetDate}`
        );
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
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
        {showSalesData && (
  <>
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
  </>
)}

{showDatePicker && (
  <div style={{ display: "flex", justifyContent: "center"}}>
    <input
      type="date"
      id="targetDate"
      value={targetDate}
      onChange={handleDateChange}
      style={{
        textAlign: "center",
        padding: "0",   // Remove the padding
        border: "none", // Remove the border
        outline: "none", // Remove the outline
      }}
    />
    <button
      style={{
        backgroundColor: "blue",
        color: "white",
        border: "none",
        padding: "6px 10px",
        fontSize: "14px",
        cursor: "pointer",
        margin: "5px",
      }}
      onClick={handleOkButtonClick}
      onMouseOver={(e) => (e.target.style.backgroundColor = "darkblue")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "blue")}
    >
      Ok
    </button>
  </div>
)}


        {!showDatePicker && (
          <IconButton
            color={formattedDate ? "primary" : "blue"}
            aria-label="Select Date"
            onClick={handleToggleDatePicker}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "80%",
              right: "12px", // Adjust the value as per your preference
              transform: "translateY(-50%)",
              width: "40px",
              height: "40px",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: formattedDate ? "transparent" : "blue",
                color: formattedDate ? "primary" : "white",
              },
            }}
          >
            <EventIcon />
          </IconButton>
        )}
      </Paper>
    </div>
  );
}
