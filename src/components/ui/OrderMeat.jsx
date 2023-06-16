import React from 'react'
import Paper from '@mui/material/Paper';
import Image from "mui-image";

function OrderMeat() {
  return (
    <div>
        <Paper elevation={12} sx={{width: "399px", height: "415px"}}>
            <Image
              src="src\assets\images\meat-menu.png"
              fit="contain"
              sx={{}}
            />
        </Paper>
    </div>
  )
}

export default OrderMeat