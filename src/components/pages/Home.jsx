import React, { useState } from 'react';
import Input from '@mui/joy/Input';

export default function Home() {
  const [runnerId, setRunnerId] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');

  const handleSave = () => {
    const formData = new FormData();
    formData.append('runner_id', runnerId);
    formData.append('registration_date', registrationDate);

    fetch('http://localhost/save.php', {  // Path modified to directly reference the PHP file
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Input
        color="neutral"
        disabled={false}
        placeholder="runner_id"
        size="lg"
        variant="outlined"
        value={runnerId}
        onChange={(e) => setRunnerId(e.target.value)}
      />
      <Input
        sx={{ marginTop: "30px" }}
        color="neutral"
        disabled={false}
        placeholder="registration_date"
        size="lg"
        variant="outlined"
        value={registrationDate}
        onChange={(e) => setRegistrationDate(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
