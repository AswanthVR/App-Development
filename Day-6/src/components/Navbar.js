import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Logo from './Logo';
import {GoPersonFill} from 'react-icons/go'
import { useSelector ,useDispatch} from 'react-redux';
import { logout } from '../features/User';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const user = useSelector((state)=> state.user.value)
  
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAuth = () => {  
    Dispatch(logout());
    navigate('/');
  }

  return (
    <nav className="bg-white border-b border-gray-200 mt-4 h-[65px]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4 md:p-0">
        <Link to="/" className="flex items-center mb-4 md:mb-0">
          <Logo/>
          <span className="ml-1 font-semibold text-gray-900 text-base md:text-xl">Essentia</span>
        </Link>

        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10">
          <li>
            <Link to="/" className="text-gray-900 hover:text-gray-600">Home</Link>
          </li>
          <li>
            <Link to="/products" className="text-gray-900 hover:text-gray-600">Products</Link>
          </li>
          <li>
            <Link to="/rooms" className="text-gray-900 hover:text-gray-600">Rooms</Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-900 hover:text-gray-600">About</Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-900 hover:text-gray-600">Contact</Link>
          </li>
        </ul>

        <SearchBar />
        {user.name && (
  <div className="space-x-4">
    <div className="relative group">
      <GoPersonFill className="cursor-pointer group-hover:text-blue-500" />
      <h1>Hi <span className='font-bold'>{user.name}</span></h1>
      <p onClick={handleAuth} className="hidden group-hover:block bg-white p-2 border rounded absolute top-full left-1/2 transform -translate-x-1/2 bg-red-400 text-white rounded-xl">
        Logout
      </p>
    </div>
  </div>
)}

        
      </div>
    </nav>



  );
};

export default Navbar;
