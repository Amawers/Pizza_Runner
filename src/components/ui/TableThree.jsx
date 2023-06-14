import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function CardAbove() {
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <Paper
      elevation={8}
      sx={{
        borderRadius: "6px",
        position: "relative",
        zIndex: 2,
        width: "880px",
        height: "64px",
        marginBottom: "-30px",
        backgroundColor: "green",
        display: "flex",
        alignItems: "center"
      }}
    >
    <span style={{ padding: "10px", color: "white", fontWeight: "bolder"}}>Unique Orders</span>
    </Paper>
    </div>
  );
}

const headStyle = {
  fontSize: '12px',
  color: 'gray',
  fontWeight: 'bold',
  paddingTop: "50px",
};

const rowStyle = {
  fontSize: '12px',
};

export default function TableThree() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost/orders-all.php');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders data:', error);
    }
  };

  useEffect(() => {
    fetchOrders();

    const intervalId = setInterval(fetchOrders, 30000); // Refresh every 30 seconds

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, []);

  return (
    <div>
            <CardAbove />

       <Paper elevation={12} sx={{ padding: "20px"}}>
      <TableContainer>
        <Table sx={{ minWidth: 650, padding: "100px"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" style={headStyle}>
                CUSTOMER ID
              </TableCell>
              <TableCell align="right" style={headStyle}>
                ORDER ID
              </TableCell>
              <TableCell align="right" style={headStyle}>
                PIZZA NAMES
              </TableCell>
              <TableCell align="right" style={headStyle}>
                TOPPING EXCLUSIONS
              </TableCell>
              <TableCell align="right" style={headStyle}>
                TOPPING EXTRAS
              </TableCell>
              <TableCell align="right" style={headStyle}>
                ORDER DATE
              </TableCell>
              <TableCell align="right" style={headStyle}>
                ORDER TIME
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right" style={rowStyle}>
                  {order.customer_id}
                </TableCell>
                <TableCell align="right" style={rowStyle}>
                  {order.order_id}
                </TableCell>
                <TableCell align="right" style={rowStyle}>
                  {order.pizza_names}
                </TableCell>
                <TableCell align="right" style={rowStyle}>
                  {order.topping_exclusions}
                </TableCell>
                <TableCell align="right" style={rowStyle}>
                  {order.topping_extras}
                </TableCell>
                <TableCell align="right" style={rowStyle}>
                  {order.order_date}
                </TableCell>
                <TableCell align="right" style={rowStyle}>
                  {order.order_time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </div>
  );
}
