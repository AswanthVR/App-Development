import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from './Pages/Home';
 
import PrivacyPolicy from './Pages/PrivacyPolicy';
import CartPage from './Pages/CartPage'; 
import FAQ from './Pages/FAQ';
import TandCpage from './Pages/T&Cpage';
import ContactForm from './Pages/ContactUs';
import ScrollToTop from './ScrollToTop'; 
import AddProductPage from './Demo/ProductAddPage';
import ProductListPage from './Demo/ProductListPage'; 
import ViewCustomerPage from './Demo/ViewCustomerPage';
import AddCustomerPage from './Demo/AddCustomerPage'; 
import AboutUs from './Pages/AboutUs';
import AccessDeniedPage from './Pages/AccessDeniedPage';
import SignUpNew from './Pages/Auth/SignUpNew';
import DemoPro from './Pages/Product/DemoPro';
import Category from './Pages/Category/Category';
import WishList from './Pages/WishList/WishList';
import Checkout from './Pages/Checkout/Checkout'; 
import Ordersum from './Pages/Checkout/OrderSummary';
import Dashboard from './Demo/Dashboard'; 
import LoginNew from './Pages/Auth/NewLogin';
import ProductDetails from './Pages/Product/ProductDetails';
import OrderDetailsPage from './Demo/Dashboard';
import CustomerOrders from './Demo/Orders';

function App() {
  const role = localStorage.getItem('role');

  return (
    <BrowserRouter> 
      <ScrollToTop />
      {/* <Navbar/> */}
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<SignUpNew />} />
        <Route path="/login" element={<LoginNew />} />
        <Route path="/shop" element={<DemoPro />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/cart" element={<CartPage />} /> 
        <Route path="/cart" element={<CartPage />} /> 
        <Route path="/aboutus" element={<AboutUs />} /> 
        <Route path="/ContactUs" element={<ContactForm />} /> 
        <Route path="/Terms_And_Conditions" element={<TandCpage />} /> 
        <Route path="/faq" element={<FAQ />} /> 
        <Route path="/category/:id" Component={DemoPro} />
        <Route path="/product/All-products" Component={DemoPro} />
        <Route path="/product/:id" element={<ProductDetails />} />
        {/* //testing */}
        <Route path="/shop_by_category" element={<Category />} />
        <Route path="/wishlist" element={<WishList/>} />     
        <Route path="/checkout" element={<Checkout/>} />     
        <Route path="/order_summary/:id" element={<Ordersum/>} />     
        {role === 'ADMIN' && (
          <>
        <Route path="/ViewProducts" element={<ProductListPage />} />  
        <Route path="/addProducts" element={<AddProductPage/>} />  
        <Route path="/admin_dashboard" element={<Dashboard/>} />   
          <Route path="/Users" element={<ViewCustomerPage />} />
          <Route path="/AUsers" element={<AddCustomerPage />} />
          <Route path="/customer_orders" element={<CustomerOrders />} />
          </>
        )}
         {/* <Route path="*" element={<ProductDetails/>} />  */}
         <Route path="*" element={<AccessDeniedPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
