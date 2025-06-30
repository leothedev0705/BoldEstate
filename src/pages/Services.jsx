import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Search, Calculator, FileText, Key, Shield, 
  TrendingUp, Users, Award, CheckCircle, ArrowRight,
  MapPin, DollarSign, Camera, BarChart3
} from 'lucide-react';

const Services = () => {
  const mainServices = [
    {
      icon: Search,
      title: 'Property Search',
      description: 'Find your perfect home with our advanced search tools and expert market knowledge.',
      features: ['Advanced Filtering', 'Market Analysis', 'Property Tours', 'Neighborhood Insights']
    },
    {
      icon: Calculator,
      title: 'Mortgage & Finance',
      description: 'Get the best financing options with our trusted lending partners and financial advisors.',
      features: ['Pre-approval', 'Rate Comparison', 'Financial Planning', 'Investment Analysis']
    },
    {
      icon: FileText,
      title: 'Legal & Documentation',
      description: 'Comprehensive legal support to ensure smooth transactions and protect your interests.',
      features: ['Contract Review', 'Title Search', 'Legal Compliance', 'Closing Support']
    },
    {
      icon: Key,
      title: 'Property Management',
      description: 'Full-service property management for investors and property owners.',
      features: ['Tenant Screening', 'Rent Collection', 'Maintenance', 'Financial Reporting']
    },
    {
      icon: TrendingUp,
      title: 'Investment Consulting',
      description: 'Expert advice on real estate investments and portfolio optimization.',
      features: ['Market Research', 'ROI Analysis', 'Portfolio Planning', 'Risk Assessment']
    },
    {
      icon: Camera,
      title: 'Marketing & Photography',
      description: 'Professional marketing services to showcase your property at its best.',
      features: ['Professional Photos', 'Virtual Tours', 'Drone Photography', 'Marketing Strategy']
    }
  ];

  const additionalServices = [
    { icon: Shield, title: 'Home Insurance', description: 'Comprehensive insurance solutions' },
    { icon: MapPin, title: 'Relocation Services', description: 'Complete relocation assistance' },
    { icon: DollarSign, title: 'Property Valuation', description: 'Professional market valuations' },
    { icon: BarChart3, title: 'Market Reports', description: 'Detailed market analysis' }
  ];

  const process = [
    {
      step: '01',
      title: 'Initial Consultation',
      description: 'We start with a comprehensive consultation to understand your needs, preferences, and budget.'
    },
    {
      step: '02',
      title: 'Property Search',
      description: 'Our agents use advanced tools and market knowledge to find properties that match your criteria.'
    },
    {
      step: '03',
      title: 'Property Tours',
      description: 'We arrange private tours of selected properties and provide detailed market insights.'
    },
    {
      step: '04',
      title: 'Negotiation',
      description: 'Our expert negotiators work to secure the best possible terms for your transaction.'
    },
    {
      step: '05',
      title: 'Closing',
      description: 'We guide you through the entire closing process and ensure all documentation is complete.'
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
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950"></div>
        <div className="container-width relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-heading font-black mb-6">
              OUR <span className="gradient-text">SERVICES</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive real estate services designed to make your property journey seamless and successful. 
              From first-time buyers to seasoned investors, we have the expertise you need.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { icon: Home, value: '10K+', label: 'Properties Sold' },
              { icon: Users, value: '5K+', label: 'Happy Clients' },
              { icon: Award, value: '98%', label: 'Success Rate' },
              { icon: TrendingUp, value: '$2B+', label: 'Total Sales Value' }
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
        </div>
      </section>

      {/* Main Services */}
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
              COMPREHENSIVE <span className="gradient-text">SOLUTIONS</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need for a successful real estate transaction, all in one place
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card group"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-400/20 rounded-2xl mb-4 group-hover:bg-primary-400/30 transition-colors">
                    <service.icon className="h-8 w-8 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                </div>

                <div className="space-y-3">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-800">
                  <button className="btn-ghost w-full group-hover:bg-primary-400/10 transition-colors">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gray-900">
        <div className="container-width">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-heading font-black mb-6">
              OUR <span className="gradient-text">PROCESS</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A streamlined approach that ensures every client receives personalized attention and exceptional results
            </p>
          </motion.div>

          <div className="space-y-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="md:w-1/2">
                  <div className="card">
                    <div className="flex items-center mb-4">
                      <div className="text-6xl font-heading font-black gradient-text mr-6">
                        {item.step}
                      </div>
                      <h3 className="text-2xl font-heading font-bold">{item.title}</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="w-32 h-32 bg-primary-400/20 rounded-full flex items-center justify-center">
                    <div className="text-4xl font-heading font-black gradient-text">
                      {item.step}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
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
              ADDITIONAL <span className="gradient-text">SERVICES</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-400/20 rounded-xl mb-4 group-hover:bg-primary-400/30 transition-colors">
                  <service.icon className="h-6 w-6 text-primary-400" />
                </div>
                <h3 className="font-heading font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let our expert team help you achieve your real estate goals. Contact us today for a personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Start Your Journey
              </a>
              <a href="/agents" className="btn-secondary">
                Meet Our Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services; 