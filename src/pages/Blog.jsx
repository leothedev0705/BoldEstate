import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, Search, Tag } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 12 },
    { id: 'market-trends', name: 'Market Trends', count: 4 },
    { id: 'buying-tips', name: 'Buying Tips', count: 3 },
    { id: 'selling-guide', name: 'Selling Guide', count: 2 },
    { id: 'investment', name: 'Investment', count: 3 }
  ];

  const blogPosts = [
    {
      id: 1,
      slug: 'real-estate-market-trends-2024',
      title: '2024 Real Estate Market Trends: What Buyers and Sellers Need to Know',
      excerpt: 'Explore the latest market trends shaping the real estate landscape in 2024, including pricing patterns, inventory levels, and emerging opportunities.',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'market-trends',
      featured: true
    },
    {
      id: 2,
      slug: 'first-time-home-buyer-guide',
      title: 'The Complete First-Time Home Buyer\'s Guide',
      excerpt: 'Everything you need to know about buying your first home, from getting pre-approved to closing day and beyond.',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop',
      author: 'Michael Chen',
      date: '2024-01-12',
      readTime: '12 min read',
      category: 'buying-tips',
      featured: false
    },
    {
      id: 3,
      slug: 'staging-home-for-sale',
      title: 'Home Staging Tips That Actually Sell Houses',
      excerpt: 'Professional staging secrets that can help your home sell faster and for more money in today\'s competitive market.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      author: 'Emily Rodriguez',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'selling-guide',
      featured: false
    },
    {
      id: 4,
      slug: 'real-estate-investment-strategies',
      title: 'Top Real Estate Investment Strategies for 2024',
      excerpt: 'Discover proven investment strategies that successful real estate investors are using to build wealth in the current market.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
      author: 'David Thompson',
      date: '2024-01-08',
      readTime: '10 min read',
      category: 'investment',
      featured: true
    },
    {
      id: 5,
      slug: 'negotiation-tips-buyers',
      title: 'Negotiation Strategies for Smart Home Buyers',
      excerpt: 'Learn the art of negotiation from real estate experts and secure the best possible deal on your next home purchase.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
      author: 'Lisa Park',
      date: '2024-01-05',
      readTime: '7 min read',
      category: 'buying-tips',
      featured: false
    },
    {
      id: 6,
      slug: 'luxury-market-insights',
      title: 'Luxury Real Estate Market: Trends and Insights',
      excerpt: 'An in-depth look at the luxury real estate market, including buyer preferences and emerging luxury amenities.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
      author: 'James Wilson',
      date: '2024-01-03',
      readTime: '9 min read',
      category: 'market-trends',
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const BlogCard = ({ post, index, featured = false }) => (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={`card group ${featured ? 'lg:col-span-2' : ''}`}
    >
      <Link to={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden rounded-2xl mb-6">
          <img
            src={post.image}
            alt={post.title}
            className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
              featured ? 'h-64 lg:h-80' : 'h-48'
            }`}
          />
          {post.featured && (
            <div className="absolute top-4 left-4 bg-primary-400 text-gray-950 px-3 py-1 rounded-xl font-bold text-sm">
              Featured
            </div>
          )}
          <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-sm">
            <Tag className="h-3 w-3 inline mr-1" />
            {categories.find(cat => cat.id === post.category)?.name}
          </div>
        </div>
        
        <div className="mb-4">
          <h2 className={`font-heading font-bold mb-3 group-hover:text-primary-400 transition-colors ${
            featured ? 'text-2xl lg:text-3xl' : 'text-xl'
          }`}>
            {post.title}
          </h2>
          <p className="text-gray-400 leading-relaxed">{post.excerpt}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-primary-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.article>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24"
    >
      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat parallax-layer"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop)',
            }}
          />
          <div className="absolute inset-0 bg-gray-950/80" />
        </div>

        <div className="container-width relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-heading font-black mb-6 text-white">
              REAL ESTATE <span className="text-white">INSIGHTS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay informed with the latest real estate trends, expert tips, and market insights 
              from our team of industry professionals.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all backdrop-blur-sm"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all backdrop-blur-sm"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary-400 text-gray-950'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'all' && (
        <section className="section-padding bg-gray-900">
          <div className="container-width">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-heading font-black mb-6">
                FEATURED <span className="gradient-text">ARTICLES</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="section-padding bg-gray-950">
        <div className="container-width">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-black mb-6">
              {selectedCategory === 'all' ? 'ALL' : categories.find(cat => cat.id === selectedCategory)?.name.toUpperCase()} <span className="gradient-text">ARTICLES</span>
            </h2>
            <p className="text-gray-400">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-heading font-bold mb-2">No Articles Found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-gradient-to-r from-primary-400/10 to-purple-600/10">
        <div className="container-width">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center card border-primary-400/20"
          >
            <h2 className="text-3xl font-heading font-bold mb-4">
              Stay Updated with Market Insights
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest real estate trends, tips, and market analysis 
              delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-primary-400"
              />
              <button className="btn-primary px-8">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Blog; 