import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Cover_img from '../../Images/log1.jpg';
import logo from '../../Images/logo1.png';
import React, { useState } from 'react'
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PhoneLogin from '../../components/PhoneLogin';
import {AiFillCloseCircle} from 'react-icons/ai';

import Footer from '../../components/Footer';

export default function SignUpNew() {
  const navigate = useNavigate();
  const [phone , setPhone] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showErrors, setShowErrors] = useState(false);
const [loggedIn , setIsLoggedIn] = useState(false);
const [ErrorloggedIn , setIErrorsLoggedIn] = useState(false);
const [msg , setMsg] = useState("User Already Exists");
const [msgclr , setMsgclr] = useState('red');

const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8 && password.length <= 15;
};

const handleSubmit = (e) => {

  
  setShowErrors(true);
 


  if (password !== confirmPassword) {
      setPasswordError("The passwords do not match.");
      return;
  }

  if (!validatePassword(password)) {
      setPasswordError("Password must be between 8 and 15 characters.");
      return;
  }

  if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      return;
  }

  if (firstName === lastName) {
      setEmailError("First name and last name cannot be the same.");
      return;
  }



  else{
    e.preventDefault();
    setPhone(true);

  // axios.post('http://localhost:8080/api/v1/auth/register',{
  // name:firstName,
  // lastName:lastName, 
  // email:email,
  // phone:0,
  // password:password,
  // role:'USER'
  // }).then((response) => {
    
  //   console.log(response);
  //   console.log("successful");
    
  //   setMsg("Successfully Registered")
  //   setPhone(true);
  //     setIsLoggedIn(true);
  //     // Navigate to home page after 2 seconds
  //     setTimeout(() => {
  //       navigate('/login');
  //     }, 2000);

  // }).catch((error) => {
  //     setMsg("User Already Exists")
  //     setIErrorsLoggedIn(true);
  //     setTimeout(() => {
  //         setIErrorsLoggedIn(false);
  //       }, 2000);

  //     console.log(error);

  // })


  }

  setPasswordError('');
  setEmailError('');

  
}
const HandlePhoneLogin = (e) => {
  // usePhone(e);
 }

  return (

    <div>
      { ErrorloggedIn&&<div className='animate-[fadeInDown_1s]  overflow-hidden '>
      <div class="bg-red-500 px-4 py-1 text-white overflow-hidden">
  <p class="text-center text-sm font-medium">
    {msg}
    
  </p>
</div>
</div>}
{/* //anouncement */}
{loggedIn&&<div className='animate-[fadeInDown_1s]  overflow-hidden '>
      <div class="bg-yellow-500 px-4 py-1 text-white overflow-hidden">
  <p class="text-center text-sm font-medium">
    {msg}
    
  </p>
</div>
</div>}
      

<section class="bg-white">
  <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section
      class="relative flex h-32 items-start bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
    >
      <img
        alt="Night"
        // src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        src={Cover_img}
        class="absolute inset-0 h-full w-full object-cover opacity-80"
      />

   
    </section>

    <main
      class="flex  justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16  xl:col-span-6"
    >
      <div class="max-w-xl lg:max-w-3xl">
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
            Welcome to Essentia
          </h1>

          <p class="mt-4 leading-relaxed text-gray-500">
          Step into Essentia - Where Homes Find Harmony
          </p>
        </div>



   <div class="hidden lg:relative lg:block  lg:t-0">
        {/* <a class="block text-white" href="/">
       
          <img  class="h-16 sm:h-12  text-2xl" src={logo}></img>
        </a> */}


        <h2 class="  text-2xl font-bold text-black sm:text-3xl md:text-4xl  ">
          Welcome to Essentia 
        </h2>

        <p class="mt-2 leading-relaxed font-light text-black/90">
        Step into Essentia - Where Homes Find Harmony
        </p>
      </div>
        <form action="#" class="mt-8 grid grid-cols-6 gap-5  ">
          <div class="col-span-6 sm:col-span-3">
            <label
              for="FirstName"
              class="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>

            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              class="py-2 mt-1 w-full rounded-md border-gray-300 border-[0.5px] bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label
              for="LastName"
              class="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>

            <input
             type="text"
             placeholder="Last Name"
             value={lastName}
             onChange={(e) => setLastName(e.target.value)}
            class="mt-1 py-2 w-full rounded-md border-gray-300 border-[0.5px] bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div class="col-span-6">
            <label for="Email" class="block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            class={`overflow-hidden mt-1 py-2 w-full rounded-md border-gray-300 border-[0.5px] bg-white text-sm text-gray-700 shadow-sm
            ${
              !showErrors || validateEmail(email) ? '' : 'border-red-500'
          }`}   />
           {showErrors && !validateEmail(email) && <p className="text-red-500 overflow-hidden">Invalid email address.</p>}

          </div>

          <div class="col-span-6 sm:col-span-3">
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
             class={`mt-1 py-2 w-full rounded-md border-gray-300 border-[0.5px] bg-white text-sm text-gray-700 shadow-sm
             ${
              !showErrors || validatePassword(password) ? '' : 'border-red-500'
          }`} />
             {showErrors && !validatePassword(password) && (
                            <p className="text-red-500">Password must be between 8 and 15 characters.</p>
                        )}

          </div>

          <div class="col-span-6 sm:col-span-3">
            <label
              for="PasswordConfirmation"
              class="block text-sm font-medium text-gray-700"
            >
              Password Confirmation
            </label>

            <input
             type="password"
             placeholder="Confirm Password"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
              class={`mt-1 w-full rounded-md py-2 border-gray-300 border-[0.5px] focus:border-yellow-400 bg-white text-sm text-gray-700 shadow-sm
              ${
                !showErrors || password === confirmPassword ? '' : 'border-red-500'
            }`}
        />
        {showErrors && password !== confirmPassword && <p className="text-red-500">The passwords do not match.</p>}
    
          </div>

          <div class="col-span-6">
            <label for="MarketingAccept" class="flex gap-4">
              <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
                 class="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
              />

              <span class="text-sm text-gray-700 space-y-5">
              <p class="text-sm text-gray-500">
              By creating an account, you agree to our &nbsp;
              <a href="#" class="text-gray-700 underline">
                terms and conditions &nbsp;
              </a>
              and &nbsp;
              <a href="#" class="text-gray-700 underline">privacy policy</a>.
            </p>
              </span>
            </label>
          </div>

          
          </form>

          {/* <div class="row-span-6 sm:flex sm:items-center sm:gap-4"> */}
       

<div className="flex flex-col  items-center justify-center space-y-5  mt-4 ">
  {/* <div className=""> */}
    <button   onClick={handleSubmit}
      className="w-full inline-block shrink-0 rounded-md border border-yellow-500 bg-yellow-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-yellow-600 focus:outline-none focus:ring active:text-yellow-400"
    >
      Create an account
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
    <Link to={"/login"} >  Already have an account? 
      <a href="#" className="text-gray-700 underline">Log in</a>.</Link>
    </p>
  {/* </div> */}
</div>
 

       
      </div>
    </main>
  </div>
</section>
<Footer/>
{
                phone && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-md">
                 <PhoneLogin userData={{ firstName, lastName, email, password }} />

                    <AiFillCloseCircle  onClick={() => setPhone(false)}  className="absolute  text-white  bg-transparent rounded-full  cursor-pointer   top-2" size={70} />
                </div>
                )
              }
    </div>
  )
}
