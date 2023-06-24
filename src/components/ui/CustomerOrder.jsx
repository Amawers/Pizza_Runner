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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={8}
        sx={{
          borderRadius: "6px",
          position: "relative",
          zIndex: 2,
          width: "880px",
          height: "64px",
          marginBottom: "-30px",
          backgroundColor: "darkblue",
          display: "flex",
          alignItems: "center"
        }}
      >
        <span style={{ padding: "10px", color: "white", fontWeight: "bolder" }}>Customer Orders</span>
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

export default function CustomerOrder() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const customerId = localStorage.getItem("customerId"); // Fetch the customer_id
      const response = await fetch(`http://localhost/customer-orders-unique.php?customer_id=${customerId}`);
      const data = await response.json();
      setOrders(data);
      console.log(customerId); // Log the orders in the console to check the values
    } catch (error) {
      console.error('Error fetching orders data:', error);
    }
  };

  const handleCancel = async (orderId, pizzaId) => {
    try {
      await fetch('http://localhost/cancel-order-customer.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `order_id=${orderId}&pizza_id=${pizzaId}&cancellation_type=Customer Cancellation`,
      });

      console.log(`Order with ID ${orderId} canceled successfully`);
      setOrders(prevOrders => prevOrders.filter(order => order.order_id !== orderId || order.pizza_id !== pizzaId));
    } catch (error) {
      console.error('Error canceling the order:', error);
    }
  };
  

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log(orders); // Log the orders in the console to check the values
  }, [orders]);

  return (
    <>
      <CardAbove />

      <Paper elevation={12}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right" style={headStyle}>order_id</TableCell>
                <TableCell align="right" style={headStyle}>customer_id</TableCell>
                <TableCell align="right" style={headStyle}>pizza_id</TableCell>
                <TableCell align="right" style={headStyle}>topping_exclusions</TableCell>
                <TableCell align="right" style={headStyle}>topping_extras</TableCell>
                <TableCell align="right" style={headStyle}>order_date</TableCell>
                <TableCell align="right" style={headStyle}>order_time</TableCell>
                <TableCell align="right" style={headStyle}>runner_id</TableCell>
                <TableCell align="right" style={headStyle}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="right">{order.order_id}</TableCell>
                  <TableCell align="right">{order.customer_id}</TableCell>
                  <TableCell align="right">{order.pizza_id}</TableCell>
                  <TableCell align="right">{order.topping_exclusions}</TableCell>
                  <TableCell align="right">{order.topping_extras}</TableCell>
                  <TableCell align="right">{order.order_date}</TableCell>
                  <TableCell align="right">{order.order_time}</TableCell>
                  <TableCell align="right">{order.runner_id}</TableCell>
                  <TableCell align="right">
                    <button onClick={() => handleCancel(order.order_id, order.pizza_id)}  style={{
    backgroundColor: "red",
    fontFamily: "Carter One, cursive",
    color: "white",
    transition: "background-color 0.3s ease",
  }} onMouseOver={(e) => e.target.style.backgroundColor = "darkred"}
  onMouseLeave={(e) => e.target.style.backgroundColor = "red"}>Cancel</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
