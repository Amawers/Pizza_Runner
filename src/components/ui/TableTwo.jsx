import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

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
      <TrendingUpIcon sx={{ color: "white", width: "40px", height: "40px" }} />
    </Paper>
  );
}

export default function TableTwo() {
  const [data, setData] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const fetchMostOrdered = async () => {
      try {
        const response = await fetch("http://localhost/orders.php");
        const data = await response.json();
        setData(data);
        
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setFormattedDate(formattedDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMostOrdered();
  }, []);

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

          {data.length > 0 && (
            <>
              {data.map((order, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "7px",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", padding: "0px" }}
                  >
                    {order.pizza_name} {order.order_count}
                  </Typography>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px",
                  marginTop: "-10px",
                }}
              >
                <Divider sx={{ width: "160px" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="body1" sx={{ fontSize: "14px" }}>
                  {formattedDate}
                </Typography>
              </div>
            </>
          )}
        </Paper>
      </div>
    </>
  );
}
