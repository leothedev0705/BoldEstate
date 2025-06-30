import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, Building } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyType: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: '(555) 123-4567',
      subtext: 'Mon-Fri 9AM-6PM EST',
      action: 'tel:+15551234567'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@boldestate.com',
      subtext: 'We reply within 24 hours',
      action: 'mailto:info@boldestate.com'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Real Estate Ave',
      subtext: 'Premium City, PC 12345',
      action: '#'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      details: 'Available 24/7',
      subtext: 'Instant support online',
      action: '#'
    }
  ];

  const offices = [
    {
      name: 'Downtown Office',
      address: '123 Real Estate Ave, Premium City, PC 12345',
      phone: '(555) 123-4567',
      hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    },
    {
      name: 'Westside Branch',
      address: '456 Property Blvd, Luxury District, LD 67890',
      phone: '(555) 234-5678',
      hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
    }
  ];

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
              backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop)',
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
              GET IN <span className="text-white">TOUCH</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to start your real estate journey? We're here to help you every step of the way. 
              Contact our expert team today for personalized assistance.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card group text-center hover:border-primary-400/50 transition-all duration-300 backdrop-blur-sm bg-gray-800/50"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-400/20 rounded-xl mb-4 group-hover:bg-primary-400/30 transition-colors">
                  <info.icon className="h-6 w-6 text-primary-400" />
                </div>
                <h3 className="font-heading font-bold mb-2 text-white">{info.title}</h3>
                <p className="text-gray-300 mb-1">{info.details}</p>
                <p className="text-gray-400 text-sm">{info.subtext}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-gray-900">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-heading font-bold mb-6">Send us a Message</h2>
              <p className="text-gray-400 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium mb-2">
                      Property Type
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all appearance-none"
                      >
                        <option value="">Select property type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="luxury">Luxury</option>
                        <option value="investment">Investment</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all resize-none"
                    placeholder="Tell us about your real estate needs..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="loading-spinner w-5 h-5"></div>
                  ) : submitted ? (
                    <>
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-heading font-bold mb-6">Find Us</h2>
              <div className="bg-gray-800 rounded-2xl h-96 mb-6 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary-400 mx-auto mb-4" />
                  <p className="text-gray-400">Interactive Map Component</p>
                  <p className="text-gray-500 text-sm mt-2">Google Maps integration would go here</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">123 Real Estate Ave</p>
                    <p className="text-gray-400">Premium City, PC 12345</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Business Hours</p>
                    <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-400">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
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
              OUR <span className="gradient-text">OFFICES</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Visit us at any of our convenient locations for personalized service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card group"
              >
                <img
                  src={office.image}
                  alt={office.name}
                  className="w-full h-48 object-cover rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-xl font-heading font-bold mb-4">{office.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-primary-400 mt-1" />
                    <p className="text-gray-400">{office.address}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-4 w-4 text-primary-400 mt-1" />
                    <a href={`tel:${office.phone}`} className="text-gray-400 hover:text-primary-400 transition-colors">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-4 w-4 text-primary-400 mt-1" />
                    <p className="text-gray-400">{office.hours}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact; 