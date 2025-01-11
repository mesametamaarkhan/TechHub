import React, { useState, useEffect } from 'react';
import { Star, StarHalf } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useInView } from 'react-intersection-observer';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 5000],
    brand: '',
    rating: 0
  });

  const { ref, inView } = useInView({
    threshold: 0
  });

  // Simulated product data
  const generateProducts = (pageNum) => {
    const brands = ['Dell', 'HP', 'Apple', 'Samsung', 'Lenovo'];
    const categories = ['Laptops', 'Phones', 'Accessories'];
    const newProducts = [];
    
    for (let i = (pageNum - 1) * 12; i < pageNum * 12; i++) {
      newProducts.push({
        id: i + 1,
        name: `${brands[i % brands.length]} ${categories[i % categories.length]} ${i + 1}`,
        price: Math.floor(Math.random() * 2000) + 500,
        image: `https://images.unsplash.com/photo-${1610945265064 + i}`,
        category: categories[i % categories.length],
        brand: brands[i % brands.length],
        rating: (Math.floor(Math.random() * 10) + 35) / 10
      });
    }
    
    return newProducts;
  };

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  const loadMore = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newProducts = generateProducts(page);
      setProducts(prev => [...prev, ...newProducts]);
      setPage(prev => prev + 1);
      setLoading(false);
    }, 1000);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setProducts([]);
    setPage(1);
  };

  const filteredProducts = products.filter(product => {
    return (
      (!filters.category || product.category === filters.category) &&
      (!filters.brand || product.brand === filters.brand) &&
      (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) &&
      (!filters.rating || product.rating >= filters.rating)
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
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
                    onChange={(e) => handleFilterChange('category', e.target.value)}
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
              onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
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
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
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
                    onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
                    className="mr-2"
                  />
                  <div className="flex items-center">
                    {Array(rating).fill().map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
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
}

export default Products;