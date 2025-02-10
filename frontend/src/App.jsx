import React from 'react';
import { Routes, Route, Router, useNavigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navbar from "@/components/Navbar.jsx";
import Footer from '@/components/Footer.jsx';
import Shop from '@/pages/Shop.jsx';
import ProductDetail from '@/pages/ProductDetail.jsx';
import SignupPage from '@/pages/SignUp.jsx';
import LoginPage from '@/pages/Login.jsx';
import CartPage from '@/pages/Cart.jsx';
import Profile from '@/pages/Profile.jsx';
import useTokenRefresher from '@/utility/UseTokenRefresher.js';
import AboutUs from '@/pages/About.jsx';

const App = () => {
  const navigate = useNavigate();
  useTokenRefresher(navigate);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path='/about' element={<AboutUs />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;