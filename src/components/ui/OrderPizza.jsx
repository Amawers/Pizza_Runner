import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import Image from "mui-image";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg-home.png";
import meatPizzaImage from "../../assets/images/meat.png";
import vegetarianPizzaImage from "../../assets/images/vegetarian.png";
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
import { v4 as uuidv4 } from 'uuid';


const divs = {
  display: "flex",
  justifyContent: "space-between",
  margin:"12px",
  border: "2px double #FFF6E6",
  width:"350px",
  backgroundSize:"cover"
};

export default function OrderPizza() {
  const [customerId, setCustomerId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [pizzaId, setPizzaId] = useState("");
  const [toppingExclusions, setToppingExclusions] = useState([]);
  const [toppingExtras, setToppingExtras] = useState([]);
  const navigate = useNavigate();
  

  const toppingsButton = {
    width: "200px",
    fontSize: "12px",
    margin: "5px",
    width: "50px",
    fontWeight: 900,
    backgroundSize: "cover",
    color: "black",
    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
    height:"25px"
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleToppingExclusionsClick = (topping) => {
    if (!toppingExclusions.includes(topping) && toppingExclusions.length < 3){
      // If the topping is not already in the exclusions list and the limit is not reached, add it
      setToppingExclusions([...toppingExclusions, topping]);
    }
  };

  const handleToppingExtrasClick = (topping) => {
    if (!toppingExclusions.includes(topping)) {
      // If the topping is not in the exclusions list
      if (!toppingExtras.includes(topping) && toppingExtras.length < 3) {
        // If the topping is not already in the extras list and the limit is not reached, add it
        setToppingExtras([...toppingExtras, topping]);
      }
    }
  };

  const handleToppingExclusionsRemove = (topping) => {
    setToppingExclusions(toppingExclusions.filter((item) => item !== topping));
  };

  const handleToppingExtrasRemove = (topping) => {
    const index = toppingExtras.lastIndexOf(topping);
    if (index !== -1) {
      const newToppingExtras = [...toppingExtras];
      newToppingExtras.splice(index, 1);
      setToppingExtras(newToppingExtras);
    }
  };

  const handleChangePizza = () => {
    // Update pizzaId to a new pizza ID
    const newPizzaId = pizzaId === "1" ? "2" : "1";
    setPizzaId(newPizzaId);

    // Reset topping exclusions and extras
    setToppingExclusions([]);
    setToppingExtras([]);
  };

  const getToppingName = (toppingId) => {
    switch (toppingId) {
      case "1":
        return "Bacon";
      case "2":
        return "BBQ Sauce";
      case "3":
        return "Beef";
      case "4":
        return "Cheese";
      case "5":
        return "Chicken";
      case "6":
        return "Mushroom";
      case "7":
        return "Onions";
      case "8":
        return "Pepperoni";
      case "9":
        return "Peppers";
      case "10":
        return "Salami";
      case "11":
        return "Tomatoes";
      case "12":
        return "Tomato Sauce";
      default:
        return "";
    }
  };

  const getPizzaName = (pizzaId) => {
    switch (pizzaId) {
      case "1":
        return "PIZZA 1";
      case "2":
        return "PIZZA 2";
      default:
        return "";
    }
  };

  const getPizzaType = (pizzaId) => {
    switch (pizzaId) {
      case "1":
        return "MEAT LOVERS";
      case "2":
        return "VEGETARIAN";
      default:
        return "";
    }
  };

  useEffect(() => {
    const customerId = localStorage.getItem("customerId");
    setCustomerId(customerId);
    const pizzaId = localStorage.getItem("selectedOrder");
    setPizzaId(pizzaId);
  }, []);
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const order_id = uuidv4(); // Generate a unique order ID
  
      const response = await fetch("http://localhost/order-pizza.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `customer_id=${customerId}&order_id=${order_id}&pizza_id=${pizzaId}&topping_exclusions=${toppingExclusions.join(",")}&topping_extras=${toppingExtras.join(",")}`,
      });
  
      if (response.ok) {
        console.log("Data inserted successfully.");
  
        // Reset the form after submission
        setToppingExclusions([]);
        setToppingExtras([]);
      } else {
        console.error("Error inserting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };
  

  return (
      <Paper
        elevation={12}
        sx={{
          width: "1150px",
          height: "520px",
          display: "flex",
          justifyContent: "center",
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
        >
          {" "}
          <IconButton
            onClick={handleHome}
            sx={{
              width: "32px",
              height: "32px",
              marginRight: "280px",
              marginTop: "10px",
            }}
          >
          </IconButton>
          <Typography
            sx={{
              fontFamily: "Yellowtail, cursive",
              color: "black",
              textAlign: "center",
              transform: "rotate(-10deg)",
              transformOrigin: "center",
            }}
          >
            {getPizzaName(pizzaId)}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Carter One, cursive",
              color: "black",
              fontSize: "24px",
              textAlign: "center",
            }}
          >
            {getPizzaType(pizzaId)}
          </Typography>
          {pizzaId === "1" && (
            <Image
              src={meatPizzaImage}
              fit="contain"
              sx={{ marginTop: "-50px" }}
            />
          )}
          {pizzaId === "2" && (
            <Image
              src={vegetarianPizzaImage}
              fit="contain"
              sx={{ marginTop: "-50px" }}
            />
          )}
        <button onClick={handleChangePizza} style={{
                  fontFamily: "Carter One, serif",
                  color: "white",
                  fontSize: "14px",
                  textAlign: "center",
                  padding: "10px",
                  backgroundColor:"#126925"
                }}>CHANGE PIZZA</button>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography
                sx={{
                  fontFamily: "Carter One, serif",
                  color: "black",
                  fontSize: "12px",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                Exclusions:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Carter One, serif",
                  color: "black",
                  fontSize: "12px",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                {toppingExclusions.map((exclusion, index) =>
                  index === 0
                    ? getToppingName(exclusion)
                    : `, ${getToppingName(exclusion)}`
                )}
              </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography
                sx={{
                  fontFamily: "Carter One, serif",
                  color: "black",
                  fontSize: "12px",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                Extras:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Carter One, serif",
                  color: "black",
                  fontSize: "12px",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                {toppingExtras.map((extra, index) =>
                  index === 0
                    ? getToppingName(extra)
                    : `, ${getToppingName(extra)}`
                )}
              </Typography>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#126925",
            width: "100%",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <Typography
            sx={{
              fontFamily: "Carter One, serif",
              color: "white",
              fontSize: "18px",
              textAlign: "justify",
              padding: "10px",
            }}
          >
            EXCLUDE OR ADD MORE TOPPINGS!
          </Typography>
          <form onSubmit={handleFormSubmit} style={{display:"flex", flexDirection:"column"}}>
            <label>
             <div style={{display:"flex", justifyContent:"space-around"}}>
             <div style={{...divs,   backgroundImage: `url(${bacon})`}}>
                <Typography
                  sx={{
                    fontFamily: "Carter One, serif",
                    color: "black",
                    fontSize: "19px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    width:"480px",
                    backgroundColor:"white",
                    height:"25px",
                    margin:"5px",
                    borderRadius:"30px"
                  }}
                >
                  Bacon
                </Typography>
                <div style={{width:"400px",  display:"flex"}}>
                <button
                  style={{
                    ...toppingsButton,
                    padding:"2px",
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasRemove("1");
                    handleToppingExclusionsClick("1");
                  }}
                  >
                  EXCLUDE
                </button>
                <button
                  style={{
                    ...toppingsButton,
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    padding:"3px",
                    backgroundSize: "cover",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasClick("1");
                    handleToppingExclusionsRemove("1");
                }}
                >
                  MORE 
                </button>
                </div>
              </div>
              <div style={{...divs,   backgroundImage: `url(${bbqsauce})`}}>
                <Typography
                  sx={{
                    fontFamily: "Carter One, serif",
                    color: "black",
                    fontSize: "19px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    width:"480px",
                    backgroundColor:"white",
                    height:"25px",
                    margin:"5px",
                    borderRadius:"30px"
                  }}
                >
                  BBQ Sauce
                </Typography>
                <div style={{width:"400px",  display:"flex"}}>
                <button
                  style={{
                    ...toppingsButton,
                    padding:"3px",
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasRemove("2");
                    handleToppingExclusionsClick("2");
                  }}
                  >
                  EXCLUDE
                </button>
                <button
                  style={{
                    ...toppingsButton,
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    padding:"2px",
                    backgroundSize: "cover",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasClick("2");
                    handleToppingExclusionsRemove("2");
                }}
                >
                  MORE 
                </button>
                </div>
              </div>
             </div>

             
             <div style={{display:"flex", justifyContent:"space-around"}}>
             <div style={{...divs,   backgroundImage: `url(${beef})`}}>
                <Typography
                  sx={{
                    fontFamily: "Carter One, serif",
                    color: "black",
                    fontSize: "19px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    width:"480px",
                    backgroundColor:"white",
                    height:"25px",
                    margin:"5px",
                    borderRadius:"30px"
                  }}
                >
                  Beef
                </Typography>
                <div style={{width:"400px",  display:"flex"}}>
                <button
                  style={{
                    ...toppingsButton,
                    padding:"2px",
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasRemove("3");
                    handleToppingExclusionsClick("3");
                  }}
                  >
                  EXCLUDE
                </button>
                <button
                  style={{
                    ...toppingsButton,
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    padding:"3px",
                    backgroundSize: "cover",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasClick("3");
                    handleToppingExclusionsRemove("3");
                }}
                >
                  MORE 
                </button>
                </div>
              </div>
              <div style={{...divs,   backgroundImage: `url(${cheese})`}}>
                <Typography
                  sx={{
                    fontFamily: "Carter One, serif",
                    color: "black",
                    fontSize: "19px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    width:"480px",
                    backgroundColor:"white",
                    height:"25px",
                    margin:"5px",
                    borderRadius:"30px"
                  }}
                >
                  Cheese
                </Typography>
                <div style={{width:"400px",  display:"flex"}}>
                <button
                  style={{
                    ...toppingsButton,
                    padding:"3px",
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasRemove("4");
                    handleToppingExclusionsClick("4");
                  }}
                  >
                  EXCLUDE
                </button>
                <button
                  style={{
                    ...toppingsButton,
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    padding:"2px",
                    backgroundSize: "cover",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasClick("4");
                    handleToppingExclusionsRemove("4");
                }}
                >
                  MORE 
                </button>
                </div>
              </div>
             </div>


             <div style={{display:"flex", justifyContent:"space-around"}}>
             <div style={{...divs,   backgroundImage: `url(${chicken})`}}>
                <Typography
                  sx={{
                    fontFamily: "Carter One, serif",
                    color: "black",
                    fontSize: "19px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    width:"480px",
                    backgroundColor:"white",
                    height:"25px",
                    margin:"5px",
                    borderRadius:"30px"
                  }}
                >
                  Chicken
                </Typography>
                <div style={{width:"400px",  display:"flex"}}>
                <button
                  style={{
                    ...toppingsButton,
                    padding:"2px",
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasRemove("5");
                    handleToppingExclusionsClick("5");
                  }}
                  >
                  EXCLUDE
                </button>
                <button
                  style={{
                    ...toppingsButton,
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    padding:"3px",
                    backgroundSize: "cover",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasClick("5");
                    handleToppingExclusionsRemove("5");
                }}
                >
                  MORE 
                </button>
                </div>
              </div>
              <div style={{...divs,   backgroundImage: `url(${mushrooms})`}}>
                <Typography
                  sx={{
                    fontFamily: "Carter One, serif",
                    color: "black",
                    fontSize: "19px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    width:"480px",
                    backgroundColor:"white",
                    height:"25px",
                    margin:"5px",
                    borderRadius:"30px"
                  }}
                >
                  Mushrooms
                </Typography>
                <div style={{width:"400px",  display:"flex"}}>
                <button
                  style={{
                    ...toppingsButton,
                    padding:"3px",
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasRemove("6");
                    handleToppingExclusionsClick("6");
                  }}
                  >
                  EXCLUDE
                </button>
                <button
                  style={{
                    ...toppingsButton,
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    padding:"2px",
                    backgroundSize: "cover",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasClick("6");
                    handleToppingExclusionsRemove("6");
                }}
                >
                  MORE 
                </button>
                </div>
              </div>
             </div>


             <div style={{display:"flex", justifyContent:"space-around"}}>
             <div style={{...divs,   backgroundImage: `url(${onion})`}}>
                <Typography
                  sx={{
                    fontFamily: "Carter One, serif",
                    color: "black",
                    fontSize: "19px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    width:"480px",
                    backgroundColor:"white",
                    height:"25px",
                    margin:"5px",
                    borderRadius:"30px"
                  }}
                >
                  Onions
                </Typography>
                <div style={{width:"400px",  display:"flex"}}>
                <button
                  style={{
                    ...toppingsButton,
                    padding:"2px",
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasRemove("7");
                    handleToppingExclusionsClick("7");
                  }}
                  >
                  EXCLUDE
                </button>
                <button
                  style={{
                    ...toppingsButton,
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    padding:"3px",
                    backgroundSize: "cover",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasClick("7");
                    handleToppingExclusionsRemove("7");
                }}
                >
                  MORE 
                </button>
                </div>
              </div>
              <div style={{...divs,   backgroundImage: `url(${pepperoni})`}}>
                <Typography
                  sx={{
                    fontFamily: "Carter One, serif",
                    color: "black",
                    fontSize: "19px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    width:"480px",
                    backgroundColor:"white",
                    height:"25px",
                    margin:"5px",
                    borderRadius:"30px"
                  }}
                >
                  Pepperoni
                </Typography>
                <div style={{width:"400px",  display:"flex"}}>
                <button
                  style={{
                    ...toppingsButton,
                    padding:"3px",
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasRemove("8");
                    handleToppingExclusionsClick("8");
                  }}
                  >
                  EXCLUDE
                </button>
                <button
                  style={{
                    ...toppingsButton,
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    padding:"2px",
                    backgroundSize: "cover",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasClick("8");
                    handleToppingExclusionsRemove("8");
                }}
                >
                  MORE 
                </button>
                </div>
              </div>
             </div>


             <div style={{display:"flex", justifyContent:"space-around"}}>
             <div style={{...divs,   backgroundImage: `url(${peppers})`}}>
                <Typography
                  sx={{
                    fontFamily: "Carter One, serif",
                    color: "black",
                    fontSize: "19px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    width:"480px",
                    backgroundColor:"white",
                    height:"25px",
                    margin:"5px",
                    borderRadius:"30px"
                  }}
                >
                  Peppers
                </Typography>
                <div style={{width:"400px",  display:"flex"}}>
                <button
                  style={{
                    ...toppingsButton,
                    padding:"2px",
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasRemove("9");
                    handleToppingExclusionsClick("9");
                  }}
                  >
                  EXCLUDE
                </button>
                <button
                  style={{
                    ...toppingsButton,
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    padding:"3px",
                    backgroundSize: "cover",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasClick("9");
                    handleToppingExclusionsRemove("9");
                }}
                >
                  MORE 
                </button>
                </div>
              </div>
              <div style={{...divs,   backgroundImage: `url(${salami})`}}>
                <Typography
                  sx={{
                    fontFamily: "Carter One, serif",
                    color: "black",
                    fontSize: "19px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    width:"480px",
                    backgroundColor:"white",
                    height:"25px",
                    margin:"5px",
                    borderRadius:"30px"
                  }}
                >
                  Salami
                </Typography>
                <div style={{width:"400px",  display:"flex"}}>
                <button
                  style={{
                    ...toppingsButton,
                    padding:"3px",
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasRemove("10");
                    handleToppingExclusionsClick("10");
                  }}
                  >
                  EXCLUDE
                </button>
                <button
                  style={{
                    ...toppingsButton,
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    padding:"2px",
                    backgroundSize: "cover",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasClick("10");
                    handleToppingExclusionsRemove("10");
                }}
                >
                  MORE 
                </button>
                </div>
              </div>
             </div>


             <div style={{display:"flex", justifyContent:"space-around"}}>
             <div style={{...divs,   backgroundImage: `url(${tomatoes})`}}>
                <Typography
                  sx={{
                    fontFamily: "Carter One, serif",
                    color: "black",
                    fontSize: "19px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    width:"480px",
                    backgroundColor:"white",
                    height:"25px",
                    margin:"5px",
                    borderRadius:"30px"
                  }}
                >
                  Tomatoes
                </Typography>
                <div style={{width:"400px",  display:"flex"}}>
                <button
                  style={{
                    ...toppingsButton,
                    padding:"2px",
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasRemove("11");
                    handleToppingExclusionsClick("11");
                  }}
                  >
                  EXCLUDE
                </button>
                <button
                  style={{
                    ...toppingsButton,
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    padding:"3px",
                    backgroundSize: "cover",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasClick("11");
                    handleToppingExclusionsRemove("11");
                }}
                >
                  MORE 
                </button>
                </div>
              </div>
              <div style={{...divs,   backgroundImage: `url(${tomatosauce})`}}>
                <Typography
                  sx={{
                    fontFamily: "Carter One, serif",
                    color: "black",
                    fontSize: "19px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    width:"480px",
                    backgroundColor:"white",
                    height:"25px",
                    margin:"5px",
                    borderRadius:"30px"
                  }}
                >
                  Tomato Sauce
                </Typography>
                <div style={{width:"400px",  display:"flex"}}>
                <button
                  style={{
                    ...toppingsButton,
                    padding:"3px",
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasRemove("12");
                    handleToppingExclusionsClick("12");
                  }}
                  >
                  EXCLUDE
                </button>
                <button
                  style={{
                    ...toppingsButton,
                    width: "70px",
                    fontWeight: 900,
                    fontSize:"10px",
                    padding:"2px",
                    backgroundSize: "cover",
                    color: "black",
                    boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.7)",
                  }}
                  type="button"
                  onClick={() => {
                    handleToppingExtrasClick("12");
                    handleToppingExclusionsRemove("12");
                }}
                >
                  MORE 
                </button>
                </div>
              </div>
             </div>


              
            </label>
              <button
              type="submit"
              style={{
                fontSize: "18px",
                width: "100px",
                height:"20px",
                marginTop:"10px",
                marginLeft:"30px",
                paddingBottom:"30px",
                fontFamily: "Carter One, cursive",
                textAlign:"center"
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </Paper>
  );
}
