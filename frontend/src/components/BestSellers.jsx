import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const products = [
  {
    id: 1,
    name: 'MacBook Pro M2',
    price: 1299.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3',
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    price: 999.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3',
  },
  // Add more products as needed
];

const BestSellers = () => {
  return (
    <section className="py-12 bg-dark-greenish-gray">
      <div className="container mx-auto px-4 justify-center items-center">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
                <motion.div
                    key={index}
                    className="bg-black rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
                >
                    <ProductCard key={index} product={product} />
                </motion.div>
            ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default BestSellers;