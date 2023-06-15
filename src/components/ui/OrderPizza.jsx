import React, { useState, useEffect } from 'react';

export default function OrderPizza() {
  const [customerId, setCustomerId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [pizzaId, setPizzaId] = useState('');
  const [toppingExclusions, setToppingExclusions] = useState('');
  const [toppingExtras, setToppingExtras] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderTime, setOrderTime] = useState('');

  useEffect(() => {
    const customerId = localStorage.getItem("customerId");
    setCustomerId(customerId);
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/order-pizza.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `customer_id=${customerId}&order_id=${orderId}&pizza_id=${pizzaId}&topping_exclusions=${toppingExclusions}&topping_extras=${toppingExtras}&order_date=${orderDate}&order_time=${orderTime}`,
      });

      if (response.ok) {
        console.log('Data inserted successfully.');

        // Reset the form after submission
        setCustomerId('');
        setOrderId('');
        setPizzaId('');
        setToppingExclusions('');
        setToppingExtras('');
        setOrderDate('');
        setOrderTime('');
      } else {
        console.error('Error inserting data:', response.statusText);
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <div>
      <h1>Order Pizza</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Customer ID:
          <input
            type="number"
            value={customerId}
            onChange={(event) => setCustomerId(event.target.value)}
          />
        </label>
        <br />
        <label>
          Order ID:
          <input
            type="number"
            value={orderId}
            onChange={(event) => setOrderId(event.target.value)}
          />
        </label>
        <br />
        <label>
          Pizza ID:
          <input
            type="number"
            value={pizzaId}
            onChange={(event) => setPizzaId(event.target.value)}
          />
        </label>
        <br />
        <label>
          Topping Exclusions:
          <input
            type="number"
            value={toppingExclusions}
            onChange={(event) => setToppingExclusions(event.target.value)}
          />
        </label>
        <br />
        <label>
          Topping Extras:
          <input
            type="number"
            value={toppingExtras}
            onChange={(event) => setToppingExtras(event.target.value)}
          />
        </label>
        <br />
        <label>
          Order Date:
          <input
            type="date"
            value={orderDate}
            onChange={(event) => setOrderDate(event.target.value)}
          />
        </label>
        <br />
        <label>
          Order Time:
          <input
            type="time"
            value={orderTime}
            onChange={(event) => setOrderTime(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
