import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">num_pizzas_ordered</TableCell>
              <TableCell align="right">order_date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">{sale.num_pizzas_ordered}</TableCell>
                <TableCell align="right">{sale.order_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
