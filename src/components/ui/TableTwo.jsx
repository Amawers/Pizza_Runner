import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TableTwo() {
  const [orders, setOrders] = useState([]);
  const [targetDate, setTargetDate] = useState('');

  useEffect(() => {
    if (targetDate) {
      fetchOrders();
    }
  }, [targetDate]);

  const handleDateChange = (event) => {
    setTargetDate(event.target.value);
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost/orders.php?target_date=${targetDate}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders data:', error);
    }
  };

  return (
    <>
      <label htmlFor="targetDate">Target Date:</label>
      <input type="date" id="targetDate" value={targetDate} onChange={handleDateChange} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">order_count</TableCell>
              <TableCell align="right">pizza_id</TableCell>
              <TableCell align="right">pizza_name</TableCell>
              <TableCell align="right">order_date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">{order.order_count}</TableCell>
                <TableCell align="right">{order.pizza_id}</TableCell>
                <TableCell align="right">{order.pizza_name}</TableCell>
                <TableCell align="right">{order.order_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
