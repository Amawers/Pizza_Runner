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
          backgroundColor: "pink",
          display: "flex",
          alignItems: "center"
        }}
      >
        <span style={{ padding: "10px", color: "white", fontWeight: "bolder" }}>Successful Orders</span>
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

export default function TableSix() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost/customer-orders.php');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders data:', error);
    }
  };

  const handleCancel = async (orderId, runnerId) => {
    try {
      await fetch('http://localhost/cancel-order.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `order_id=${orderId}&runner_id=${runnerId}`,
      });

      console.log(`Order with ID ${orderId} canceled successfully`);
      setOrders(prevOrders => prevOrders.filter(order => order.order_id !== orderId));
    } catch (error) {
      console.error('Error canceling the order:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
            <CardAbove />
 
            <Paper elevation={12} sx={{ padding: "20px" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650, padding: "100px"}} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell align="right" style={headStyle}>customer_id</TableCell>
              <TableCell align="right" style={headStyle}>order_id</TableCell>
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
                <TableCell align="right" style={rowStyle}>{order.customer_id}</TableCell>
                <TableCell align="right" style={rowStyle}>{order.order_id}</TableCell>
                <TableCell align="right" style={rowStyle}>{order.pizza_id}</TableCell>
                <TableCell align="right" style={rowStyle}>{order.topping_exclusions}</TableCell>
                <TableCell align="right" style={rowStyle}>{order.topping_extras}</TableCell>
                <TableCell align="right" style={rowStyle}>{order.order_date}</TableCell>
                <TableCell align="right" style={rowStyle}>{order.order_time}</TableCell>
                <TableCell align="right" style={rowStyle}>{order.runner_id}</TableCell>
                <TableCell align="right" style={rowStyle}>
                  <button onClick={() => handleCancel(order.order_id, order.runner_id)}>Cancel</button>
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
