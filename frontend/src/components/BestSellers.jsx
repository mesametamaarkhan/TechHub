import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);    
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://tech-mart-hb7jgm4su-mesametamaarkhans-projects.vercel.app/products/best-sellers"); 
        setProducts(response.data.products);
      } 
      catch (error) {
        console.error("Error fetching products", error);
        setError("Failed to load products");
      } 
      finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-12 bg-dark-greenish-gray">
      <div className="container mx-auto px-4 justify-center items-center">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Best Sellers</h2>

        {/* Show loading spinner or error message */}
        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                className="bg-black rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/shop')}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
