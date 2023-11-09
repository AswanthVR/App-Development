import React, { useState,useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import Cover_img from '../../Images/login2.jpg';
import PhoneLogin from '../../components/PhoneLogin';
import {AiFillCloseCircle} from 'react-icons/ai';
import {FaMobileAlt} from 'react-icons/fa'; 
import {login,logout} from '../../features/User';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import  {setToken,getToken} from '../../Security/TokenManager'
import Footer from '../../components/Footer';
import logo from '../../Images/logo1.png';


export default function LoginNew() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [phone , usePhone] = useState(false);
  const [loggedIn , setIsLoggedIn] = useState(false);
  const [msg , setMsg] = useState("");
  const [msgclr , setMsgclr] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function checkLogin(){
    navigate('/');
    console.log('Login Failed')
  }
  const HandleLogin = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   
    if (!email.match(emailPattern)) {
     
      setErrorMessage('Please enter a valid email address.');
      


    } else {

      axios.post('http://localhost:8080/api/v1/auth/login', {
        email: email,
        password: password
    }).then((response) => {
        const token = response.data.token;
        console.log(token);
        setToken(token);

        const token1 = getToken('token');
        localStorage.setItem('email', email);
        localStorage.setItem('uid', response.data.uid);

        console.log(localStorage.getItem('uid'));
        setMsg("Login successful")
        setMsgclr("yellow")
        setIsLoggedIn(true);

        // Navigate to home page after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 1000);

    }).catch((error) => {
      setMsgclr("red")
    setMsg("Oops! Something went wrong.")
        console.log(error);
    });
 
    }
  };

 const HandlePhoneLogin = (e) => {
  usePhone(e);
 }
 
 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
 
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (

    <div>
    {msg&&<div className='animate-[fadeInDown_2s]  inset-0 fixed'>
    <div class={`bg-${msgclr}-500 px-4 py-1 text-white zoomIn `}>
<p class="text-center text-sm font-medium">
  {msg}
  
</p>
</div>
</div>}
{/* //anouncement */}
 
      
<div className='md:px-16 md:py-8 md:bg-yellow-100 md:h-screen'>
<div className='p-6 bg-white rounded-3xl'>
<section class="bg-white">
  <div class="lg:grid lg:h-[550px]  lg:grid-cols-12">
  {/* <div class="lg:grid lg:min-h-screen lg:grid-cols-12"> */}
    <section
      class="relative flex h-32 items-start lg:col-span-5 lg:h-[500px] xl:col-span-6 "
    >
      <img
        alt="Night"
        // src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        src="https://th.bing.com/th/id/OIG.yz0YvgV2WJA7ZhBkIzsr?pid=ImgGn"
        class="lg:rounded-l-3xl lg:rounded-none rounded-3xl rounded-l-xl  absolute inset-0 lg:h-[550px] w-full object-cover opacity-100 h-full"
      />

   
    </section>

    <main
      class="flex  justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16  xl:col-span-6"
    >
      <div class="max-w-xl lg:max-w-3xl  mx-10 ">
        <div class="relative -mt-16 block lg:hidden">
          <a
            class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-yellow-600 sm:h-20 sm:w-20"
            href="/"
          >
            <span class="sr-only">Home</span>
            <img  class="h-16 sm:h-12  text-2xl" src={logo}></img>
          </a>

          <h1
            class="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
          >
            Welcome Back to Essentia
          </h1>

          <p class="mt-4 leading-relaxed text-gray-500">
          Step into Essentia - Where Homes Find Harmony
          </p>
        </div>



   <div class="hidden lg:relative lg:block  lg:t-0 ">
        {/* <a class="block text-white" href="/">
       
          <img  class="h-16 sm:h-12  text-2xl" src={logo}></img>
        </a> */}


        <h2 class="  text-2xl font-bold text-black sm:text-3xl md:text-3xl  ">
          Welcome Back to Essentia
        </h2>

        <p class="mt-2 leading-relaxed  text-black/90 font-thin">
        Step into Essentia - Where Homes Find Harmony
        </p>
      </div>
        <form action="#" class="mt-8 grid grid-cols-6 gap-5  ">
  


          <div class="col-span-6">
            <label for="Email" class="block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          </div>

          <div class="col-span-6  ">
            <label
              for="Password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
             type="password"
             placeholder="Password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
             />
          </div>
 

          <div class="col-span-6 md:w-[600px]">
            <label for="MarketingAccept" class="flex gap-4">
              <input
              type="checkbox" 
              // onChange={() => setAgreeTerms(!agreeTerms)}
                 class="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
              />

              <span class="text-sm text-gray-700 space-y-5 ">
              <p class="text-sm text-gray-500">
              Remember Me &nbsp;
               </p>
              </span>
            </label>
          </div>

          
          </form>

          {/* <div class="row-span-6 sm:flex sm:items-center sm:gap-4"> */}
       

<div className="flex flex-col  items-center justify-center space-y-5  mt-4 ">
  {/* <div className=""> */}
    <button   onClick={HandleLogin}
      className="w-full inline-block shrink-0 rounded-md border border-yellow-500 bg-yellow-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-yellow-600 focus:outline-none focus:ring active:text-yellow-400"
    >
      Login
    </button>
  {/* </div> */}

  {/* <div className=""> */}
  <div className="w-full flex items-center justify-center relative py-2">
                        <div className="w-full h-[1px] bg-black"></div>
                        <p className="text-lg absolute  text-black/80 bg-[#E0E0E0]"></p>
    </div>
    <GoogleOAuthProvider clientId="888255469108-d8pet2nr7lr10qc04abnad2o8cturr6m.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse)
          var decoded = jwt_decode(credentialResponse.credential);
          console.log(decoded);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider> 
 
    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
    <Link to={"/register"} > 
    <p className="text-sm font-normal text-[#060606] ">Don't have an account? <span className="font-semibold underline ring-offset-2 cursor-pointer">Sign up Now</span></p></Link>
    </p>
 
</div>
 

       
      </div>
    </main>
  </div>
</section>
</div>
</div>
{/* <Footer/> */}

    </div>
  )
}
