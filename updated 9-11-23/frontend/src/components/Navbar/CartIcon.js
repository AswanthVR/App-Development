import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchCartCount } from '../../API/Server';
 
 

function CartIcon() {
  const quantity = useSelector((state) => state.cart.items.length);
  const [cartCount, setCartCount] = useState(0);


    fetchCartCount()
      .then(count => {
        setCartCount(count);
        console.log(count);
      })
      .catch(error => {
        console.error(error.message);
      });
   

  return (

 
    <div className='flex   items-center justify-between cursor-pointer space-x-[-6px] space-y-[-10px]  '>
    <div className='flex flex-col '>
    <svg className="fill-stroke" width={26} height={26} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 1L1 5.8V22.6C1 23.2365 1.28095 23.847 1.78105 24.2971C2.28115 24.7471 2.95942 25 3.66667 25H22.3333C23.0406 25 23.7189 24.7471 24.219 24.2971C24.719 23.847 25 23.2365 25 22.6V5.8L21 1H5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1 5.7998H25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.3346 10.6001C18.3346 11.8731 17.7727 13.094 16.7725 13.9942C15.7723 14.8944 14.4158 15.4001 13.0013 15.4001C11.5868 15.4001 10.2303 14.8944 9.23007 13.9942C8.22987 13.094 7.66797 11.8731 7.66797 10.6001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    </div>
    <div className='bg-yellow-300 text-black rounded-full px-1.5 py-0.5 hover:animate-pulse  '>  
    <p className='text-[12px]'>{cartCount}</p>
    </div>
    </div>

  );
}

export default CartIcon;
