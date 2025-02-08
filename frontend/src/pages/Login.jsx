import React, { useState } from 'react';
import { Leaf, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:8080/user/login', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/'); // Redirect to homepage on success
      } 
      else if (response.status === 400) {
        setErrorMessage(response.data.message);
      }
      else if (response.status === 404) {
        setErrorMessage(response.data.message);
      }
      else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-greenish-gray flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Leaf className="mx-auto h-12 w-12 text-green-400 animate-float" />
          <h2 className="mt-4 text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-gray-400">Continue your growth journey</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-effect bg-black rounded-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm text-white font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 bg-dark-greenish-gray border border-forest-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-10 pr-10 py-2 bg-dark-greenish-gray text-white border border-forest-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5 text-green-400" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-forest-700 bg-forest-900 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="text-green-400 hover:text-green-300">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-white">Don't have an account?</span>{' '}
            <Link to="/signup" className="text-green-400 hover:text-green-300">
              Sign up
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
