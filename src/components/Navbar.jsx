import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';

const Navbar = ({ ratingStats }) => {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar">
        <h2>Lab CoverPage Editor</h2>
        {ratingStats && ratingStats.count >= 100 && (
          <div className="rating-badge">
            ⭐ {ratingStats.average} • {ratingStats.count} students
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
