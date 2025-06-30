import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Listings', href: '/listings' },
    { name: 'Agents', href: '/agents' },
    { name: 'Services', href: '/services' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container-width">
        <div className="section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-1 lg:col-span-2"
            >
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="bg-cyan-purple p-2 rounded-xl">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-heading font-black gradient-text">
                  BoldEstate
                </span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md">
                Discover premium real estate properties with BoldEstate. We're committed to helping you find your dream home with our expert agents and cutting-edge technology.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="h-5 w-5 text-primary-400" />
                  <span>123 Real Estate Ave, Premium City, PC 12345</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="h-5 w-5 text-primary-400" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="h-5 w-5 text-primary-400" />
                  <span>info@boldestate.com</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-heading font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-heading font-bold mb-6">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          >
            <div className="text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2024 BoldEstate. All rights reserved.</p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl bg-gray-800 hover:bg-primary-400/20 hover:text-primary-400 transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 