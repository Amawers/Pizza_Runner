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
          backgroundColor: "red",
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

export default function TableFour() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost/successful-orders.php');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching successful orders data:', error);
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
          <Table sx={{ minWidth: 650, padding: "100px" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right" style={headStyle}>
                  ORDER ID
                </TableCell>
                <TableCell align="right" style={headStyle}>
                  RUNNER ID
                </TableCell>
                <TableCell align="right" style={headStyle}>
                  PICKUP DATE
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="right" style={rowStyle}>
                    {order.order_id}
                  </TableCell>
                  <TableCell align="right" style={rowStyle}>
                    {order.runner_id}
                  </TableCell>
                  <TableCell align="right" style={rowStyle}>
                    {order.pickup_date}
                  </TableCell>
                  <TableCell align="right" style={rowStyle}>
                    {order.cancellation}
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
