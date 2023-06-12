import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EventIcon from "@mui/icons-material/Event";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

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
            backgroundColor: "blue",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TrendingUpIcon
            sx={{ color: "white", width: "40px", height: "40px" }}
          />
        </Paper>
  );
}

export default function TableTwo() {
  const [data, setData] = useState([]);
  const [targetDate, setTargetDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showData, setShowData] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost/orders.php?target_date=${targetDate}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (targetDate) {
      fetchData();
    }
  }, [targetDate]);

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
      setShowDatePicker(false);
      setShowData(true);

      fetchData();
    }
  };

  return (
    <>
      <div style={{ position: "relative", zIndex: 2 }}>
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
          Most Ordered
        </Typography>

        {showData && (
          <>
            {data.map((order, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center", // Add this line to align items horizontally
                  marginTop: "7px",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold", padding: "0px" }}>
                  {order.pizza_name} {order.order_count}
                </Typography>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
                marginTop: "-10px", // Add this line to remove spacing
              }}
            >
              <Divider sx={{ width: "160px" }} />
            </div>

            <Typography variant="body1" sx={{ fontSize: "14px" }}>
              {formattedDate}
            </Typography>
          </>
        )}

        {showDatePicker && (
          <div>
            <input
              type="date"
              id="targetDate"
              value={targetDate}
              onChange={handleDateChange}
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
              right: "12px",
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
    </>
  );
}
