import React from 'react'
import { addToCart, addToWishList } from '../../API/Server';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

 const ProductCards =({ product }) =>{


  return (
    <>
     <div  class="group relative block overflow-hidden">

      {/* //wishlist Button */}
    <button onClick={()=>addToWishList(product)}
      class="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
    >
      <span class="sr-only">Wishlist</span>
  
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  <Link to={`/product/${product.productId}`}>
        <img
      src={product.imageURL[0]}
      alt=""
      class=" absolute inset-0 h-56 w-full object-contain opacity-100 group-hover:opacity-0"
    />
    <img
      src={product.imageURL[1]}
      alt=""
      class="   inset-0 h-56 w-full object-contain opacity-0 group-hover:opacity-100"
    //   class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72  "
    />
    </Link>

  
    <div class="relative border border-gray-100 bg-white p-5">
      {/* <span
        class="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium"
      >
        New
      </span> */}
    <Link to={`/product/${product.productId}`}>
      <h3 class="mt-4 text-md font-medium text-gray-900 truncate block capitalize">{product.productName}</h3></Link>
  
      <p class="mt-1.5 text-sm text-gray-700">₹ {product.productPrice}</p>
  
      <div class="mt-4">
        <button
         onClick={()=>addToCart(product)}
          class="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105 "
        >
          Add to Cart 
        </button>
      </div>
    </div>
  </div> 
  
  </>
  )
}


export default ProductCards;