import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, DollarSign, Bed, Bath, Square, Star, Heart, ArrowRight, X, SlidersHorizontal } from 'lucide-react';
import Masonry from 'react-masonry-css';
import { useInView } from 'react-intersection-observer';
import propertiesData from '../data/properties.json';
import { useFavorites } from '../contexts/FavoritesContext';
import GlowButton from '../components/GlowButton';
import Badge from '../components/Badge';
import SectionHeading from '../components/SectionHeading';

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [bedrooms, setBedrooms] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [displayCount, setDisplayCount] = useState(9);
  
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProperties(propertiesData);
      setFilteredProperties(propertiesData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter properties
    let filtered = properties.filter(property => {
      const matchesSearch = !searchQuery || 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCity = !selectedCity || property.city === selectedCity;
      const matchesPrice = property.priceValue >= priceRange[0] && property.priceValue <= priceRange[1];
      const matchesBedrooms = !bedrooms || property.bedrooms.toString() === bedrooms;
      
      return matchesSearch && matchesCity && matchesPrice && matchesBedrooms;
    });

    // Sort properties
    switch (sortBy) {
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    setFilteredProperties(filtered);
  }, [properties, searchQuery, selectedCity, priceRange, bedrooms, propertyType, sortBy]);

  // Infinite scroll
  useEffect(() => {
    if (inView && displayCount < filteredProperties.length) {
      setDisplayCount(prev => Math.min(prev + 6, filteredProperties.length));
    }
  }, [inView, filteredProperties.length, displayCount]);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setPriceRange([0, 50000000]);
    setBedrooms('');
    setPropertyType('');
    setSortBy('featured');
  };

  const PropertySkeleton = () => (
    <div className="card animate-pulse">
      <div className="skeleton h-48 rounded-2xl mb-6"></div>
      <div className="skeleton h-6 w-3/4 mb-4"></div>
      <div className="skeleton h-4 w-1/2 mb-6"></div>
      <div className="flex justify-between mb-4">
        <div className="skeleton h-6 w-1/3"></div>
        <div className="skeleton h-4 w-1/4"></div>
      </div>
      <div className="skeleton h-10 w-full"></div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24"
    >
      {/* Header */}
      <section className="relative section-padding overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat parallax-layer"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop)',
            }}
          />
          <div className="absolute inset-0 bg-gray-950/80" />
        </div>

        <div className="container-width relative z-10">
          <SectionHeading center className="mb-16">
            PREMIUM <span className="text-white">PROPERTIES</span>
          </SectionHeading>

          {/* Search and Sort Bar */}
          <div className="glass-morphism p-6 rounded-3xl mb-8 backdrop-blur-md bg-gray-900/50">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all backdrop-blur-sm"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all backdrop-blur-sm"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center space-x-2 backdrop-blur-sm"
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Filters Drawer */}
          <motion.div
            initial={false}
            animate={{ height: showFilters ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="glass-morphism p-8 rounded-3xl mb-8 backdrop-blur-md bg-gray-900/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white focus:border-primary-400 transition-all backdrop-blur-sm"
                  >
                    <option value="">All Cities</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="pune">Pune</option>
                    <option value="goa">Goa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bedrooms</label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white focus:border-primary-400 transition-all backdrop-blur-sm"
                  >
                    <option value="">Any</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Price (₹)</label>
                  <input
                    type="number"
                    placeholder="Minimum"
                    value={priceRange[0] || ''}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:border-primary-400 transition-all backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Price (₹)</label>
                  <input
                    type="number"
                    placeholder="Maximum"
                    value={priceRange[1] === 50000000 ? '' : priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000000])}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:border-primary-400 transition-all backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-800/50">
                <p className="text-gray-300">
                  Showing {filteredProperties.length} of {properties.length} properties
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-ghost flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Clear Filters</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="section-padding bg-gray-900">
        <div className="container-width">
          {loading ? (
            <Masonry
              breakpointCols={breakpointColumns}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {[...Array(9)].map((_, index) => (
                <PropertySkeleton key={index} />
              ))}
            </Masonry>
          ) : (
            <>
              <Masonry
                breakpointCols={breakpointColumns}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
              >
                {filteredProperties.slice(0, displayCount).map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card group cursor-pointer mb-8 overflow-hidden"
                  >
                    <Link to={`/listings/${property.slug}`}>
                      <div className="relative overflow-hidden rounded-2xl mb-6">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        
                        {/* Tags - More visible */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {property.tags?.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="default" className="bg-gray-900/80 backdrop-blur-sm text-white border-white/20 font-semibold">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(property);
                          }}
                          className={`absolute top-4 right-4 p-2 rounded-xl backdrop-blur-sm border transition-all ${
                            isFavorite(property.id)
                              ? 'bg-red-500/20 border-red-500/50 text-red-400'
                              : 'bg-gray-900/20 border-gray-700/50 text-gray-400 hover:text-red-400'
                          }`}
                        >
                          <Heart className={`h-5 w-5 ${isFavorite(property.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary-400 transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div className="text-2xl font-heading font-bold gradient-text">
                          {property.price}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-400">{property.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-6 text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            {property.bedrooms}
                          </div>
                          <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            {property.bathrooms}
                          </div>
                          <div className="flex items-center">
                            <Square className="h-4 w-4 mr-1" />
                            {property.area}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <GlowButton className="w-full">
                          View Details
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </GlowButton>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </Masonry>

              {/* Loading More Indicator */}
              {displayCount < filteredProperties.length && (
                <div ref={ref} className="text-center py-8">
                  <div className="inline-flex items-center space-x-2 text-gray-400">
                    <div className="w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading more properties...</span>
                  </div>
                </div>
              )}

              {filteredProperties.length === 0 && !loading && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 opacity-50">
                    <Search className="w-full h-full text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-4 text-gray-400">No Properties Found</h3>
                  <p className="text-gray-500 mb-8">Try adjusting your search criteria or filters</p>
                  <button onClick={clearFilters} className="btn-primary">
                    Clear All Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Listings; 