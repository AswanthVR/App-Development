import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { getAuthorizationHeaders, getToken } from '../../Security/TokenManager';
import axios from 'axios';
import { getCartItems } from '../../API/Server';
import { useNavigate } from 'react-router-dom'; 
import RazorpayComponent from '../Payment/RazorpayComponent'; 
import { getAddressData, getCartItemsData, getUserDetails } from './CheckoutFunctions';
 

function Checkout() {
    let totalAmount = 0;
    const [addressData, setAddressData] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [shipping, setShipping] = useState(0); 
    const [email, setemail] = useState(''); 
    const [firstName, setfirstName] = useState(''); 
    const [lastName, setlastName] = useState(''); 
    const [phoneNumber, setphoneNumber] = useState(''); 
    const [district, setDistrict] = useState(''); 
    const [state, setState] = useState(''); 
    const [pincode, setPincode] = useState('');
    const [address, setAddress] = useState('');
    const[paymentType , setPaymentType] = useState('')
    const[enable , setEnable] = useState(false)
    const nav = useNavigate();
    
    const handleRadioChange = (event) => {
        setPaymentType(event.target.value);  }


  useEffect(() => {
    getAddressData().then(response => {
      if (response) {
        setAddressData(response);
        console.log(response);
      }
    }).catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    getCartItemsData().then(response => {
      console.log(response);
      setCartItems(response);
    }).catch(error => console.error(error));
  }, []);

  useEffect(() => {
    getUserDetails().then(response => {
      console.log(response);
      setemail(response.email);
      setfirstName(response.name);
      setlastName(response.lastname);
      setphoneNumber(response.phone);
      setUserDetails(response);
    }).catch(error => console.error(error));
  }, []);
  


  
    const fetchAddressDetails = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json`
        );
  
        if (response.data && response.data.length > 0) {
          const firstResult = response.data[0].display_name;
          console.log(firstResult) 
          const parts = firstResult.split(', '); 
          const pincodeIndex = parts.findIndex(part => /\b\d{6}\b/.test(part)); 
          let district, state;
          
          if (pincodeIndex !== -1) {
            if (pincodeIndex + 1 < parts.length) {
              const district1 = parts[pincodeIndex + 1];
              const districtParts = district1.split(' ');
              district = districtParts[0];

            }
          
            if (pincodeIndex + 2 < parts.length) {
              state = parts[pincodeIndex + 2];
            }
          }
            setState(state)
            setDistrict(district)
            // console.log('District:', district);
            // console.log('State:', state);
        } else {
          console.log("error")
        }
      } catch (error) {
        console.error('Error fetching address details:', error);
      }
    };

    if(pincode.length==6){fetchAddressDetails()}

    // const orderData = {
    //   orderAddress: `${address}, ${district}, ${state}, ${pincode}`,
    //   paymentMode: paymentType,
    //   uid: localStorage.getItem('uid'),
    //   products: cartItems.map(item => ({
    //     productId: item.product.productId,
    //     quantity: item.quantity
    //   }))
    // };
    const uid = localStorage.getItem('uid');
    const handlePlaceOrder = () => {
      const orderData = {
        orderAddress: `${address}, ${district}, ${state}, ${pincode}`,
        paymentMode: paymentType,
        uid: uid,
        products: cartItems.map(item => ({
          productId: item.product.productId,
          quantity: item.quantity
        }))
      };
      
      // Assuming address, district, state, pincode, paymentType, uid, and cartItems are defined elsewhere in your code.
      
      console.log(orderData)
  
      axios.post('http://localhost:8080/orders/add', orderData
    , getAuthorizationHeaders())
        .then(response => {
          // nav("/");
            setEnable(true);
          console.log('Order placed successfully!', response.data);
      
        })
        .catch(error => {
          console.error('Error placing order:', error);
       
        });
    };
  

if(cartItems){
      for (let i = 0; i < cartItems.length; i++) {
        const itemPrice = cartItems[i].product.productPrice * cartItems[i].quantity;
        totalAmount += itemPrice;
        }
}

// if(enable){
//   return(<RazorpayComponent  orderData={orderData}/>)
// }
  return (
<div className="grid sm:px-10 lg:grid-cols-[2fr,1fr] lg:px-20 xl:px-4">
  <div className="px-4 pt-8">
  <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 ">
    <p class="text-xl font-medium">Payment Details</p>
    <p class="text-gray-400">Complete your order by providing your payment details.</p>
    <div class="">
      <label for="email" class="mt-4 mb-2 block text-sm font-medium">Email</label>
      <div class="relative">
        <input type="text" id="email" name="email" 
                 value={email}
                 onChange={(e) => setemail(e.target.value)}
        class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
      </div>

      <label for="billing-address" class="mt-4 mb-2 block text-sm font-medium">Billing Details</label>
      
      <div className='space-y-8'>
    <div class="flex flex-col sm:flex-row justify-between gap-5  sm:gap-28">
        <div class="relative flex  sm:w-7/12">
          <input type="text" id="Firstname" name="Firstname"     
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
          class="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-yellow-500 focus:ring-yellow -500" placeholder="First Name" />
        </div>
        <div class="relative flex  sm:w-7/12">
          <input type="text" id="Lastname" name="Lastname " 
                   value={lastName}
                   onChange={(e) => setlastName(e.target.value)}
          class="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-yellow-500 focus:ring-yellow -500" placeholder="Last Name" />
        </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-between gap-5  sm:gap-28">
        <div class="relative flex  sm:w-7/12">
            <div className='space-y-5'>
          <input type="text" id="phone" name="phone" 
                   value={phoneNumber}
                   onChange={(e) => setphoneNumber(e.target.value)}
                   class="flex-col w-full h-11 rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-yellow-500 focus:ring-yellow -500" required placeholder="Phone Number" />
         
          <input type="text"  value={pincode}
        onChange={(e) => setPincode(e.target.value)}
                    class="flex-col w-full h-11 rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-yellow-500 focus:ring-yellow -500" required 
                    placeholder="Pin Code"/>
          </div>
        </div>
        <div class="relative flex  sm:w-7/12">
          <input type="text" id="Lastname" name="Lastname " 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            class="w-full h-28 rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-yellow-500 focus:ring-yellow -500" placeholder="Address"  required/>
        </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-between gap-5  sm:gap-28">
        <div class="relative flex  sm:w-7/12">
          <input type="text" id="district" name="district" 
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            class="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-yellow-500 focus:ring-yellow -500" placeholder="City/District" />
        </div>
        <div class="relative flex  sm:w-7/12">
          <input type="text" id="state" name="state"   value={state}
          onChange={(e) => setState(e.target.value)}
        // onChange={(e) => setState(e.target.value)}
        class="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-yellow-500 focus:ring-yellow -500" placeholder="State" />
        </div>
    </div>
    </div>

      {/* <div class="flex flex-col sm:flex-row">
        <div class="relative flex  sm:w-7/12">
          <input type="text" id="billing-address" name="billing-address" class="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-yellow-500 focus:ring-yellow -500" placeholder="Street Address" />
          
    
        </div>
        <input type="text" name="billing-zip" class="float-right right-0 flex rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-yellow-500 focus:ring-yellow-500" placeholder="ZIP" />
      </div> */}

      {/* <!-- Total --> */}
      <div class="mt-6 border-t border-b py-2">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900">Subtotal</p>
          <p class="font-semibold text-gray-900">₹ {totalAmount}</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900">Shipping</p>
          <p class="font-semibold text-gray-900">₹ {shipping}</p>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-between">
        <p class="text-sm font-medium text-gray-900">Total</p>
        <p class="text-2xl font-semibold text-gray-900">₹ {totalAmount+shipping}</p>
      </div>
    </div>
    <button 
    onClick={handlePlaceOrder}
    class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
  
  </div>
  </div>
    <div className='mt-20   '>
    <p class="text-xl font-medium">Order Summary <span className='font-thin  text-gray-600'>({cartItems.length} item)</span></p>
    <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>
  
      <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 overflow-scroll max-h-[300px] h-auto">
     
     {cartItems.map((items)=>(
      <div key={items.id} class="flex flex-col rounded-lg bg-white sm:flex-row">
        <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" 
        src={items.product.imageURL[0]} alt="" />
        <div class="flex w-full flex-col px-4 py-4">
          <span class="font-normal">{items.product.productName}</span>
          <span>
          <span class="float-right text-gray-400">Unit Price: ₹{items.product.productPrice}</span>
          <span class="float-left text-gray-400">Quantity : {items.quantity}</span>
          </span>
          <p class="text-lg font-sans font-semibold">₹ {items.quantity*items.product.productPrice}</p>
        </div> 
      
      </div>
     ))}
    </div>

    <p class="mt-8 text-lg font-medium">Shipping Methods</p>
    <form class="mt-5 grid gap-6">
      <div class="relative">
        <input class="peer hidden" 
        id="radio_1" type="radio" name="radio"
        value="Cash On Delivery"
          checked={paymentType === 'Cash On Delivery'}
          onChange={handleRadioChange} />
        <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
        <img width="50" height="20" src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/32/external-cash-on-delivery-logistics-delivery-kmg-design-outline-color-kmg-design.png" alt="external-cash-on-delivery-logistics-delivery-kmg-design-outline-color-kmg-design"/>
       <div class="ml-5">
            <span class="mt-2 font-semibold">Cash On Delivery</span>
            <p class="text-slate-500 text-sm leading-6">Free Delivery on Orders Above ₹ 499</p>
          </div>
        </label>
      </div>
      <div class="relative">
        <input class="peer hidden"   
       id="radio_2" type="radio" name="radio"
       value="Online Payment"
        checked={paymentType === 'Online Payment'}
        onChange={handleRadioChange} />
        <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
        <img width="50" height="50" src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/external-online-payment-mobile-payment-itim2101-lineal-color-itim2101-1.png" alt="external-online-payment-mobile-payment-itim2101-lineal-color-itim2101-1"/>
         <div class="ml-5">
            <span class="mt-2 font-semibold">Online Payment</span>
            <p class="text-slate-500 text-sm leading-6">No Delivery Charges</p>
          </div>
        </label>
      </div>
    </form>
  </div>
  
</div>

 
  )
}

export default Checkout