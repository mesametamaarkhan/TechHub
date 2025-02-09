import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import SignupPage from './pages/SignUp';
import LoginPage from './pages/Login';
import CartPage from './pages/Cart';
import Profile from './pages/Profile';

const App = () => {
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
        </Routes>
      <Footer />
    </div>
  );
}

export default App;