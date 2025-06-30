import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Bed, Bath, Square, Star, ArrowRight, TrendingUp, Users, Award, Building, Eye, Waves, Mountain } from 'lucide-react';
import propertiesData from '../data/properties.json';
import GlowButton from '../components/GlowButton';
import StatCounter from '../components/StatCounter';
import Badge from '../components/Badge';
import SectionHeading from '../components/SectionHeading';
import TextSlider from '../components/TextSlider';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    // Get featured properties
    const featured = propertiesData.filter(property => property.featured).slice(0, 6);
    setFeaturedProperties(featured.length > 0 ? featured : propertiesData.slice(0, 6));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (selectedCity) params.append('city', selectedCity);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (bedrooms) params.append('bedrooms', bedrooms);
    
    window.location.href = `/listings?${params.toString()}`;
  };

  const heroTexts = [
    "LIVE ABOVE THE ORDINARY",
    "OWN YOUR URBAN OASIS", 
    "INVEST IN TOMORROW"
  ];

  const neighborhoods = [
    {
      icon: Waves,
      title: "Sea-Facing",
      description: "Wake up to ocean views every day",
      properties: "127 Properties",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop"
    },
    {
      icon: Building,
      title: "Central Business",
      description: "In the heart of commercial districts",
      properties: "89 Properties", 
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
    },
    {
      icon: Mountain,
      title: "Mountain View",
      description: "Serene hillside living spaces",
      properties: "64 Properties",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    }
  ];

  const whyChooseUs = [
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees, clear pricing structure with detailed cost breakdowns"
    },
    {
      icon: MapPin,
      title: "Hyperlocal Experts",
      description: "Deep neighborhood knowledge with insider market insights"
    },
    {
      icon: Users,
      title: "24×7 Support",
      description: "Round-the-clock assistance from property search to final handover"
    }
  ];

  const stats = [
    { value: '10K', suffix: '+', label: 'Properties Sold' },
    { value: '5K', suffix: '+', label: 'Happy Families' },
    { value: '98', suffix: '%', label: 'Success Rate' },
    { value: '15', suffix: '+', label: 'Years Experience' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat parallax-layer"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop)',
            }}
          />
          <div className="absolute inset-0 bg-gray-950/50" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-950/30 to-gray-950/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-5xl sm:text-6xl lg:text-8xl font-heading font-black mb-4 text-shadow text-white">
              <TextSlider texts={heroTexts} className="block h-24 lg:h-32" />
            </div>
          </motion.div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto"
          >
            Curated properties in <span className="text-primary-400 font-semibold">Mumbai, Pune & Goa</span>
          </motion.p>

          {/* Enhanced Search Bar */}
          <motion.form
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onSubmit={handleSearch}
            className="max-w-6xl mx-auto glass-morphism p-8 mb-16 rounded-3xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="relative lg:col-span-2">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter location or landmark"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
                />
              </div>
              
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
              >
                <option value="">Select City</option>
                <option value="mumbai">Mumbai</option>
                <option value="pune">Pune</option>
                <option value="goa">Goa</option>
              </select>

              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
                />
              </div>
              
              <GlowButton type="submit" className="flex items-center justify-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search</span>
              </GlowButton>
            </div>
          </motion.form>

          {/* Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-heading font-bold mb-2">
                  <StatCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center"
          >
            <motion.div className="w-1 h-3 bg-primary-400 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* Deal Counter Banner */}
      <section className="bg-cyan-violet py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-width text-center"
        >
          <p className="text-white text-lg font-semibold">
            <StatCounter end="137" className="text-white" /> families moved in 2025 — <span className="underline">be next</span>
          </p>
        </motion.div>
      </section>

      {/* Neighborhood Highlights */}
      <section className="section-padding bg-gray-950">
        <div className="container-width">
          <SectionHeading center className="mb-16">
            NEIGHBORHOOD <span className="text-white">HIGHLIGHTS</span>
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {neighborhoods.map((neighborhood, index) => (
              <motion.div
                key={neighborhood.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-tilt group cursor-pointer overflow-hidden"
              >
                <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
                  <img
                    src={neighborhood.image}
                    alt={neighborhood.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <neighborhood.icon className="h-8 w-8 text-primary-400" />
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary-400 transition-colors">
                  {neighborhood.title}
                </h3>
                <p className="text-gray-400 mb-4">{neighborhood.description}</p>
                <Badge>{neighborhood.properties}</Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Carousel */}
      <section className="section-padding bg-gray-900">
        <div className="container-width">
          <SectionHeading center className="mb-16">
            FEATURED <span className="text-white">PROPERTIES</span>
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card group cursor-pointer"
              >
                <Link to={`/listings/${property.slug}`}>
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {property.tags?.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="default" className="bg-gray-900/80 backdrop-blur-sm text-white border-white/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
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
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
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
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{property.rating || '4.8'}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/listings">
              <GlowButton className="px-12">
                View All Properties
                <ArrowRight className="h-5 w-5 ml-2" />
              </GlowButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-950">
        <div className="container-width">
          <SectionHeading center className="mb-16">
            WHY CHOOSE <span className="text-white">BOLDESTATE</span>
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-400/20 rounded-2xl mb-6 group-hover:bg-primary-400/30 transition-colors">
                  <item.icon className="h-8 w-8 text-primary-400" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home; 