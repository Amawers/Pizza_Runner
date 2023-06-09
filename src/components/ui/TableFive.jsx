import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
  }, []);

  return (
    <>
      <button onClick={fetchOrders}>Reload Data</button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">order_id</TableCell>
              <TableCell align="right">runner_id</TableCell>
              <TableCell align="right">pickup_date</TableCell>
              <TableCell align="right">cancellation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">{order.order_id}</TableCell>
                <TableCell align="right">{order.runner_id}</TableCell>
                <TableCell align="right">{order.pickup_date}</TableCell>
                <TableCell align="right">{order.cancellation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
