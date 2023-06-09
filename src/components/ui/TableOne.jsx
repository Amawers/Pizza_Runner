import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function TableOne() {
  const [sales, setSales] = useState([]);
  const [targetDate, setTargetDate] = useState('');

  

  useEffect(() => {
    if (targetDate) {
      fetchSales();
    }
  }, [targetDate]);

  const handleDateChange = (event) => {
    setTargetDate(event.target.value);
  };

  const fetchSales = async () => {
    try {
      const response = await fetch(`http://localhost/sales.php?target_date=${targetDate}`);
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  return (
    <>
      <label htmlFor="targetDate">Target Date:</label>
      <input type="date" id="targetDate" value={targetDate} onChange={handleDateChange} />
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2, width: '300px'}}>
        <Typography variant="h3" gutterBottom>
          Ordered Pizzas
        </Typography>
        {sales.map((sale, index) => (
          <Typography key={index} variant="body1">
            Pizzas Ordered {sale.num_pizzas_ordered} <br />
            Order Date {sale.order_date}
          </Typography>
        ))}
      </Paper>
    </>
  );
}
