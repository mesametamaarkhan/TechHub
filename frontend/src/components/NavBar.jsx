import React from 'react';
import { FiShoppingCart, FiHeart, FiUser, FiSearch } from 'react-icons/fi';

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-black">
            <a href="/" className="text-black">TechMart</a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-black">Home</a>
            <a href="/shop" className="text-black">Shop</a>
            <a href="/about-us" className="text-black">About Us</a>
            <a href="/contact" className="text-black">Contact</a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <FiSearch className="absolute right-3 top-3 text-black" />
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 text-black"
              onClick={() => alert('Cart clicked!')}
              >
              <FiShoppingCart size={20} />
            </button>
            <button 
              className="p-2 text-black"
              onClick={() => alert('Wishlist clicked!')}
              >
              <FiHeart size={20} />
            </button>
            <button 
              className="p-2 text-black"
              onClick={() => alert('User clicked!')}
              >
              <FiUser size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;