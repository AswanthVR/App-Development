import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/Auth/LoginPage';
import SignupPage from './Pages/Auth/SignUpPage'; 
import Home from './Pages/Home';
 
import PrivacyPolicy from './Pages/PrivacyPolicy';
import CartPage from './Pages/CartPage'; 
import FAQ from './Pages/FAQ';
import TandCpage from './Pages/T&Cpage';
import ContactForm from './Pages/ContactUs';
import ScrollToTop from './ScrollToTop';
import Shop from './Pages/Shop';
import { DefaultSidebar } from './Demo/SideB';
import AddProductPage from './Demo/ProductAddPage';
import ProductListPage from './Demo/ProductListPage'; 
import ViewCustomerPage from './Demo/ViewCustomerPage';
import AddCustomerPage from './Demo/AddCustomerPage';
import AdminLogin from './Pages/ALogin';
import MegaMenu from './components/Category';
import Navbar from './components/Navbar'; 
import ProductView from './components/ProductView';
import ShowAllProducts from './Pages/ShowAllProducts';
import About1 from './Pages/AboutUs';
import AboutUs from './Pages/AboutUs';
import AccessDeniedPage from './Pages/AccessDeniedPage';
import SignUpNew from './Pages/Auth/SignUpNew';
import DemoPro from './Pages/Product/DemoPro';
import Category from './Pages/Category/Category';
import WishList from './Pages/WishList/WishList';
import Checkout from './Pages/Checkout/Checkout';
import AddressDetails from './Pages/Checkout/Demo';

function App() {
  const role = localStorage.getItem('role');

  return (
    <BrowserRouter> 
      <ScrollToTop />
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/pd" element={<ProductListPage />} />
        <Route path="/register" element={<SignUpNew />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShowAllProducts />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/cart" element={<CartPage />} /> 
        <Route path="/cart" element={<CartPage />} /> 
        <Route path="/aboutus" element={<AboutUs />} /> 
        <Route path="/ContactUs" element={<ContactForm />} /> 
        <Route path="/Terms_And_Conditions" element={<TandCpage />} /> 
        <Route path="/category/:id" Component={DemoPro} />
        <Route path="/product/All-products" Component={DemoPro} />
        <Route path="/product/:id" element={<ProductView />} />
        {/* //testing */}
        <Route path="/shop_by_category" element={<Category />} />
        <Route path="/wishlist" element={<WishList/>} />     
        <Route path="/checkout" element={<Checkout/>} />     
        <Route path="/ViewProducts" element={<ProductListPage />} />
        <Route path="/admin" element={<AddProductPage />} />  
        {role === 'ADMIN' && (
          <>
            {/* <Route path="/admin" element={<AdminLogin />} />   */}
            <Route path="/Users" element={<ViewCustomerPage />} />
            <Route path="/AUsers" element={<AddCustomerPage />} />
          </>
        )}
         {/* <Route path="*" element={<AccessDeniedPage />} /> */}
         <Route path="*" element={<AddressDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
