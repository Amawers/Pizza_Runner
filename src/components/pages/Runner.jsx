import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';



export default function Runner() {
  const [runnerId, setRunnerId] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");

  const handleSave = () => {
    const formData = new FormData();
    formData.append("runner_id", runnerId);
    formData.append("registration_date", registrationDate);

    fetch("http://localhost/save.php", {
      // Path modified to directly reference the PHP file
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch', display: 'flex'},
    }}
    noValidate
    autoComplete="off"
  >
    <TextField id="outlined-basic" label="runner_id" variant="outlined" value={runnerId}
        onChange={(e) => setRunnerId(e.target.value)}/>
    <TextField id="outlined-basic" label="register_date" variant="outlined" value={registrationDate}
        onChange={(e) => setRegistrationDate(e.target.value)}/>
          <button onClick={handleSave}>Save</button>
  </Box>
  );
}
