import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


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
          backgroundColor: "gray",
          display: "flex",
          alignItems: "center"
        }}
      >
        <span style={{ padding: "10px", color: "white", fontWeight: "bolder" }}>Data Mart</span>
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
    <>
                <CardAbove />

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={headStyle}>ORDER ID</TableCell>
            <TableCell style={headStyle}>RUNNER ID</TableCell>
            <TableCell style={headStyle}>CUSTOMER ID</TableCell>
            <TableCell style={headStyle}>PIZZA NAME</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order, index) => (
            <TableRow key={index}>
              <TableCell style={rowStyle}>{order.order_id}</TableCell>
              <TableCell style={rowStyle}>{order.runner_id}</TableCell>
              <TableCell style={rowStyle}>{order.customer_id}</TableCell>
              <TableCell style={rowStyle}>{order.pizza_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default TableSeven;
