import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { addToCart, fetchWishlist } from "../../API/Server";
import axios from "axios";
import { getToken } from "../../Security/TokenManager";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function WishList() {
    const [wishlist , setWishlist] = useState([]);
    const id = localStorage.getItem('uid');
    useEffect(() => {
    // Inside your useEffect
axios.get(`http://localhost:8080/api/wishlist/user/${id}`, {
    headers: { 'Authorization': `Bearer ${getToken('token')}` }
  })
    .then(response => {
      console.log(response.data);
      setWishlist(response.data); 
      console.log(wishlist) 
    })
    .catch(error => {
      console.error('Error fetching cart data:', error);
    });
  
        }, [id]);

        const removeFromWishlist = async (id) => {
            console.log(id)
            axios.delete(`http://localhost:8080/api/wishlist/${id}`,{
              headers: {
                'Authorization':`Bearer ${getToken('token')}` 
              }
            }
            ).then((response)=>{
                console.log(response);
                setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id));
                toast.success("Successfully removed from your WishList");
            })
            .catch((error)=>{
              console.log(error);
            }) 
          };
          


return (
        <>
            <Navbar/>
        {(wishlist.length === 0)?(<div>
            
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 mt-[-70px]">
  
     <img className=""
     src="https://www.tatacliq.com/src/account/components/img/emptyWishlist.svg"
     />
        <h1 className="mt-4 md:text-2xl font-thin text-gray-800 text-sm ">You have not added any products to your wishlist</h1>

        <div class="mt-4">
                              <Link to={'/product/All-products'} > <button 
                                class="block w-full rounded text-yellow-400 border-yellow-600 border-[1px] bg-white p-4 text-lg font-medium transition hover:scale-105 "
                                >
                                Continue Shopping
                                </button></Link>
                                </div>
    
    </div></div>)
        :
        (
            <div className=" py-12">
            <Toaster/>
            {/* Desktop Responsive Start */}
            <div className=" sm:flex flex-col justify-start items-start">
                <div className="pl-4 lg:px-10 2xl:px-20 flex flex-row justify-center items-end space-x-4">
                    <h1 className="text-4xl font-semibold leading-9 text-gray-800">Favourites</h1>
                    <p className="text-base leading-4 text-gray-600 pb-1">({wishlist.length} Items)</p>
                </div>
                <table className="w-full mt-16 whitespace-nowrap">
                    <thead aria-label="table heading" className="w-full h-16 text-left py-6 bg-gray-50 border-gray-200 border-b ">
                        <tr>
                            <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-20 pl-4 lg:pl-10">YOUR PRODUCT</th>
                            <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">DESCRIPTION</th>
                            <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">PRICE</th>
                            <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">MORE OPTIONS</th>
                            <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-28 2xl:pr-20 pr-4 lg:pr-10" />
                        </tr>
                    </thead>
                    <tbody className="w-full text-left">
                        {wishlist.map((item)=>(
                            
                        <tr  key={item.id} className="border-gray-200 border-b  ">
                            <th>
                                <img className="my-10 pl-4 lg:pl-10 2xl:pl-20 h-[100px]" src={item.product.imageURL[0]} alt="shoe" />
                            </th>
                            <th className="mt-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                                <p className=" text-base leading-4 text-gray-800">{item.product.productName}</p>
                            </th>
                            <th className="my-10  pl-6 lg:pl-20 2xl:pl-52">
                                <p className>₹ {item.product.productPrice}</p>
                            </th>
                            <th className="my-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                                <a href="javascript:void(0)" className="hover:underline text-base font-medium leading-none  text-gray-800 focus:outline-none focus:underline">
                                    View details
                                </a>
                            </th>
                            <th className="my-10 pl-4 lg:pl-12  2xl:pl-28 pr-4 2xl:pr-20">
                            <div class="mt-2">
                                <button
                                onClick={()=>removeFromWishlist(item.id)}
                                class="block w-full rounded bg-red-500 p-2 text-sm font-medium transition hover:scale-105 text-white"
                                >
                                Remove 
                                </button>
                                </div>
                                <div class="mt-2">
                                <button
                                onClick={()=>addToCart(item.product)}
                                class="text-white block w-full rounded bg-yellow-400 p-2 text-sm font-medium transition hover:scale-105 "
                                >
                                Add to Cart 
                                </button>
                                </div>
                            </th>
                        </tr>
                       ) )}
                       
                      
                    </tbody>
                </table>
            </div>
           
           
            {/* Mobile Responsive End */}
        </div>
        )}
        <Footer/>
        </>
    );
}
