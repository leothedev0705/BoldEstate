import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, TrendingUp, Home, Target, Eye, Heart, Star } from 'lucide-react';

const About = () => {
  const timeline = [
    {
      year: '2010',
      title: 'Company Founded',
      description: 'BoldEstate was established with a vision to revolutionize the real estate industry through innovation and exceptional service.'
    },
    {
      year: '2012',
      title: 'First Major Milestone',
      description: 'Reached 100 successful property transactions and expanded our team to 10 dedicated professionals.'
    },
    {
      year: '2015',
      title: 'Digital Innovation',
      description: 'Launched our cutting-edge online platform, making property search more accessible and efficient for clients.'
    },
    {
      year: '2018',
      title: 'Market Expansion',
      description: 'Expanded operations to cover multiple metropolitan areas, becoming a regional leader in real estate services.'
    },
    {
      year: '2020',
      title: 'Technology Leadership',
      description: 'Introduced virtual tours and AI-powered property matching, setting new industry standards during the pandemic.'
    },
    {
      year: '2024',
      title: 'Industry Excellence',
      description: 'Recognized as the leading real estate firm with over 10,000 successful transactions and industry-leading client satisfaction.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in every transaction, ensuring our clients receive the highest quality service and results.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Honesty and transparency guide every interaction, building lasting relationships based on trust and reliability.'
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Our clients\' needs come first. We listen, understand, and deliver personalized solutions for every unique situation.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We embrace technology and innovative approaches to provide cutting-edge solutions in the real estate market.'
    }
  ];

  const team = [
    {
      name: 'Robert Anderson',
      position: 'Chief Executive Officer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: '15+ years of real estate leadership experience'
    },
    {
      name: 'Jessica Chen',
      position: 'Chief Operating Officer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
      bio: 'Operations expert with MBA from Harvard Business School'
    },
    {
      name: 'Michael Torres',
      position: 'Head of Sales',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Top performer with $500M+ in lifetime sales'
    },
    {
      name: 'Sarah Kim',
      position: 'Technology Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Former Silicon Valley tech lead driving innovation'
    }
  ];

  // Animated Counter Component
  const AnimatedCounter = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (isInView) {
        const startTime = Date.now();
        const timer = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / (duration * 1000), 1);
          setCount(Math.floor(progress * end));
          
          if (progress === 1) {
            clearInterval(timer);
          }
        }, 50);

        return () => clearInterval(timer);
      }
    }, [isInView, end, duration]);

    return <span ref={ref}>{count.toLocaleString()}</span>;
  };

  const stats = [
    { icon: Home, value: 10000, suffix: '+', label: 'Properties Sold' },
    { icon: Users, value: 5000, suffix: '+', label: 'Happy Clients' },
    { icon: Award, value: 15, suffix: '', label: 'Years Experience' },
    { icon: TrendingUp, value: 98, suffix: '%', label: 'Success Rate' }
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
              ABOUT <span className="gradient-text">BOLDESTATE</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              For over a decade, we've been transforming the real estate experience through innovation, 
              expertise, and an unwavering commitment to our clients' success.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card"
            >
              <Target className="h-12 w-12 text-primary-400 mb-6" />
              <h2 className="text-2xl font-heading font-bold mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                To revolutionize the real estate industry by providing exceptional service, innovative technology, 
                and expert guidance that empowers our clients to make informed decisions and achieve their property dreams.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card"
            >
              <Eye className="h-12 w-12 text-primary-400 mb-6" />
              <h2 className="text-2xl font-heading font-bold mb-4">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed">
                To be the most trusted and innovative real estate company, setting new standards for excellence 
                while building lasting relationships that transform communities and lives.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
              OUR <span className="gradient-text">ACHIEVEMENTS</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-400/20 rounded-2xl mb-6">
                  <stat.icon className="h-10 w-10 text-primary-400" />
                </div>
                <div className="text-4xl font-heading font-black gradient-text mb-2">
                  <AnimatedCounter end={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              OUR <span className="gradient-text">JOURNEY</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A timeline of milestones that shaped BoldEstate into the industry leader we are today
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-400 to-purple-600"></div>

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="card">
                      <div className="text-3xl font-heading font-black gradient-text mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-heading font-bold mb-3">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary-400 rounded-full border-4 border-gray-950"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              OUR <span className="gradient-text">VALUES</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do and define who we are as a company
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-400/20 rounded-2xl mb-6 group-hover:bg-primary-400/30 transition-colors">
                  <value.icon className="h-8 w-8 text-primary-400" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
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
              LEADERSHIP <span className="gradient-text">TEAM</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Meet the visionary leaders driving innovation and excellence at BoldEstate
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card text-center group"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-xl font-heading font-bold mb-2">{member.name}</h3>
                <p className="text-primary-400 font-medium mb-4">{member.position}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
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
              Ready to Experience the BoldEstate Difference?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who have trusted us with their real estate journey. 
              Let's make your property dreams a reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Get Started Today
              </a>
              <a href="/listings" className="btn-secondary">
                Browse Properties
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About; 