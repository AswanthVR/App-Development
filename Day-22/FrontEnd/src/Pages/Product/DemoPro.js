import React from 'react'
import ProductCards from './ProductCards'
import { getToken } from '../../Security/TokenManager';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import NoProducts from './NoProducts';


function DemoPro() {
    const [product, setProduct] = useState([]);
    const [url , setUrl] = useState('');
    const [productLoaded ,setProductLoaded] = useState(false);
    const currentUrl = window.location.href;
    const { id } = useParams();
    console.log(currentUrl);

    useEffect(() => {
      if(currentUrl.includes('All-products')){
        setUrl('http://localhost:8080/api/product/getProducts');
      } else {
        setUrl(`http://localhost:8080/byCategory/${id}`);
      }
  
      axios.get(url, {
        headers: { 'Authorization': `Bearer ${getToken('token')}` }
      })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setProductLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
    }, [url, id]);
  
    if (productLoaded && product.length === 0) {
      return <div><NoProducts/></div>;
       
    }

  return (
    <div>
        <Navbar/>
        <Toaster/>
      {!productLoaded ? (
        <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div class="border-t-transparent border-solid animate-spin  rounded-full border-yellow-200 border-8 h-40 w-40"></div>
    </div>
      ):(

    <section>
      <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>
    
          <p class="mt-4 max-w-md text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
            natus?
          </p>
        </header>
    
        <div class="mt-8 block lg:hidden">
          <button
            class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
          >
            <span class="text-sm font-medium"> Filters & Sorting </span>
    
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4 rtl:rotate-180"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
    
        <div class="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <div class="hidden space-y-4 lg:block">
            <div>
              <label for="SortBy" class="block text-xs font-medium text-gray-700">
                Sort By
              </label>
    
              <select id="SortBy" class="mt-1 rounded border-gray-300 text-sm">
                <option>Sort By</option>
                <option value="Title, DESC">Title, DESC</option>
                <option value="Title, ASC">Title, ASC</option>
                <option value="Price, DESC">Price, DESC</option>
                <option value="Price, ASC">Price, ASC</option>
              </select>
            </div>
    
            <div>
              <p class="block text-xs font-medium text-gray-700">Filters</p>
    
              <div class="mt-1 space-y-2">
                <details
                  class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary
                    class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                  >
                    <span class="text-sm font-medium"> Availability </span>
    
                    <span class="transition group-open:-rotate-180">
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
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>
    
                  <div class="border-t border-gray-200 bg-white">
                    <header class="flex items-center justify-between p-4">
                      <span class="text-sm text-gray-700"> 0 Selected </span>
    
                      <button
                        type="button"
                        class="text-sm text-gray-900 underline underline-offset-4"
                      >
                        Reset
                      </button>
                    </header>
    
                    <ul class="space-y-1 border-t border-gray-200 p-4">
                      <li>
                        <label
                          for="FilterInStock"
                          class="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterInStock"
                            class="h-5 w-5 rounded border-gray-300"
                          />
    
                          <span class="text-sm font-medium text-gray-700">
                            In Stock (5+)
                          </span>
                        </label>
                      </li>
    
                      <li>
                        <label
                          for="FilterPreOrder"
                          class="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterPreOrder"
                            class="h-5 w-5 rounded border-gray-300"
                          />
    
                          <span class="text-sm font-medium text-gray-700">
                            Pre Order (3+)
                          </span>
                        </label>
                      </li>
    
                      <li>
                        <label
                          for="FilterOutOfStock"
                          class="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterOutOfStock"
                            class="h-5 w-5 rounded border-gray-300"
                          />
    
                          <span class="text-sm font-medium text-gray-700">
                            Out of Stock (10+)
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </details>
    
                <details
                  class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary
                    class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                  >
                    <span class="text-sm font-medium"> Price </span>
    
                    <span class="transition group-open:-rotate-180">
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
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>
    
                  <div class="border-t border-gray-200 bg-white">
                    <header class="flex items-center justify-between p-4">
                      <span class="text-sm text-gray-700">
                        The highest price is $600
                      </span>
    
                      <button
                        type="button"
                        class="text-sm text-gray-900 underline underline-offset-4"
                      >
                        Reset
                      </button>
                    </header>
    
                    <div class="border-t border-gray-200 p-4">
                      <div class="flex justify-between gap-4">
                        <label
                          for="FilterPriceFrom"
                          class="flex items-center gap-2"
                        >
                          <span class="text-sm text-gray-600">$</span>
    
                          <input
                            type="number"
                            id="FilterPriceFrom"
                            placeholder="From"
                            class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          />
                        </label>
    
                        <label for="FilterPriceTo" class="flex items-center gap-2">
                          <span class="text-sm text-gray-600">$</span>
    
                          <input
                            type="number"
                            id="FilterPriceTo"
                            placeholder="To"
                            class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </details>
    
            
              </div>
            </div>
          </div>
    
          <div class="lg:col-span-3 "> 
            <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {
                product.map((product) => (  <ProductCards key={product.productId} product={product}/>
                ))
            }
             
    
            </ul>
          </div>
        </div>
      </div>
<Footer/>
    </section>

      )

      } 
    </div>
  )
}

export default DemoPro