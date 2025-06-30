import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Square, Car, 
  ChevronLeft, ChevronRight, Mail, Phone, Calendar, Star,
  Wifi, AirVent, Utensils, Dumbbell, Car as CarIcon, Shield,
  Check, X
} from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import propertiesData from '../data/properties.json';

const PropertyDetail = () => {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    // Find property by slug
    const foundProperty = propertiesData.find(p => p.slug === slug);
    setTimeout(() => {
      setProperty(foundProperty);
      setLoading(false);
    }, 1000);
  }, [slug]);

  const nextImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  const amenities = [
    { icon: Wifi, name: 'High-Speed Internet', available: true },
    { icon: AirVent, name: 'Air Conditioning', available: true },
    { icon: Utensils, name: 'Modern Kitchen', available: true },
    { icon: Dumbbell, name: 'Gym Access', available: true },
    { icon: CarIcon, name: 'Parking', available: true },
    { icon: Shield, name: '24/7 Security', available: true },
  ];

  const EnquiryForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: 'I am interested in this property. Please contact me with more details.',
      viewingDate: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      alert('Enquiry sent successfully!');
      setShowEnquiryForm(false);
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm"
        onClick={() => setShowEnquiryForm(false)}
      >
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          className="card max-w-lg w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-heading font-bold">Property Enquiry</h3>
            <button
              onClick={() => setShowEnquiryForm(false)}
              className="p-2 rounded-xl hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Preferred Viewing Date</label>
              <input
                type="date"
                value={formData.viewingDate}
                onChange={(e) => setFormData(prev => ({ ...prev, viewingDate: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-400"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
            >
              Send Enquiry
            </button>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Property Not Found</h1>
          <Link to="/listings" className="btn-primary">
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24"
    >
      {/* Back Button */}
      <div className="container-width px-4 sm:px-6 lg:px-8 py-4">
        <Link
          to="/listings"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Listings</span>
        </Link>
      </div>

      {/* Image Gallery */}
      <section className="relative h-96 lg:h-[600px] overflow-hidden">
        <motion.img
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gallery Controls */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-900/50 backdrop-blur-sm rounded-full hover:bg-gray-900/80 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-900/50 backdrop-blur-sm rounded-full hover:bg-gray-900/80 transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {property.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentImageIndex ? 'bg-primary-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Floating Actions */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleFavorite(property)}
            className={`p-3 rounded-xl backdrop-blur-sm transition-colors ${
              isFavorite(property.id)
                ? 'bg-red-500 text-white'
                : 'bg-gray-900/50 text-white hover:bg-red-500'
            }`}
          >
            <Heart className={`h-6 w-6 ${isFavorite(property.id) ? 'fill-current' : ''}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-gray-900/50 backdrop-blur-sm rounded-xl hover:bg-gray-900/80 transition-colors"
          >
            <Share2 className="h-6 w-6" />
          </motion.button>
        </div>
      </section>

      {/* Property Details */}
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-5xl font-heading font-black mb-4">
                {property.title}
              </h1>
              <p className="text-xl text-gray-400 flex items-center mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                {property.city}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Bed className="h-5 w-5 text-primary-400" />
                  <span className="text-lg">{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="h-5 w-5 text-primary-400" />
                  <span className="text-lg">{property.baths} Bathrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="h-5 w-5 text-primary-400" />
                  <span className="text-lg">{property.area.toLocaleString()} sqft</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
                <span className="text-gray-400 ml-2">(4.9/5 based on 124 reviews)</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="text-2xl font-heading font-bold mb-4">Description</h2>
              <p className="text-gray-400 leading-relaxed">{property.description}</p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-heading font-bold mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-2xl font-heading font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-xl border ${
                      amenity.available
                        ? 'border-green-400/20 bg-green-400/5'
                        : 'border-gray-700 bg-gray-800/50'
                    }`}
                  >
                    <amenity.icon className={`h-5 w-5 ${
                      amenity.available ? 'text-green-400' : 'text-gray-500'
                    }`} />
                    <span className={amenity.available ? 'text-white' : 'text-gray-500'}>
                      {amenity.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-heading font-bold mb-4">Location</h2>
              <div className="bg-gray-800 rounded-2xl h-96 flex items-center justify-center">
                <p className="text-gray-400">Interactive Map Component</p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Sticky Price Card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="sticky top-32 card"
            >
              <div className="text-center mb-6">
                <div className="text-4xl font-heading font-black gradient-text mb-2">
                  ${property.price.toLocaleString()}
                </div>
                <p className="text-gray-400">Purchase Price</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowEnquiryForm(true)}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>Make Enquiry</span>
                </button>
                
                <button className="btn-secondary w-full flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Call Agent</span>
                </button>
                
                <button className="btn-ghost w-full flex items-center justify-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Schedule Viewing</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                    alt="Agent"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-400">Real Estate Agent</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enquiry Form Modal */}
      {showEnquiryForm && <EnquiryForm />}
    </motion.div>
  );
};

export default PropertyDetail; 