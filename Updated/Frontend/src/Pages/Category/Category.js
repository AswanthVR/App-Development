import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Category() {
    return (
      <>
      <Navbar/>
        <div className="pb-16">
            <div className="flex justify-center items-center">
                <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
                    <div className="flex flex-col jusitfy-center items-center space-y-10">
                        <div className="flex flex-col justify-center items-center space-y-2">
                           
                            <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">Shop By Category</h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 md:gap-x-8 w-full">
                               <Link to="/category/1">
                            <div className="relative group flex justify-center items-center h-[600px] w-full">
                                <img className="object-center object-cover h-full w-full" src="https://images.pexels.com/photos/5824543/pexels-photo-5824543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="girl-image" />
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">Kitchen and Dining</button>
                                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                            </div>
                                </Link>
                            <div className="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0">
                            <Link to="/category/4">    <div className="relative group flex justify-center items-center h-[280px] w-full">
                                    <img className="object-center object-cover h-full w-full" src="https://images.pexels.com/photos/6207819/pexels-photo-6207819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="shoe-image" />
                                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">Bedding</button>
                                    <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                                </div></Link> 

                                <Link to="/category/8">   
                                <div className="relative group flex justify-center items-center h-[285px] w-full">
                                    <img className="object-center object-cover h-full w-full" src="https://th.bing.com/th/id/OIG.WwqpHX3Y.agalvKUh53t?pid=ImgGn" alt="watch-image" />
                                    
                                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">Appliances</button>
                                    <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                                </div>
                                </Link>

                            </div>
                            <Link to="/category/2">  
                             <div className="relative group justify-center items-center h-[600px] w-full hidden lg:flex">
                                <img className="object-center object-cover h-full w-full" src="https://images.pexels.com/photos/4083654/pexels-photo-4083654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="girl-image" />
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">Home Decors</button>
                                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                            </div></Link> 
                     
                        </div>
                 
                    </div>
                </div>
            </div>
            <section className="mt-[-100px]">
  <div class="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full  ">
    

    <ul class="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
      <li>
      <Link to="/category/7">
        <a href="#" class="relative block group">
          <img
            src="https://th.bing.com/th/id/OIG.0dcSBxC.B3yr.TajH9vR?pid=ImgGn"
            alt=""
            class="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
          />

          <div
            class="absolute inset-0 flex flex-col items-center justify-end p-6"
          >
            

            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 
            absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">Storage & organisation</button>

          </div>
        </a></Link> 
      </li>

      <li>
      <Link to="/category/5">  
        <a href="#" class="relative block group">
          <img
            src="https://th.bing.com/th/id/OIG.cdQGNBTrNeJZhbQCwOfg?pid=ImgGn"
            alt=""
            class="object-cover w-full transition duration-500 aspect-square group-hover:opacity-100 brightness-75 hover:brightness-100"
          />

          <div
            class="absolute inset-0 flex flex-col items-center justify-end p-6"
          >
<button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 
absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white ">Clealning Supplies</button>

          </div>
        </a>
        </Link> 
      </li>

      <li class="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
      <Link to="/category/3">  
        <a href="#" class="relative block group">
          <img
            src="https://th.bing.com/th/id/OIG.5MqSAntaS48sSEopVhk4?pid=ImgGn"
            alt=""
            class="object-cover w-full transition duration-500 aspect-square group-hover:opacity-100 brightness-75"
          />

<div
            class="absolute inset-0 flex flex-col items-center justify-end p-6"
          >
<button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 
absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white ">Furnitures</button>

          </div>
        </a>
        </Link> 
      </li>
    </ul>
  </div>
</section>

            
        </div>

        <Footer/>
        </>
    );
}
