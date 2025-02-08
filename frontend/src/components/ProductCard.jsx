import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div
      className="bg-black rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
    >
      <Link to={`/products/${product._id}`} className="block">
        <div className="p-6">
          <img
            src={product.firstImage}
            alt="Product"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div className="flex items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">{product.title}</h3>
              <h4 className="text-md text-gray-400">{product.shortDescription}</h4>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="ml-2 text-white">{product.rating}</span>
            </div>
            <p className="text-gray-400 text-sm">${product.price}</p>
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg transition-colors duration-300 text-white"
          >
            View Product
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
