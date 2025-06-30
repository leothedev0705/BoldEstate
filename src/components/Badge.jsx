import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'default', 
  className = '',
  icon: Icon = null,
  ...props 
}) => {
  const variants = {
    default: 'badge',
    featured: 'bg-gradient-to-r from-primary-400 to-violet-500 text-gray-950 border-transparent',
    new: 'bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400 border-green-400/30',
    hot: 'bg-gradient-to-r from-red-400/20 to-orange-500/20 text-red-400 border-red-400/30',
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-3 h-3 mr-1" />}
      {children}
    </motion.span>
  );
};

export default Badge; 