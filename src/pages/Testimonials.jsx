import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Play, X, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Martinez',
      role: 'First-Time Home Buyer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'BoldEstate made buying my first home an incredible experience. Their team was patient, knowledgeable, and helped me navigate every step of the process. I couldn\'t be happier with my new home!',
      property: 'Downtown Condo - $450,000',
      videoThumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      hasVideo: true
    },
    {
      id: 2,
      name: 'Robert Chen',
      role: 'Real Estate Investor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'I\'ve worked with many real estate companies over the years, but BoldEstate stands out for their professionalism and market expertise. They helped me identify and secure three investment properties that have exceeded my ROI expectations.',
      property: 'Investment Portfolio - $2.1M',
      videoThumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      hasVideo: true
    },
    {
      id: 3,
      name: 'Sarah & David Wilson',
      role: 'Family Home Buyers',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'Moving with three kids seemed impossible until we found BoldEstate. They understood our needs, found us the perfect family home in our dream neighborhood, and made the entire process stress-free.',
      property: 'Suburban Family Home - $750,000',
      videoThumbnail: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop',
      hasVideo: false
    },
    {
      id: 4,
      name: 'Michael Torres',
      role: 'Luxury Home Seller',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'BoldEstate sold my luxury property for 15% above asking price in just two weeks. Their marketing strategy and network of high-net-worth buyers is unmatched in the industry.',
      property: 'Luxury Estate - $3.2M',
      videoThumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
      hasVideo: true
    },
    {
      id: 5,
      name: 'Lisa Park',
      role: 'Commercial Property Owner',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'The commercial real estate team at BoldEstate helped me acquire and lease my office building portfolio. Their knowledge of commercial markets and tenant relationships is exceptional.',
      property: 'Commercial Portfolio - $5.8M',
      videoThumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      hasVideo: false
    }
  ];

  const stats = [
    { value: '500+', label: 'Happy Clients' },
    { value: '4.9', label: 'Average Rating' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '$2B+', label: 'Properties Sold' }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const openVideoModal = (testimonial) => {
    setSelectedVideo(testimonial);
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
  };

  const VideoModal = () => (
    <AnimatePresence>
      {showVideoModal && selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-sm"
          onClick={closeVideoModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="aspect-video bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-primary-400 mx-auto mb-4" />
                <p className="text-gray-400">Video testimonial would play here</p>
                <p className="text-gray-500 text-sm mt-2">
                  {selectedVideo.name} - {selectedVideo.property}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
              backgroundImage: 'url(https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&h=1080&fit=crop)',
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
              CLIENT <span className="text-white">TESTIMONIALS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from our satisfied clients who have successfully 
              achieved their real estate goals with BoldEstate.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-heading font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Testimonial Slider */}
      <section className="section-padding bg-gray-900">
        <div className="container-width">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-5xl font-heading font-black mb-6">
              SUCCESS <span className="gradient-text">STORIES</span>
            </h2>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Testimonial Content */}
                <div className="order-2 lg:order-1">
                  <div className="mb-6">
                    <Quote className="h-12 w-12 text-primary-400 mb-4" />
                    <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-6">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-heading font-bold">
                        {testimonials[currentTestimonial].name}
                      </h3>
                      <p className="text-primary-400 font-medium">
                        {testimonials[currentTestimonial].role}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {testimonials[currentTestimonial].property}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Video/Image */}
                <div className="order-1 lg:order-2">
                  <div className="relative">
                    <img
                      src={testimonials[currentTestimonial].videoThumbnail}
                      alt={`${testimonials[currentTestimonial].name} testimonial`}
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                    {testimonials[currentTestimonial].hasVideo && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openVideoModal(testimonials[currentTestimonial])}
                        className="absolute inset-0 flex items-center justify-center bg-gray-950/50 hover:bg-gray-950/30 transition-colors rounded-2xl"
                      >
                        <div className="w-20 h-20 bg-primary-400 rounded-full flex items-center justify-center">
                          <Play className="h-8 w-8 text-gray-950 ml-1" />
                        </div>
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center space-x-4 mt-12">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="section-padding bg-gray-950">
        <div className="container-width">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-heading font-black mb-6">
              MORE <span className="gradient-text">TESTIMONIALS</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Read what our clients have to say about their experience with BoldEstate
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card group"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-primary-400 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  {testimonial.hasVideo && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openVideoModal(testimonial)}
                      className="p-2 bg-primary-400/20 hover:bg-primary-400/30 rounded-full transition-colors"
                    >
                      <Play className="h-4 w-4 text-primary-400" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let us help you achieve your real estate goals and become our next satisfied client. 
              Start your journey with BoldEstate today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Get Started Today
              </a>
              <a href="/agents" className="btn-secondary">
                Meet Our Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal />
    </motion.div>
  );
};

export default Testimonials; 