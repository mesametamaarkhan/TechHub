import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]); // Store all products
  const [currentProducts, setCurrentProducts] = useState([]); // Store products to display based on current page
  const [loading, setLoading] = useState(true); // Loading state while fetching data
  const [page, setPage] = useState(1); // Current page for pagination
  const [productsPerPage] = useState(6); // Number of products per page
  const [hasMore, setHasMore] = useState(true); // Track if there are more products to load

  // Filters (kept in the state but not used)
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 5000],
    brand: '',
    rating: 0
  });

  const { ref, inView } = useInView({
    threshold: 0
  });

  useEffect(() => {
    // Fetch all products when the page first loads
    const fetchProducts = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('No access token found!');
          return;
        }

        // Fetch all products from the backend API
        const response = await axios.get('http://localhost:8080/products/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        });

        const allProducts = response.data.products;
        setProducts(allProducts);
        setCurrentProducts(allProducts.slice(0, productsPerPage)); // Display products for the first page
        setLoading(false);

        // If the total number of products is less than the products per page, disable further loading
        if (allProducts.length <= productsPerPage) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update products to display based on the current page
  const paginateProducts = (pageNumber) => {
    if (!hasMore) return; // Prevent pagination if no more products

    setPage(pageNumber);
    const startIndex = (pageNumber - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const displayedProducts = products.slice(startIndex, endIndex);

    setCurrentProducts(displayedProducts); // Display products for the current page

    // Log the current products being displayed
    console.log('Current products on page ' + pageNumber + ':', displayedProducts);

    // If there are no more products left to display, set hasMore to false
    if (endIndex >= products.length) {
      setHasMore(false);
    }
  };

  // Handle the page change when inView is triggered
  useEffect(() => {
    if (inView && hasMore && currentProducts.length > 0) {
      paginateProducts(page + 1); // Increment page number when scrolled to the bottom
    }
  }, [inView, page, hasMore]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar (Unused but kept for future use) */}
        <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold mb-6">Filters</h2>
          
          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {['All', 'Laptops', 'Phones', 'Accessories'].map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters.category === category}
                    onChange={() => {}} // Empty onChange handler to avoid warning
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Price Range</h3>
            <input
              type="range"
              min="0"
              max="5000"
              value={filters.priceRange[1]}
              onChange={() => {}} // Empty onChange handler to avoid warning
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Brands</h3>
            <div className="space-y-2">
              {['All', 'Dell', 'HP', 'Apple', 'Samsung', 'Lenovo'].map(brand => (
                <label key={brand} className="flex items-center">
                  <input
                    type="radio"
                    name="brand"
                    value={brand}
                    checked={filters.brand === brand}
                    onChange={() => {}} // Empty onChange handler to avoid warning
                    className="mr-2"
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-semibold mb-3">Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={filters.rating === rating}
                    onChange={() => {}} // Empty onChange handler to avoid warning
                    className="mr-2"
                  />
                  <div className="flex items-center">
                    {Array(rating).fill().map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current">
                        <path d="M10 15l-3 3.3L4 15l-.6-4.6L1 7l4.6-.4L5 2l2.6 4L14 6l-3.4 2.4L10 15z" />
                      </svg>
                    ))}
                    <span className="ml-1">& up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="text-xl font-semibold mb-6">
            {/* Display number of products */}
            <p>Displaying {currentProducts.length} product{currentProducts.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map(product => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
          
          {/* Loading indicator */}
          <div ref={ref} className="mt-8 text-center">
            {loading && (
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
