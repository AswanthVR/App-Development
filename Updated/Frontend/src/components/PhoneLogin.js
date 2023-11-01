import React ,{useState} from 'react'
import {BsHandThumbsUp, BsShieldLockFill , BsTelephoneFill} from 'react-icons/bs'
import OtpInput from  'otp-input-react'
import PhoneInput from 'react-phone-input-2'
import {CgSpinner} from 'react-icons/cg'
import 'react-phone-input-2/lib/style.css' 
import { toast, Toaster } from 'react-hot-toast' 
import { auth } from '../firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const PhoneLogin = ({ userData }) => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [Errormsg , setErrormsg] = useState('');
  const [Login , setLogin] = useState(false);
  const navigate = useNavigate();
  const { firstName, lastName, email, password } = userData;

  function checkLogin() {
    setLoading(true);

    // Add your POST request logic here
    axios.post('http://localhost:8080/api/v1/auth/register', {
      name: firstName,
      lastName: lastName,
      email: email,
      phone: ph,  // Assuming 'ph' is the verified phone number
      password: password,
      role: 'USER'
    })
    .then((response) => {
      console.log(response);
      console.log('successful');
      setLoading(false);

      // Redirect to a different page after successful registration
      navigate('/login'); // Change '/success' to your desired path
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        
      );
    }
  }

  function onSignup() {
    if(ph.length<12 ||ph===""){
      toast.error("Invalid Phone Number!");
    // setErrormsg("Invalid Phone Number!")
    }
    else{
      setErrormsg("")
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });}
  }

  function onOTPVerify() {
    setLoading(true)
    window.confirmationResult
    .confirm(otp)
    .then(async (res) => {
      console.log(res);
   
      checkLogin();
      setLoading(false); 
    })
    .catch((err) => {
        toast.error("Invalid OTP!"); 
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      
        <Toaster toastOptions={{ duration: 4000 }} />
    <section className="h-500 w-400 bg-gray-200 p-[10%]">
      {/* <div> */}

      {/* //recaptcha */}
      <div className="fixed overflow-hidden bg-black ">
        <div id="recaptcha-container"></div>
        </div>

        {user ? (
          <h2 className="text-center text-gray-400g font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {/* <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Verify your phone number
            </h1> */}
            {showOTP ? (
              <>
                <p className='text-xs'>We have sent a code to your Phone Number &nbsp;
                  {ph.substring(2,4)}******{ph.substring(10,12)}</p>
                <div className="bg-yellow-500 text-blackw-fit mx-auto p-4 rounded-full">
                  <BsShieldLockFill className='text-black' size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-black text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-yellow-500 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-yellow-500 text-black-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} className='text-black' />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-black text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                {Errormsg && <p className="text-red-400 transition-all">{Errormsg}</p>}
                <button
                  onClick={onSignup}
                  className="bg-yellow-500 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
    
    </section>
    </div>
  );
};
export default PhoneLogin