import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getToken } from '../Security/TokenManager';
import { fetchCartCount } from '../API/Server';
import toast, { Toaster } from 'react-hot-toast';
import { select } from '@syncfusion/ej2/base';

const ShowAllProducts = () => {
//   const { id } = useParams();
  const [product, setProduct] = useState(null);

  const token = getToken('token');  
  const handleAddToCart = (product) => {
    console.log(product)
    console.log(token);
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


  useEffect(() => {
    axios.get(`http://localhost:8080/api/product/getProducts`,
    {
      headers:{'Authorization':`Bearer ${getToken('token')}`}
    })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
 

<section>
  <Toaster className='w-[600px]'/>
  <Navbar/>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
   
    <header>
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
        {product[0].category.name}
      </h2>

      {/* <p className="mt-4 max-w-md text-gray-500">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
        praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
        natus?
      </p> */}
    </header>

    <div className="mt-8 block lg:hidden">
      <button
        className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
      >
        <span className="text-sm font-medium"> Filters & Sorting </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4 rtl:rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>

    <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
      <div className="hidden space-y-4 lg:block">
        <div>
          <label htmlFor="SortBy" className="block text-xs font-medium text-gray-700">
            Sort By
          </label>

          <select id="SortBy" className="mt-1 rounded border-gray-300 text-sm">
            <option>Sort By</option>
            <option value="Title, DESC">Title, DESC</option>
            <option value="Title, ASC">Title, ASC</option>
            <option value="Price, DESC">Price, DESC</option>
            <option value="Price, ASC">Price, ASC</option>
          </select>
        </div>

        <div>
          <p className="block text-xs font-medium text-gray-700">Filters</p>

          <div className="mt-1 space-y-2">
         

            <details
              className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary
                className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
              >
                <span className="text-sm font-medium"> Price </span>

                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <div className="border-t border-gray-200 bg-white">
                <header className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-700">
                    Choose a price range
                  </span>

                  <button
                    type="button"
                    className="text-sm text-gray-900 underline underline-offset-4"
                  >
                    Reset
                  </button>
                </header>

                <div className="border-t border-gray-200 p-4">
                  <div className="flex justify-between gap-4">
                    <label
                      htmlFor="FilterPriceFrom"
                      className="flex items-center gap-2"
                    >
                      <span className="text-sm text-gray-600">₹</span>

                      <input
                        type="number"
                        id="FilterPriceFrom"
                        placeholder="From"
                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                      />
                    </label>

                    <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">₹</span>

                      <input
                        type="number"
                        id="FilterPriceTo"
                        placeholder="To"
                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </details>

         
          </div>
        </div>
      </div>

      
      
      
      
      
      
      
      
      <div className='lg:col-span-3'> 

      {!product.length && (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-2xl font-medium text-gray-900">No products Available.</h1>
        </div>
      )}
    <div className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 ml-3">
      {product.map((product) => (
<div>
    <button
      className="  end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
    >
      <span className="sr-only">Wishlist</span>
  
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
    {product.imageURL && 
    <Link to={`/product/${product.productId}`}>
    <img
    
      src={product.imageURL[0]}
      className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />
      </Link>
    }
  
    <div className="relative border border-gray-100 bg-white p-6">
    
  
      <h3 className="mt-4 text-lg font-medium text-gray-900">{product.productName}</h3>
  
      <p className="mt-1.5 text-sm text-gray-700">₹{product.productPrice}</p>
  
      <div className="mt-4">
        <button onClick={()=>handleAddToCart(product)}
          className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
          Add to Cart
        </button>
      </div>
    </div>
    </div>
      ))}
  </div>
 
  </div>
    </div>
  </div>
  <Footer/>
</section>


  );
};

export default ShowAllProducts;
