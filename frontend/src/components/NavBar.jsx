import React from 'react';
import { ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-blue-900">TechHub</a>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <a href="/" className="text-gray-700 hover:text-blue-900">Home</a>
                <a href="/products" className="text-gray-700 hover:text-blue-900">Products</a>
                <a href="#" className="text-gray-700 hover:text-blue-900">Categories</a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-700 hover:text-blue-900">
              <User className="h-6 w-6" />
              <span className="ml-2 hidden md:inline">Login</span>
            </button>
            <button className="flex items-center text-gray-700 hover:text-blue-900 relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;