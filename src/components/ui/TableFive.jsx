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
          backgroundColor: "darkviolet",
          display: "flex",
          alignItems: "center"
        }}
      >
        <span style={{ padding: "10px", color: "white", fontWeight: "bolder" }}>Audit</span>
      </Paper>
    </div>
  );
}

export default function TableFive() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost/canceled-orders.php');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching canceled orders data:', error);
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
    <>
          <CardAbove />

      <Paper elevation={12} sx={{ padding: "20px" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650, padding: "100px"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">order_id</TableCell>
              <TableCell align="right">runner_id</TableCell>
              <TableCell align="right">cancellation_datetime</TableCell>
              <TableCell align="right">cancellation_type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">{order.order_id}</TableCell>
                <TableCell align="right">{order.runner_id}</TableCell>
                <TableCell align="right">{order.cancellation_datetime}</TableCell>
                <TableCell align="right">{order.cancellation_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>

    </>
  );
}
