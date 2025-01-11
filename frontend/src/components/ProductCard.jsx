import React from 'react';

const ProductCard = ({ name, price, image, category }) => {
  return (
    <div className="flex-none w-72">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <span className="text-sm text-blue-600 font-medium">{category}</span>
          <h3 className="text-lg font-semibold text-gray-900 mt-1">{name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">${price}</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;