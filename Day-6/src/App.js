import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignUpPage';
import PhoneLogin from './components/PhoneLogin'; 
import Navbar from './components/Navbar';
import Product from './Pages/Products';  
import Sidebar from './components/Sidebar'; 

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/register" element={<SignupPage />} />
        <Route path="/home" element={<Navbar />} />
        <Route path="/Dashboard" element={<Product />} />
      </Routes>
    </BrowserRouter>
    
  );
} 

export default App;
