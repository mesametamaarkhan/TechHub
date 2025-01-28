import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 5000],
    brand: '',
    rating: 0,
  });

  const currentProducts = [
    { name: 'Product 1', description: 'Product 1 description', rating: 4.5, price: 499.99, brand: 'Samsung', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3' },
    { name: 'Product 2', description: 'Product 2 description', rating: 3.5, price: 299.99, brand: 'Apple', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3' },
    { name: 'Product 3', description: 'Product 3 description', rating: 5, price: 699.99, brand: 'Dell', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3' },
  ];

  const categories = ['All', 'Laptops', 'Phones', 'Accessories'];
  const brands = ['All', 'Dell', 'HP', 'Apple', 'Samsung', 'Lenovo'];

  const handleCategoryChange = (category) => {
    setFilters((prevFilters) => ({
        ...prevFilters,
        category: category === 'All' ? '' : category,
    }));
  };

  const handlePriceRangeChange = (value) => {
    setFilters((prevFilters) => ({
        ...prevFilters,
        priceRange: [0, parseInt(value)],
    }));
  };

  const handleBrandChange = (brand) => {
    setFilters((prevFilters) => ({
        ...prevFilters,
        brand: brand === 'All' ? '' : brand,
    }));
  };

    const filteredProducts = currentProducts.filter(product => {
        const categoryMatch = !filters.category || product.description.includes(filters.category);
        const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        const brandMatch = !filters.brand || product.brand === filters.brand;

        return categoryMatch && priceMatch && brandMatch;
    });

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
                        <p>Displaying {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;