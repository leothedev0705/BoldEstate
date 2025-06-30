import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Building, MapPin } from 'lucide-react';

const NotFound = () => {
  const quickLinks = [
    { name: 'Browse Properties', href: '/listings', icon: Building },
    { name: 'Find an Agent', href: '/agents', icon: Search },
    { name: 'Contact Us', href: '/contact', icon: MapPin }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 flex items-center justify-center"
    >
      <div className="container-width px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* 404 Illustration */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative inline-block">
              {/* Large 404 Text */}
              <div className="text-8xl lg:text-9xl font-heading font-black gradient-text mb-4">
                404
              </div>
              
              {/* Floating House Icon */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-4 -right-8 lg:-right-16"
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary-400/20 rounded-2xl flex items-center justify-center">
                  <Building className="h-8 w-8 lg:h-10 lg:w-10 text-primary-400" />
                </div>
              </motion.div>
              
              {/* Small decorative elements */}
              <motion.div
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-8 w-8 h-8 bg-purple-600/20 rounded-full"
              />
              <motion.div
                animate={{ x: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute top-8 -left-12 w-6 h-6 bg-primary-400/30 rounded-full"
              />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              OOPS! PAGE NOT <span className="gradient-text">FOUND</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              The page you're looking for seems to have moved to a new address. 
              Don't worry, we'll help you find your way back home.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/" className="btn-primary inline-flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <Link to="/listings" className="btn-secondary inline-flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Browse Properties</span>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-xl font-heading font-bold mb-8 text-gray-300">
              Or try one of these popular pages:
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link
                    to={link.href}
                    className="card group hover:border-primary-400/50 transition-all duration-300 block"
                  >
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-400/20 rounded-xl mb-4 group-hover:bg-primary-400/30 transition-colors">
                        <link.icon className="h-6 w-6 text-primary-400" />
                      </div>
                      <h3 className="font-heading font-bold group-hover:text-primary-400 transition-colors">
                        {link.name}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 max-w-md mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    window.location.href = `/listings?search=${encodeURIComponent(e.target.value)}`;
                  }
                }}
              />
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Press Enter to search for properties
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ 
                x: [0, 100, 0],
                y: [0, -50, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400/30 rounded-full"
            />
            <motion.div
              animate={{ 
                x: [0, -80, 0],
                y: [0, 60, 0],
                rotate: [0, -180, -360]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-600/20 rounded-full"
            />
            <motion.div
              animate={{ 
                x: [0, 60, 0],
                y: [0, -80, 0],
                rotate: [0, 90, 180]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary-400/40 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound; 