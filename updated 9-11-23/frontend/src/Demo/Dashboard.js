import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderDetailsPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orders/getCount', getAuthorizationHeaders());
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const getAuthorizationHeaders = () => {
    // Add your authorization headers logic here if needed
    return {
      headers: {
        // Add your headers here (e.g., authentication token)
      }
    };
  };

  return (
    <div>
      <h1>Order Details</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Order Total</th>
            <th>Order Address</th>
            <th>Payment Mode</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.oid}>
              <td>{order.oid}</td>
              <td>{order.orderDate}</td>
              <td>{order.orderTotal}</td>
              <td>{order.orderAddress}</td>
              <td>{order.paymentMode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailsPage;
