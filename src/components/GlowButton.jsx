import React from 'react';
import { motion } from 'framer-motion';

const GlowButton = ({ 
  children, 
  onClick, 
  type = 'button', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        glow-button magnetic-button
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GlowButton; 