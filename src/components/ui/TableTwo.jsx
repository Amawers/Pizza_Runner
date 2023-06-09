import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2, width: '300px' }}>
        <Typography variant="h3" gutterBottom>
          hsahd Pizzas
        </Typography>
        {orders.map((order, index) => (
          <Typography key={index} variant="body1">
            Pizza Name: {order.pizza_name} <br />
            Order Count: {order.order_count} <br />
            Order Date: {order.order_date}
          </Typography>
        ))}
      </Paper>
    </>
  );
}
