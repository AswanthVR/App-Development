import React from 'react';
import { useState } from 'react';
const RazorpayComponent = (props) => {
  const [orderId, setOrderId] = useState(null);

   
  const initiatePayment = () => {
    const { orderData } = props;
    var options= {
        key: "rzp_test_7CP7Bn1wx5RNKG",
        amount:1000*100, //  = INR 1
        currency: "INR",
        name: "Essentia",
        description: "Secure Payment",
        image: "https://example.com/your_logo", 
        // order_id:orderId,
        handler: (res) => {
          console.log(res);
        },
        prefill: {
          name: "Aswanth",
          email: "aswanth@12345",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h2>Order Summary</h2>
      <button onClick={initiatePayment}>Pay Now</button>
    </div>
  );
};

export default RazorpayComponent;
