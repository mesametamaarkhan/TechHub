import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for redirection
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Check if the user is logged in before fetching data
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      if (loginStatus === 'true') {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
        navigate('/login'); // Redirect to login page
      }
    };

    checkLoginStatus();

    if (isLoggedIn) {
      const fetchData = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          
          if (!accessToken) {
            console.error('No access token found!');
            return;
          }

          // Make the request with the Authorization header
          const productResponse = await axios.get('http://localhost:8080/products/', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            }
          });

          const categoryResponse = await axios.get('http://localhost:8080/categories/', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            }
          });

          // Check if any of the responses has a status 403 (Forbidden - Invalid Token)
          if (productResponse.status === 403 || categoryResponse.status === 403) {
            console.error('Invalid token, redirecting to login...');
            localStorage.removeItem('accessToken'); // Remove the invalid token
            localStorage.removeItem('isLoggedIn'); // Optional: Remove login status as well
            setIsLoggedIn(false);
            navigate('/login'); // Redirect to the login page
            return;
          }

          // If no error, set the data to state
          setProducts(productResponse.data.products);
          setCategories(categoryResponse.data.categories);
          setLoading(false);
        } catch (error) {
          // Handle error gracefully
          if (error.response && error.response.status === 403) {
            console.error('Access forbidden. Invalid token, redirecting to login...');
            localStorage.removeItem('accessToken'); // Remove the invalid token
            localStorage.removeItem('isLoggedIn'); // Optional: Remove login status as well
            setIsLoggedIn(false);
            navigate('/login'); // Redirect to the login page
          } else {
            console.error('Error fetching data:', error);
          }
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isLoggedIn, navigate]); // Re-run the effect when isLoggedIn changes

  if (loading) {
    return <p className="text-center py-16">Loading...</p>;
  }

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
            <CategoryCard key={category._id} {...category} />
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
                <ProductCard key={product._id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
