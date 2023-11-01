import React, { useEffect } from 'react'
import product from '../ProductData'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';
import {getToken} from '../Security/TokenManager'
 
import { useState } from 'react'

function Shop() { 
  const [products, setProducts] = useState([]); 
  
    const apitoken = getToken('token');
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/product/getProducts',
          {
            headers: {
              'Authorization':`Bearer ${apitoken}` 
            }
          }
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
    <Navbar />
   <div className='overflow-hidden'>
    <section id="Projects"
    class="ml-2 mr-2  grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 justify-items-center items-center gap-y-20 gap-x-14 mt-10 mb-5">
 {
        products.map((products)=>(
          <Card key={products.productId} products={products} />
        ))
      }
    </section> 
    <Footer/>
   </div>
   </div>



  )
}

export default Shop