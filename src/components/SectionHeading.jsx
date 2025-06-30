import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionHeading = ({ 
  children, 
  subtitle = '', 
  className = '',
  center = false,
  ...props 
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className={`${center ? 'text-center' : ''} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      {...props}
    >
      <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-8">
        {children}
      </h2>
      {subtitle && (
        <motion.p
          className="text-xl text-gray-400 mt-4 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading; 