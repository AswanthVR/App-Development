import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../features/CartSlice';
import emptycart from '../Images/emptycart1.png'
import { Link } from 'react-router-dom';
import { useState } from 'react'; 
import { toast, Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { getToken } from '../Security/TokenManager';  
 

function ExampleCart() {

  
  const showToast = () => {
    toast('Item Removed from Cart',
    {
  icon: '🗑️',
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
}
);
}
//fetch cart data
const [cartData, setCartData] = useState([]);




useEffect(() => {
 
  axios.get(`http://localhost:8080/api/carts/user/${localStorage.getItem('uid')}` , 
  {
    headers: { 'Authorization': `Bearer ${getToken('token')}` }
      })
    .then(response => {
      setCartData(response.data);
      console.log(cartData)
    })
    .catch(error => {
      console.error('Error fetching cart data:', error);
    });
  }, []);
  
  
  
  
  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cartData.map(item => {
    if(itemId === item.id && item.quantity === 1){

      axios.delete(`http://localhost:8080/api/carts/${itemId}`, {
        headers: { 'Authorization': `Bearer ${getToken('token')}` }
      })
      .then(response => {
        const updatedCart = cartData.filter(item => item.id !== itemId);
        setCartData(updatedCart);
      })
      .catch(error => {
        toast.error('Error updating cart data');
        console.error('Error updating cart data:', error);
      });
    }

    else if (item.id === itemId && item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity -1 }; 
      axios.put(`http://localhost:8080/api/carts/decrease/${itemId}`,null, {
            headers: { 'Authorization': `Bearer ${getToken('token')}` }
          })
        .then(response => {
          setCartData(updatedCart);
        })
        .catch(error => {
          toast.error('Error updating cart data');
          console.error('Error updating cart data:', error);
        });
      return updatedItem;
    }
    return item;
  });

};

const handleIncreaseQuantity = (itemId) => {
  const updatedCart = cartData.map(item => {
    if (item.id === itemId) {
      const updatedItem = { ...item, quantity: item.quantity + 1 };
      // Update the item quantity on the server
      axios.put(`http://localhost:8080/api/carts/increase/${itemId}`, null,{
        headers: { 'Authorization': `Bearer ${getToken('token')}` }
      })
        .then(response => {
         
          setCartData(updatedCart);
          console.log(response.data)
        })
        .catch(error => {
          toast.error('Error updating cart data');
          console.error('Error updating cart data:', error);
        });
      return updatedItem;
    }
    return item;
  });

};
 
const handleDelete = (itemId) => {
  axios.delete(`http://localhost:8080/api/carts/${itemId}`, {
    headers: { 'Authorization': `Bearer ${getToken('token')}` }
  })
  .then(response => {
    const updatedCart = cartData.filter(item => item.id !== itemId);
    setCartData(updatedCart);
  })
  .catch(error => {
    toast.error('Error updating cart data');
    console.error('Error updating cart data:', error);
  });
}

 
 
let totalAmount = 0;

for (let i = 0; i < cartData.length; i++) {
  const itemPrice = cartData[i].product.productPrice * cartData[i].quantity;
  totalAmount += itemPrice;
}

console.log(totalAmount);


return (

    <div className=''>
      <Navbar/>
      
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
      <div className=""> 
         {
            
              cartData.length === 0 ?
              ( 
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0  mt-12 mb-16 ">

                <div>
                   <h1 className='flex justify-center items-center text-3xl font-bold mb-4 uppercase tracking-wider indent-4'>Nothing in the bag</h1>
              
              <div className='flex justify-center items-center '>
                {/* <img className='h-auto w-[250px]' src='https://images.bewakoof.com/images/doodles/empty-cart-page-doodle.png'/> */}
                <img className='w-[300px]   bg-yellow-400 p-5 rounded-full' src="https://assets.1mg.com/pwa-app/production/dweb/2.0.0/static/images/illustrations/empty-cart.svg"  alt="empty cart"></img>
              </div>

              <div className='mt-10 space-y-5'>
             
              <p>Look like you have not added anything to you cart . 
                Go ahead & explore top categories</p>
              </div>

              <div className='flex justify-center items-center mt-5 space-x-5'>
              <Link to={'/shop'} class="inline-flex overflow-hidden text-white bg-gray-900 rounded group">
<span class="px-3.5 py-2 text-white bg-yellow-500 group-hover:bg-yellow-600 flex items-center justify-center">
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
</span>
<span class="pl-4 pr-5 py-2.5">Shop Something</span>
</Link>
                
<Link to={'/wishlist'} class="inline-flex overflow-hidden text-white bg-gray-900 rounded group">
<span class="px-3.5 py-2 text-white bg-yellow-500 group-hover:bg-yellow-600 flex items-center justify-center">
{/* <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> */}
<img className='text-white' width="24" height="24" src="https://img.icons8.com/material-outlined/24/like--v1.png" alt="like--v1"/></span>
<span class="pl-4 pr-5 py-2.5">View WishList</span>
</Link>
                
              </div>

              </div>
              </div>
              )
            : 
            (
         <>

     
  <h1 className='flex  font-semibold text-4xl mt-3 tracking-wider font-sans justify-center mb-5'>My Bag</h1>
          
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
         <br></br>
          <div className="rounded-lg md:w-2/3">
            {cartData.map((item) => (
              <div
                key={item.id}
                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              >
                <img
                  src={item.product.imageURL[0]}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-40 h-[100px]"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{item.product.productName}</h2>
                    <p className="mt-1 text-xs text-gray-700">{item.product.brand}</p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span
                        onClick={() =>handleDecreaseQuantity(item.id)}
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        -
                      </span>
                      <p className="h-8 w-8 border bg-white text-center text-xs">
  {item.quantity}
</p>


                      <span
                        onClick={() =>handleIncreaseQuantity(item.id)}

                        // onClick={() => dispatch(increaseQuantity(item.id))}
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        +
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="font-bold">₹ {item.product.productPrice * item.quantity}</p>
                    
                      <button onClick={()=>handleDelete(item.id)}>                        <svg
                        className="h-5 w-15 cursor-pointer text-xl   text:bg-red-500"
                        
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg></button>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
   
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
       
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">
           
                {totalAmount.toFixed(2)}
              

              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">0.00</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">
                
                  
                  {totalAmount.toFixed(2)}
                </p>
               
              </div>
            </div>
            <Link to={'/checkout'}>
            <button
           
            className="mt-6 w-full rounded-md bg-yellow-500 py-1.5 font-medium text-blue-50 hover:bg-yellow-600">
              Check out
            </button></Link>
          </div>
          </div>
        </>

            )
         } 
        
      </div>
      <Footer/>
    </div>
  );
}

export default ExampleCart;
