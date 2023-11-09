import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { fetchWishListCount } from '../API/Server';
import { useState } from 'react';
import { count } from '@syncfusion/ej2/richtexteditor';

export default function WishListIcon() {

    const [Count, setCount] = useState(0);
 
    fetchWishListCount()
      .then(count => {
        setCount(count);
        console.log(count);
      })
      .catch(error => {
        console.error(error.message);
      });
   
  return (
<div className="text-white flex  cursor-pointer">
    <div className='relative'>
        <AiOutlineHeart className="text-white w-12 text-2xl"/>
        </div>
        <div className='ml-[-16px] mt-[-5px]'>
        <div className=' bg-yellow-300 text-black rounded-full  px-1.5 py-0.5 hover:animate-pulse  '>
        <p className='text-[12px]'>{Count}</p>
      </div>
      </div>
 
</div>
  )
}
