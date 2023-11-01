import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md';

const NavLinks = () => {
  const nav = useNavigate();
  const [categories, setCategories] = useState([]); 
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/category/getAll")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

 
  // const navigateToCategory = () => {
  //   // toggleDropdown();
  //   nav("/shop_by_category");
  // }

  return (
    <div className=" " >
      <div className='className="text-white hover:bg-yellow-300 hover:text-black rounded-md px-3 py-2 text-sm font-medium flex'>
        <Link to={"/shop_by_category"}> 
      <button className='text-white hover:text-black space-x-5'>
       Category
      </button>
        </Link> 

      <button className=' text-white'>
        <MdOutlineKeyboardArrowDown   onMouseEnter={toggleDropdown} className='flex  mt-1 ml-1 '/>
        </button>
      </div>

      {isOpen && (
        <div onMouseLeave={toggleDropdown} className="absolute overflow- mt-2 py-2 w-32 bg-white border border-gray-300 shadow-lg rounded">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}  
              className="block px-4 py-2 text-gray-800 hover:bg-yellow-500 hover:text-white"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavLinks;
