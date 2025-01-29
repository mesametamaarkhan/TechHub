import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 5000],
    brand: '',
    rating: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  const currentProducts = Array.from({ length: 50 }, (_, index) => ({
    name: `Product ${index + 1}`,
    description: `Description for product ${index + 1}`,
    rating: (Math.random() * 5).toFixed(1),
    price: (Math.random() * 2000 + 100).toFixed(2),
    brand: ['Samsung', 'Apple', 'Dell', 'HP', 'Lenovo'][Math.floor(Math.random() * 5)],
    image: 'https://via.placeholder.com/150',
  }));

  const categories = ['All', 'Laptops', 'Phones', 'Accessories'];
  const brands = ['All', 'Dell', 'HP', 'Apple', 'Samsung', 'Lenovo'];

  const handleCategoryChange = (category) => {
    setFilters((prevFilters) => ({
        ...prevFilters,
        category: category === 'All' ? '' : category,
    }));
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (value) => {
    setFilters((prevFilters) => ({
        ...prevFilters,
        priceRange: [0, parseInt(value)],
    }));
    setCurrentPage(1);
  };

  const handleBrandChange = (brand) => {
    setFilters((prevFilters) => ({
        ...prevFilters,
        brand: brand === 'All' ? '' : brand,
    }));
    setCurrentPage(1);
  };

    const filteredProducts = currentProducts.filter(product => {
        const categoryMatch = !filters.category || product.description.includes(filters.category);
        const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        const brandMatch = !filters.brand || product.brand === filters.brand;

        return categoryMatch && priceMatch && brandMatch;
    });

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const displayedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className='flex flex-col md:flex-row gap-8'>
                {/* Filters */}
                <div className='w-full md:w-64 bg-white text-black p-6 rounded-lg shadow-md h-fit'>
                    <h2 className='text-xl font-bold mb-6'>Filters</h2>

                    {/* Category Filter */}
                    <div className='mb-6'>
                        <h3 className='font-semibold mb-3'>Category</h3>
                        <div className='space-y-2'>
                        {categories.map((category) => (
                            <label key={category} className='flex items-center'>
                            <input
                                type='radio'
                                name='category'
                                value={category}
                                checked={filters.category === category}
                                onChange={() => handleCategoryChange(category)}
                                className='mr-2'
                            />
                            {category}
                            </label>
                        ))}
                        </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className='mb-6'>
                        <h3 className='font-semibold mb-3'>Price Range</h3>
                        <input
                        type='range'
                        min={100}
                        max={5000}
                        value={filters.priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(e.target.value)}
                        className='w-full'
                        />
                        <div className='flex justify-between text-sm text-black'>
                        <span>$0</span>
                        <span>${filters.priceRange[1]}</span>
                        </div>
                    </div>

                    {/* Brand Filter */}
                    <div className='mb-6'>
                        <h3 className='font-semibold mb-3'>Brand</h3>
                        <div className='space-y-2'>
                        {brands.map((brand) => (
                            <label key={brand} className='flex items-center'>
                            <input
                                type='radio'
                                name='brand'
                                value={brand}
                                checked={filters.brand === brand}
                                onChange={() => handleBrandChange(brand)}
                                className='mr-2'
                            />
                            {brand}
                            </label>
                        ))}
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <div className='flex-1'>
                    <div className='text-xl font-semibold mb-6 text-black'>
                        {/* Display number of products */}
                        <p>Displaying {displayedProducts.length} product{displayedProducts.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {displayedProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                    <div className='flex items-center justify-between rounded-lg bg-white px-4 py-3 mt-4 sm:px-6'>
                        <div className='flex flex-1 justify-between'>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`relative inline-flex items-center rounded-md border border-gray-300 bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 ${
                                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                Previous
                            </button>
                            <div className="items-center mt-2">
                                <p className="text-md text-gray-700">
                                    Showing Page <span className="font-medium">{currentPage}</span> of{' '}
                                    <span className="font-medium">{totalPages}</span>
                                </p>
                            </div>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`relative inline-flex items-center rounded-md border border-gray-300 bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 ${
                                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;