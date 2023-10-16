import React from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { addToCart } from '../features/CartSlice';
import {getToken} from '../../src/Security/TokenManager'
import toast, { Toast,Toaster } from 'react-hot-toast';
import { fetchCartCount } from '../API/Server';

import axios from 'axios';

const Cards = ({ products }) => {
    // const products = useSelector(state => state.products.products);
  const dispatch = useDispatch();

//   const { id, name, description, price, image, rating } = product;
const token = localStorage.getItem('token');  
  const handleAddToCart = () => {
      console.log(token);
    axios.post("http://localhost:8080/api/carts",

    {
     
      quantity:1,
     
      product:{
          productId:products.productId
      },
      user:{
          uid:localStorage.getItem('uid'),
          role:"USER"
      }},
    {
      headers: {
        'Authorization':`Bearer ${getToken('token')}` 
      }
    }
    ).then((response)=>{
        console.log(response.data);
        toast.success('Added to cart');
    fetchCartCount()

      
    })
    .catch((error)=>{
      console.log(error);
    })
      
    dispatch(addToCart(products)); 
  };

  return (

<div className='' >

    <Toaster className='w-[600px]'/>
 
    <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="#">
            <img src={products.imageURL[0]}
                    alt="Product" class="h-80 w-72 object-cover rounded-t-xl" />
            {/* <img src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt="Product" class="h-80 w-72 object-cover rounded-t-xl" /> */}
            <div class="px-4 py-3 w-72">
                <span class="text-gray-400 mr-3 uppercase text-xs">{products.brand}</span>
                <p class="text-lg font-bold text-black truncate block capitalize">{products.productName}</p>
                <div class="flex items-center">
                    <p class="text-lg font-semibold text-black cursor-auto my-3">₹{products.productPrice}</p>
                    
                    <div onClick={handleAddToCart} class="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg></div>
                </div>
            </div>
        </a>
    </div>
 

 
    
     </div>
  );
};

export default Cards;
