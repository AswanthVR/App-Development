import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignUpPage';
import PhoneLogin from './components/PhoneLogin'; 
import Navbar from './components/Navbar';
import Product from './Pages/Products';  
import Sidebar from './components/Sidebar'; 
import ProfileContainer from './components/ProfileContainer'
import Home from './Pages/Home';
import Homefeature from './components/home/homefeature';
import HomeSaleInfo from './components/home/HomeSaleInfo';
import Footer from './components/Footer';
import NewsLetter from './components/home/NewsLetter';
import Shop from './components/Shop';
function App() {
  return (
    <div>    
      <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Shop/>} /> 
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Product />} />
   
      </Routes>
    {/* <Footer/> */}
    </BrowserRouter>

    </div>

  );
} 

export default App;
