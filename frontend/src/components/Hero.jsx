import React from 'react';
import laptop from '../assets/laptop.webp';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="relative h-[500px]">
        <img
          src={laptop}
          alt="Electronics Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold mb-4 text-gray-100">
                Next-Gen Tech at Your Fingertips
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Discover amazing deals on the latest electronics and gadgets
              </p>
              <div className="space-x-4">
                <button 
                  onClick={() => navigate('/shop')}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;