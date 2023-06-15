import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TableSeven = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost/read-from-xml.php');
      const jsonData = await response.json();
      setData(jsonData.row);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Runner ID</TableCell>
            <TableCell>Customer ID</TableCell>
            <TableCell>Pizza Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.order_id}</TableCell>
              <TableCell>{order.runner_id}</TableCell>
              <TableCell>{order.customer_id}</TableCell>
              <TableCell>{order.pizza_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSeven;
