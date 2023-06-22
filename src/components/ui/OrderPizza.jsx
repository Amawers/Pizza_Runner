import React, { useState, useEffect } from 'react';
import { Paper } from "@mui/material";
import Image from "mui-image";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from '@mui/material/Modal';
import bgImage from "../../assets/images/bg-home.png";


export default function OrderPizza() {
  const [customerId, setCustomerId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [pizzaId, setPizzaId] = useState('');
  const [toppingExclusions, setToppingExclusions] = useState([]);
  const [toppingExtras, setToppingExtras] = useState([]);

  const toppingsButton = {
    width: "200px",
    fontSize: "12px"
  }

  const handleToppingExclusionsClick = (topping) => {
    if (toppingExclusions.includes(topping)) {
      // If the topping is already in the exclusions list, remove it
      setToppingExclusions(toppingExclusions.filter((item) => item !== topping));
    } else {
      // Otherwise, add it to the exclusions list
      setToppingExclusions([...toppingExclusions, topping]);
    }
  };
  
  const handleToppingExtrasClick = (topping) => {
    if (toppingExtras.includes(topping)) {
      // If the topping is already in the extras list, remove it
      setToppingExtras(toppingExtras.filter((item) => item !== topping));
    } else {
      // Otherwise, add it to the extras list
      setToppingExtras([...toppingExtras, topping]);
    }
  };
  
  const getToppingName = (toppingId) => {
    switch (toppingId) {
      case '1':
        return 'Bacon';
      case '2':
        return 'BBQ Sauce';
      case '3':
        return 'Beef';
      case '4':
        return 'Cheese';
      case '5':
        return 'Chicken';
      case '6':
        return 'Mushroom';
      case '7':
        return 'Onions';
      case '8':
        return 'Pepperoni';
      case '9':
        return 'Peppers';
      case '10':
        return 'Salami';
      case '11':
        return 'Tomatoes';
      case '12':
        return 'Tomato Sauce';
      default:
        return '';
    }
  };
  
  useEffect(() => {
    const customerId = localStorage.getItem('customerId');
    setCustomerId(customerId);
    const pizzaId = localStorage.getItem('selectedOrder')
    setPizzaId(pizzaId);
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/order-pizza.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `customer_id=${customerId}&order_id=${orderId}&pizza_id=${pizzaId}&topping_exclusions=${toppingExclusions.join(
          ','
        )}&topping_extras=${toppingExtras.join(',')}`,
      });

      if (response.ok) {
        console.log('Data inserted successfully.');

        // Reset the form after submission
        setCustomerId('');
        setOrderId('');
        setToppingExclusions([]);
        setToppingExtras([]);
      } else {
        console.error('Error inserting data:', response.statusText);
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'100vw',  backgroundImage: `url(${bgImage})`, backgroundSize:"cover"}}>
      <Paper
        elevation={12}
        sx={{
          width: "800px",
          height: "530px",
          display: "flex",
          justifyContent: "center"        }}
      >
        <div
          style={{
            width: "400px",
            backgroundColor: "#FFF6E6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Yellowtail, cursive",
              color: "black",
              textAlign: "center",
              transform: "rotate(-10deg)",
              transformOrigin: "center",
            }}
          >
            PIZZA 2
          </Typography>
          <Typography
            sx={{
              fontFamily: "Carter One, cursive",
              color: "black",
              fontSize: "24px",
              textAlign: "center",
            }}
          >
            VEGETARIAN PIZZA
          </Typography>
          <Image
            src="src\assets\images\vegetarian.png"
            fit="contain"
            sx={{ marginTop: "-50px" }}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography
                sx={{
                  fontFamily: 'Carter One, serif',
                  color: 'black',
                  fontSize: '12px',
                  textAlign: 'center',
                  padding: '10px',
                }}
              >
                Exclusions:
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Carter One, serif',
                  color: 'black',
                  fontSize: '12px',
                  textAlign: 'center',
                  padding: '10px',
                }}
              >
                {toppingExclusions.map((exclusion, index) => (
                  index === 0 ? getToppingName(exclusion) : `, ${getToppingName(exclusion)}`
                ))}
              </Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography
                sx={{
                  fontFamily: 'Carter One, serif',
                  color: 'black',
                  fontSize: '12px',
                  textAlign: 'center',
                  padding: '10px',
                }}
              >
                Extras:
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Carter One, serif',
                  color: 'black',
                  fontSize: '12px',
                  textAlign: 'center',
                  padding: '10px',
                }}
              >
                {toppingExtras.map((extra, index) => (
                  index === 0 ? getToppingName(extra) : `, ${getToppingName(extra)}`
                ))}
              </Typography>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#126925",
            width: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Carter One, serif",
              color: "white",
              fontSize: "12px",
              textAlign: "justify",
              padding: "10px",
            }}
          >
            Exclusions:
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <label>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExclusionsClick('1')}>
                Bacon
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExclusionsClick('2')}>
                BBQ Sauce
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExclusionsClick('3')}>
                Beef
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExclusionsClick('4')}>
                Cheese
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExclusionsClick('5')}>
                Chicken
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExclusionsClick('6')}>
                Mushroom
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExclusionsClick('7')}>
                Onions
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExclusionsClick('8')}>
                Pepperoni
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExclusionsClick('9')}>
                Peppers
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExclusionsClick('10')}>
                Salami
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExclusionsClick('11')}>
                Tomatoes
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExclusionsClick('12')}>
                Tomato Sauce
              </button>
            </label>
            <label>
              Order ID:
              <input
                type="number"
                value={orderId}
                onChange={(event) => setOrderId(event.target.value)}
              />
            </label>
          </form>
        </div>
        <div
          style={{
            backgroundColor: "#126925",
            width: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Carter One, serif",
              color: "white",
              fontSize: "12px",
              textAlign: "justify",
              padding: "10px",
            }}
          >
            Extras:
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <label>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExtrasClick('1')}>
                Bacon
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExtrasClick('2')}>
                BBQ Sauce
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExtrasClick('3')}>
                Beef
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExtrasClick('4')}>
                Cheese
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExtrasClick('5')}>
                Chicken
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExtrasClick('6')}>
                Mushroom
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExtrasClick('7')}>
                Onions
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExtrasClick('8')}>
                Pepperoni
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExtrasClick('9')}>
                Peppers
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExtrasClick('10')}>
                Salami
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExtrasClick('11')}>
                Tomatoes
              </button>
              <button style={toppingsButton} type="button" onClick={() => handleToppingExtrasClick('12')}>
                Tomato Sauce
              </button>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Paper>
    </div>
  );
}
/////////////////////////////////////////
//////////////////////////////////////

/////////////////////////////////////
////////////////////////////////////////