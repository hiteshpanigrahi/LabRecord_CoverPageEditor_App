import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.div 
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      <h1>About</h1>
      <p>Designed & Crafted by</p>
      <h2>Hitesh Panigrahi</h2>
      <h3>E&I, OUTR</h3>

      <div className="footer-icons">
        <a href="mailto:hitesh.edu@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope />
        </a>
        <a href="https://github.com/hiteshpanigrahi" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/hitesh-panigrahi-2244312b7/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>
    </motion.div>
  );
};

export default Footer;
