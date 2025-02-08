import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TechMart</h3>
            <p className="text-gray-400">Your one-stop shop for premium electronics</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-600">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-600">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-600">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-600">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-600"><FiFacebook size={24} /></a>
              <a href="#" className="hover:text-green-600"><FiTwitter size={24} /></a>
              <a href="#" className="hover:text-green-600"><FiInstagram size={24} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-white text-black"
              />
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TechMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;