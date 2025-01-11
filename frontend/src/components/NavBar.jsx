import React, { useState, useEffect } from 'react';
import { ShoppingCart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  // Mocking user authentication state
  const [user, setUser] = useState(null);

  // Simulate fetching user data (replace with actual logic)
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user')); // Assume user is stored in localStorage
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const navigate = useNavigate(); // Create the navigate function

  // Handler for navigating to the account page
  const handleUserClick = () => {
    navigate('/account'); // Navigate to the account page
  };

  // Handler for navigating to the cart page
  const handleCartClick = () => {
    navigate('/cart'); // Navigate to the cart page
  };

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
            {user ? (
              <button onClick={handleUserClick} className="flex items-center text-gray-700 hover:text-blue-900">
                <User className="h-6 w-6" />
                <span className="ml-2 hidden md:inline">{user.name}</span>
              </button>
            ) : (
              <button onClick={handleUserClick} className="flex items-center text-gray-700 hover:text-blue-900">
                <User className="h-6 w-6" />
                <span className="ml-2 hidden md:inline">Login</span>
              </button>
            )}
            <button onClick={handleCartClick} className="flex items-center text-gray-700 hover:text-blue-900 relative">
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