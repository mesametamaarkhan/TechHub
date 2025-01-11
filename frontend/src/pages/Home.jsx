import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 999,
      image: "https://images.unsplash.com/photo-1696423736792-2d5be7ce4f7d",
      category: "Phones",
      rating: 4.8
    },
    {
      id: 2,
      name: "MacBook Pro M3",
      price: 1499,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      category: "Laptops",
      rating: 4.9
    },
    {
      id: 3,
      name: "AirPods Pro",
      price: 249,
      image: "https://images.unsplash.com/photo-1588156979435-379b9d365296",
      category: "Accessories",
      rating: 4.7
    },
    {
      id: 4,
      name: "Samsung Galaxy S24",
      price: 899,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
      category: "Phones",
      rating: 4.6
    }
  ];

  const categories = [
    {
      id: 1,
      name: "Smartphones",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      count: "50+ Products"
    },
    {
      id: 2,
      name: "Laptops",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      count: "30+ Products"
    },
    {
      id: 3,
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
      count: "100+ Products"
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">Welcome to TechHub</h1>
            <p className="text-xl mb-8">Discover the latest in technology. From cutting-edge smartphones to powerful laptops, find everything you need in one place.</p>
            <Link to="/products" className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors inline-block">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Categories</h2>
        <div className="grid justify-center grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map(category => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Top Products</h2>
          <div className="relative">
            <div className="flex justify-center space-x-6 overflow-x-auto pb-4">
              {products.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;