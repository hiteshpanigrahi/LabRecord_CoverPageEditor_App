import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCoffee } from 'react-icons/fa';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyesKfS4l1pBGgsi1mzK4_B7N-5OtYM2vCJM-AZY3YvS1zSGXAFHr2xFWwxfg-9qJN7Nw/exec";

const RatingModal = ({ isOpen, onClose, onSupport }) => {
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    const savedRating = localStorage.getItem('rating');
    if (savedRating) {
      setRating(parseInt(savedRating));
      setHasRated(true);
    }
  }, [isOpen]);

  const handleRate = (rate) => {
    if (hasRated) return;
    
    setRating(rate);
    setHasRated(true);
    localStorage.setItem('rating', rate.toString());

    let userID = localStorage.getItem('userID');
    if (!userID) {
      userID = Math.random().toString(36).substring(2);
      localStorage.setItem('userID', userID);
    }

    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ rating: rate, user: userID }),
    }).catch(err => console.error("Rating Error:", err));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="modal-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <h3 style={{ color: 'white', marginBottom: '10px' }}>⭐ Rate this tool</h3>
            <p style={{ color: '#d1d5db', opacity: 0.9 }}>If this tool helped you, please rate</p>
            
            <div style={{ fontSize: '3rem', margin: '20px 0', display: 'flex', justifyContent: 'center', gap: '5px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.span 
                  key={star}
                  whileHover={!hasRated ? { scale: 1.2 } : {}}
                  style={{ 
                    cursor: hasRated ? 'default' : 'pointer', 
                    color: star <= rating ? '#ffd966' : 'rgba(255,255,255,0.2)' 
                  }}
                  onClick={() => handleRate(star)}
                >
                  ★
                </motion.span>
              ))}
            </div>

            <AnimatePresence>
              {hasRated && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="support-msg" style={{ fontSize: '0.9rem', marginBottom: '15px', color: '#d1d5db' }}>
                    This tool is free to use. If it saved you time, consider supporting the project with a small donation.
                  </p>
                  <button className="btn btn-support" onClick={onSupport} style={{ margin: '0 auto 15px auto', width: '100%', border: 'none' }}>
                    🍵 Buy me a Coffee
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ display: 'flex', gap: '10px' }}>
              {!hasRated && (
                <button 
                  className="btn btn-secondary" 
                  onClick={() => {
                    localStorage.setItem('popupClosed', 'true');
                    onClose();
                  }}
                  style={{ flex: 1 }}
                >
                  Maybe later
                </button>
              )}
              <button 
                className="btn btn-secondary" 
                onClick={onClose}
                style={{ flex: 1 }}
              >
                {hasRated ? "Close" : "Not now"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RatingModal;
