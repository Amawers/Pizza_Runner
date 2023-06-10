import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
      fetchOrders();
    } catch (error) {
      console.error('Error canceling the order:', error);
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
              <TableCell align="right">customer_id</TableCell>
              <TableCell align="right">order_id</TableCell>
              <TableCell align="right">pizza_id</TableCell>
              <TableCell align="right">topping_exclusions</TableCell>
              <TableCell align="right">topping_extras</TableCell>
              <TableCell align="right">order_date</TableCell>
              <TableCell align="right">order_time</TableCell>
              <TableCell align="right">runner_id</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">{order.customer_id}</TableCell>
                <TableCell align="right">{order.order_id}</TableCell>
                <TableCell align="right">{order.pizza_id}</TableCell>
                <TableCell align="right">{order.topping_exclusions}</TableCell>
                <TableCell align="right">{order.topping_extras}</TableCell>
                <TableCell align="right">{order.order_date}</TableCell>
                <TableCell align="right">{order.order_time}</TableCell>
                <TableCell align="right">{order.runner_id}</TableCell>
                <TableCell align="right">
                  <button onClick={() => handleCancel(order.order_id, order.runner_id)}>Cancel</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
