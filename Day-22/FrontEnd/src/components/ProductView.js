import axios from 'axios'
import React, { useState } from 'react'
import { getToken } from '../Security/TokenManager'
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { fetchCartCount } from '../API/Server';
import toast, { Toaster } from 'react-hot-toast';

function ProductView() {
    const { id } = useParams();
 const [product , setProduct] = useState('');
  const fetch  = axios.get(`http://localhost:8080/api/product/getproduct/${id}`,
  {

    headers:{
        'Authorization':`Bearer ${getToken('token')}`
    }
  }
  )
  .then((response)=>{
    console.log(response.data)
 setProduct(response.data)
})
  .catch((error)=>{console.log(error)});

  const handleAddToCart = (product) => {
    console.log(product) 
    axios.post("http://localhost:8080/api/carts",

    {
     
      quantity:1,
     
      product:{
          productId:product.productId
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
      
    // dispatch(addToCart(product)); 
  };


return (
    <div>
        <Navbar/>
        <Toaster/>
        <div class="bg-gray-100 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
                <div class="h-[460px] rounded-lg bg-gray-300 mb-4">
                  
                  {product.imageURL && 
                    <img class="w-full h-full object-cover" 
                   src={product.imageURL[0]}/>}
                </div>
                <div class="flex -mx-2 mb-4">
                    <div class="w-1/2 px-2">
                        <button  onClick={()=>handleAddToCart(product)} 
                        class="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800" >Add to Cart</button>
                    </div>
                    <div class="w-1/2 px-2">
                        <button class="w-full bg-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">Add to Wishlist</button>
                    </div>
                </div>
            </div>
            <div class="md:flex-1 px-4">
                <h2 class="text-2xl font-bold mb-2">{product.productName}</h2>
                <p class="text-gray-600 text-sm mb-4">{product.brand}</p>
                <div class="flex mb-4">
                    <div class="mr-4">
                        <span class="font-bold text-gray-700">Price:</span>
                        <span class="text-gray-600">₹ {product.productPrice}</span>
                    </div>
                    <div>
                        <span class="font-bold text-gray-700">Availability: </span>
                        {product.quantity>0 ?(
                        <span class="text-gray-600">In Stock</span>):
                        <span class="text-red-500"> Out of Stock</span>
                        }
                    </div>
                </div>
         
                <div>
                    <span class="font-bold text-gray-700">Product Description:</span>
                    <p class="text-gray-600 text-sm mt-2">{product.productDescription}
                    </p>
                </div>
            </div>
        </div>

    </div>
</div>
    </div>
  )
}

export default ProductView