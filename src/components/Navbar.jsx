import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ ratingStats, theme, onToggleTheme }) => {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar">
        <div className="navbar-left">
          <h2>Lab CoverPage Editor</h2>
          {ratingStats && ratingStats.count >= 100 && (
            <div className="rating-badge">
              ⭐ {ratingStats.average} • {ratingStats.count} students
            </div>
          )}
        </div>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
