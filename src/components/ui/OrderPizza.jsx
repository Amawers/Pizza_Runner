import React, { useState, useEffect } from 'react';
import { Paper } from "@mui/material";
import Image from "mui-image";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg-home.png";
import bacon from "../../assets/images/bacon.jpg";
import bbqsauce from "../../assets/images/bbqsauce.jpg";
import beef from "../../assets/images/beef.jpg";
import cheese from "../../assets/images/cheese.jpg";
import chicken from "../../assets/images/chicken.jpg";
import mushrooms from "../../assets/images/mushrooms.jpg";
import onion from "../../assets/images/onion.jpg";
import pepperoni from "../../assets/images/pepperoni.jpg";
import peppers from "../../assets/images/peppers.jpg";
import salami from "../../assets/images/salami.jpg";
import tomatoes from "../../assets/images/tomatoes.jpg";
import tomatosauce from "../../assets/images/tomatosauce.jpg";
import meatPizzaImage from "../../assets/images/meat.png";
import vegetarianPizzaImage from "../../assets/images/vegetarian.png";


export default function OrderPizza() {
  const [customerId, setCustomerId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [pizzaId, setPizzaId] = useState('');
  const [toppingExclusions, setToppingExclusions] = useState([]);
  const [toppingExtras, setToppingExtras] = useState([]);
  const navigate = useNavigate();

  const toppingsButton = {
    width: "200px",
    fontSize: "12px",
    margin: "2px"
  }

  const handleHome = () => {
    navigate("/");
  };

  const handleToppingExclusionsClick = (topping) => {
    if (toppingExclusions.includes(topping)) {
      // If the topping is already in the exclusions list, remove it
      setToppingExclusions(toppingExclusions.filter((item) => item !== topping));
    } else if (toppingExclusions.length < 3) {
      // If the topping is not already in the exclusions list and the limit is not reached, add it
      setToppingExclusions([...toppingExclusions, topping]);
    }
  };

  const handleToppingExtrasClick = (topping) => {
    if (toppingExtras.includes(topping)) {
      // If the topping is already in the extras list, remove it
      setToppingExtras(toppingExtras.filter((item) => item !== topping));
    } else if (toppingExtras.length < 3) {
      // If the topping is not already in the extras list and the limit is not reached, add it
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



  const getPizzaName = (pizzaId) => {
    switch (pizzaId) {
      case '1':
        return 'PIZZA 1';
      case '2':
        return 'PIZZA 2';
      default:
        return '';
    }
  };

  const getPizzaType = (pizzaId) => {
    switch (pizzaId) {
      case '1':
        return 'MEAT LOVERS';
      case '2':
        return 'VEGETARIAN';
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}>
      <Paper
        elevation={12}
        sx={{
          width: "800px",
          height: "530px",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            width: "450px",
            backgroundColor: "#FFF6E6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        > <IconButton
          onClick={handleHome}
          sx={{ width: "32px", height: "32px", marginRight: "280px", marginTop: "10px" }}
        >
            <HomeIcon sx={{ fontSize: "28px", color: "black" }} />
          </IconButton>
          <Typography
            sx={{
              fontFamily: 'Yellowtail, cursive',
              color: 'black',
              textAlign: 'center',
              transform: 'rotate(-10deg)',
              transformOrigin: 'center',
            }}
          >
            {getPizzaName(pizzaId)}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Carter One, cursive',
              color: 'black',
              fontSize: '24px',
              textAlign: 'center',
            }}
          >
            {getPizzaType(pizzaId)}
          </Typography>
          {pizzaId === '1' && (
            <Image
              src={meatPizzaImage}
              fit="contain"
              sx={{ marginTop: "-50px" }}
            />
          )}
          {pizzaId === '2' && (
            <Image
              src={vegetarianPizzaImage}
              fit="contain"
              sx={{ marginTop: "-50px" }}
            />
          )}
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
            width: "290px",
            padding: "10px",
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
              <button style={{ ...toppingsButton, backgroundImage: `url(${bacon})`, fontWeight: 900, backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)"}} type="button" onClick={() => handleToppingExclusionsClick('1')}>
                Bacon
              </button>

              <button style={{ ...toppingsButton, backgroundImage: `url(${bbqsauce})`, fontWeight: 900, backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)"}} type="button" onClick={() => handleToppingExclusionsClick('2')}>
                BBQ Sauce
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${beef})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)"}} type="button" onClick={() => handleToppingExclusionsClick('3')}>
                Beef
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${cheese})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExclusionsClick('4')}>
                Cheese
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${chicken})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExclusionsClick('5')}>
                Chicken
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${mushrooms})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExclusionsClick('6')}>
                Mushroom
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${onion})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExclusionsClick('7')}>
                Onions
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${pepperoni})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExclusionsClick('8')}>
                Pepperoni
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${peppers})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExclusionsClick('9')}>
                Peppers
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${salami})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExclusionsClick('10')}>
                Salami
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${tomatoes})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExclusionsClick('11')}>
                Tomatoes
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${tomatosauce})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExclusionsClick('12')}>
                Tomato Sauce
              </button>
            </label>
            <label>
              <Typography
                sx={{
                  fontFamily: 'Carter One, cursive',
                  color: 'WHITE',
                  fontSize: '12px'
                }}
              >Order ID:</Typography>
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
            width: "290px",
            paddingRight: "10px",
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
            <button style={{ ...toppingsButton, backgroundImage: `url(${bacon})`, fontWeight: 900, backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)"}} type="button" onClick={() => handleToppingExtrasClick('1')}>
                Bacon
              </button>

              <button style={{ ...toppingsButton, backgroundImage: `url(${bbqsauce})`, fontWeight: 900, backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)"}} type="button" onClick={() => handleToppingExtrasClick('2')}>
                BBQ Sauce
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${beef})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)"}} type="button" onClick={() => handleToppingExtrasClick('3')}>
                Beef
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${cheese})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExtrasClick('4')}>
                Cheese
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${chicken})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExtrasClick('5')}>
                Chicken
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${mushrooms})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExtrasClick('6')}>
                Mushroom
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${onion})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExtrasClick('7')}>
                Onions
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${pepperoni})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExtrasClick('8')}>
                Pepperoni
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${peppers})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExtrasClick('9')}>
                Peppers
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${salami})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExtrasClick('10')}>
                Salami
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${tomatoes})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExtrasClick('11')}>
                Tomatoes
              </button>
              <button style={{ ...toppingsButton, backgroundImage: `url(${tomatosauce})`, fontWeight: 900,  backgroundSize: "cover", color:"white", boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)" }} type="button" onClick={() => handleToppingExtrasClick('12')}>
                Tomato Sauce
              </button>
            </label>
            <button type="submit" style={{ fontSize: "10px", width: "70px", marginTop: "20px", fontFamily:"Carter One, cursive" }}>Submit</button>

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