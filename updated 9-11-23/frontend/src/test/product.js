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
import { onContentScroll } from '@syncfusion/ej2/spreadsheet';


function DemoPro() {

    const [product, setProduct] = useState([]);
    const [url , setUrl] = useState('');
    const [productLoaded ,setProductLoaded] = useState(false);
    const currentUrl = window.location.href;
    const { id } = useParams();
    console.log(currentUrl);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [inStock, setInStock] = useState(false);
    const [outOfStock, setOutOfStock] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');




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
  

    const filteredProducts = product.filter(item => 
      (item.productName && item.productName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      ((!inStock && item.quantity <= 0) || (inStock && item.quantity > 0)) &&
      ((!outOfStock && item.quantity > 0) || (outOfStock && item.quantity <= 0)) &&
      (!minPrice || item.productPrice >= minPrice) &&
      (!maxPrice || item.productPrice <= maxPrice)
    );
    
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOption === 'Title, DESC') {
        return b.productName.localeCompare(a.productName);
      }
      if (sortOption === 'Title, ASC') {
        return a.productName.localeCompare(b.productName);
      }
      if (sortOption === 'Price, DESC') {
        return b.productPrice - a.productPrice;
      }
      if (sortOption === 'Price, ASC') {
        return a.productPrice - b.productPrice;
      }
      return 0;
    });
    
    // Render the sorted and filtered products
 
    
    

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
        <header className='flex justify-between'>
          <div>
          <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>
          </div>
          <div className='w-[300px]'>
          <div class="mb-3">
  <div class="relative mb-4 flex w-full flex-wrap items-stretch">
    <input
      type="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 
      outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-yellow-500 focus:text-neutral-700  focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-yellow-500"
      placeholder="Search"
      aria-label="Search"
      aria-describedby="button-addon1" />
    {/* <!--Search button--> */}
    <button
      class="relative z-[2] flex items-center rounded-r bg-yellow-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg"
      type="button"
      id="button-addon1"
      data-te-ripple-init
      data-te-ripple-color="light">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-5 w-5">
        <path
          fill-rule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</div>
          </div>
  
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
              <select
              id="SortBy"
              class="mt-1 rounded border-gray-300 text-sm py-2 px-2"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              >
              <option value="">Sort By</option>
              <option value="Title, DESC">Title, DESC</option>
              <option value="Title, ASC">Title, ASC</option>
              <option value="Price, DESC">Price, DESC</option>
              <option value="Price, ASC">Price, ASC</option>
              </select>
            </div>
    
            {/* <div>
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
                      onClick={()=>{setInStock(false); setOutOfStock(false)}}
                        type="button"
                        class="text-sm text-gray-900 underline underline-offset-4"
                      >
                        Reset
                      </button>
                    </header>
    
                    <ul class="space-y-1 border-t border-gray-200 p-4">
                    <li>
  <label for="FilterInStock" class="inline-flex items-center gap-2">
    <input
      type="checkbox"
      id="FilterInStock"
      class="h-5 w-5 rounded border-gray-300"
      checked={inStock}
      onChange={() => setInStock(!inStock)}
    />
    <span class="text-sm font-medium text-gray-700">
      In Stock
    </span>
  </label>
</li>
<li>
  <label for="FilterOutOfStock" class="inline-flex items-center gap-2">
    <input
      type="checkbox"
      id="FilterOutOfStock"
      class="h-5 w-5 rounded border-gray-300"
      checked={outOfStock}
      onChange={() => setOutOfStock(!outOfStock)}
    />
    <span class="text-sm font-medium text-gray-700">
      Out of Stock
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
  value={minPrice}
  onChange={(e) => setMinPrice(Number(e.target.value))}
/>
                        </label>
    
                        <label for="FilterPriceTo" class="flex items-center gap-2">
                          <span class="text-sm text-gray-600">$</span>
    
                          <input
  type="number"
  id="FilterPriceTo"
  placeholder="To"
  class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
  value={maxPrice}
  onChange={(e) => setMaxPrice(Number(e.target.value))}
/>
                        </label>
                      </div>
                    </div>
                  </div>
                </details>
    
            
              </div>
            </div> */}
          </div>
    
          <div class="lg:col-span-3"> 
            <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            { sortedProducts.map((product) => (
      <ProductCards key={product.productId} product={product} />
    ))}
    
            </ul>
          </div>
        </div>
      </div>
    </section>

      )

      } 
<Footer/>
    </div>
  )
}

export default DemoPro