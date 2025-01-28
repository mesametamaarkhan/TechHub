import React from 'react';
import ProductCard from './ProductCard';

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
    <section className="py-12">
      <div className="container mx-auto px-4 justify-center items-center">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Best Sellers</h2>
        <div className="flex overflow-x-auto gap-6 pb-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default BestSellers;