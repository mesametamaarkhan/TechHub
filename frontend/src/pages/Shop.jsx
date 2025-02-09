import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8080/products/");
                setProducts(res.data.products);
            } 
            catch (error) {
                console.log(error);
            }
        };

        getProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const searchMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        return searchMatch;
    });

    return (
        <div className="min-h-screen bg-dark-greenish-gray pt-20 px-4 sm:px-6 lg:px-8 pb-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl font-bold mt-4">Shop</h1>
                    <p className="mt-2 text-white">Find the perfect product for your needs</p>
                </motion.div>

                {/* Search Bar and Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black border border-white rounded-lg py-2 px-4 pl-10 focus:ring-white focus:ring-2"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                    </div>
                </div>

                {/* Product Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={index}
                            className="bg-black rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
                        >
                            <ProductCard key={index} product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;