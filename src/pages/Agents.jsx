import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Star, MessageSquare, Award, TrendingUp } from 'lucide-react';

const Agents = () => {
  const agents = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Senior Real Estate Agent',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
      phone: '(555) 123-4567',
      email: 'sarah@boldestate.com',
      whatsapp: '+1234567890',
      rating: 4.9,
      reviews: 124,
      sales: 85,
      experience: 8,
      specialties: ['Luxury Homes', 'Waterfront Properties', 'Investment Properties']
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Property Investment Specialist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      phone: '(555) 234-5678',
      email: 'michael@boldestate.com',
      whatsapp: '+1234567891',
      rating: 4.8,
      reviews: 96,
      sales: 72,
      experience: 6,
      specialties: ['Commercial Real Estate', 'Investment Analysis', 'Portfolio Management']
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'First-Time Buyer Specialist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      phone: '(555) 345-6789',
      email: 'emily@boldestate.com',
      whatsapp: '+1234567892',
      rating: 4.9,
      reviews: 108,
      sales: 63,
      experience: 5,
      specialties: ['First-Time Buyers', 'Affordable Housing', 'Mortgage Assistance']
    },
    {
      id: 4,
      name: 'David Thompson',
      title: 'Luxury Property Expert',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      phone: '(555) 456-7890',
      email: 'david@boldestate.com',
      whatsapp: '+1234567893',
      rating: 4.9,
      reviews: 142,
      sales: 94,
      experience: 12,
      specialties: ['Luxury Estates', 'High-End Condos', 'Celebrity Homes']
    },
    {
      id: 5,
      name: 'Lisa Park',
      title: 'Residential Sales Manager',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      phone: '(555) 567-8901',
      email: 'lisa@boldestate.com',
      whatsapp: '+1234567894',
      rating: 4.8,
      reviews: 87,
      sales: 78,
      experience: 7,
      specialties: ['Family Homes', 'Suburban Properties', 'School Districts']
    },
    {
      id: 6,
      name: 'James Wilson',
      title: 'Commercial Real Estate Agent',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      phone: '(555) 678-9012',
      email: 'james@boldestate.com',
      whatsapp: '+1234567895',
      rating: 4.7,
      reviews: 76,
      sales: 45,
      experience: 9,
      specialties: ['Office Buildings', 'Retail Spaces', 'Industrial Properties']
    }
  ];

  const AgentCard = ({ agent, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="card group"
    >
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <img
            src={agent.image}
            alt={agent.name}
            className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute -bottom-2 -right-2 bg-primary-400 text-gray-950 p-1 rounded-full">
            <Award className="h-4 w-4" />
          </div>
        </div>
        
        <h3 className="text-xl font-heading font-bold mb-2">{agent.name}</h3>
        <p className="text-primary-400 font-medium mb-4">{agent.title}</p>
        
        <div className="flex items-center justify-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < Math.floor(agent.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
            />
          ))}
          <span className="text-sm text-gray-400 ml-2">
            {agent.rating} ({agent.reviews} reviews)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-heading font-bold gradient-text">{agent.sales}</div>
          <div className="text-xs text-gray-400">Properties Sold</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-bold gradient-text">{agent.experience}</div>
          <div className="text-xs text-gray-400">Years Experience</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-bold gradient-text">{agent.reviews}</div>
          <div className="text-xs text-gray-400">Client Reviews</div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Specialties</h4>
        <div className="flex flex-wrap gap-2">
          {agent.specialties.map((specialty, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-primary-400/20 text-primary-400 rounded-full text-sm"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <a
          href={`https://wa.me/${agent.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <MessageSquare className="h-4 w-4" />
          <span>WhatsApp</span>
        </a>
        
        <a
          href={`tel:${agent.phone}`}
          className="btn-secondary w-full flex items-center justify-center space-x-2"
        >
          <Phone className="h-4 w-4" />
          <span>Call Now</span>
        </a>
        
        <a
          href={`mailto:${agent.email}`}
          className="btn-ghost w-full flex items-center justify-center space-x-2"
        >
          <Mail className="h-4 w-4" />
          <span>Send Email</span>
        </a>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24"
    >
      <div className="container-width">
        <div className="section-padding">
          {/* Header */}
          <section className="relative overflow-hidden rounded-3xl mb-16">
            {/* Background */}
            <div className="absolute inset-0 z-0">
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat parallax-layer"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=1080&fit=crop)',
                }}
              />
              <div className="absolute inset-0 bg-gray-950/80" />
            </div>

            <div className="relative z-10 text-center py-24 px-8">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl lg:text-6xl font-heading font-black mb-6 text-white">
                  MEET OUR <span className="text-white">AGENTS</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Our experienced team of real estate professionals is dedicated to helping you 
                  achieve your property goals with expertise, integrity, and personalized service.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { icon: TrendingUp, value: '500+', label: 'Properties Sold' },
              { icon: Star, value: '4.8', label: 'Average Rating' },
              { icon: Award, value: '15+', label: 'Years Combined Experience' },
              { icon: MessageSquare, value: '24/7', label: 'Client Support' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-400/20 rounded-2xl mb-4">
                  <stat.icon className="h-8 w-8 text-primary-400" />
                </div>
                <div className="text-3xl font-heading font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <AgentCard key={agent.id} agent={agent} index={index} />
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-16 card"
          >
            <h2 className="text-3xl font-heading font-bold mb-4">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Contact any of our expert agents today and let us help you navigate the real estate market with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Get Started Today
              </a>
              <a href="tel:(555) 123-4567" className="btn-secondary">
                Call (555) 123-4567
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Agents; 