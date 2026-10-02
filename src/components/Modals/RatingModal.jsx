import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Coffee, X } from 'lucide-react';
import PeekRating from '../PeekRating';
import './RatingModal.css';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyesKfS4l1pBGgsi1mzK4_B7N-5OtYM2vCJM-AZY3YvS1zSGXAFHr2xFWwxfg-9qJN7Nw/exec";

const RatingModal = ({ isOpen, onClose, onSupport, theme = 'dark' }) => {
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
    if (hasRated || !rate) return;
    
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
          className={`rating-modal-overlay theme-${theme}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div 
            className="rating-modal-card"
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
          >
            {/* Top Close Button */}
            <button 
              className="rating-close-btn" 
              onClick={onClose}
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>

            {/* Icon Badge */}
            <div className="rating-icon-box">
              <Star size={20} className="icon-star-glyph" />
            </div>

            {/* Title & Subtitle */}
            <h3 className="rating-title">
              {hasRated ? "Thank you!" : "Rate your experience"}
            </h3>
            <p className="rating-subtitle">
              {hasRated 
                ? "Your rating helps us keep the editor polished for all OUTR students." 
                : "How was your experience generating your cover page?"}
            </p>
            
            {/* PeekRating Stars */}
            <div className="rating-stars-wrapper">
              <PeekRating
                value={rating}
                defaultValue={rating}
                count={5}
                shape="star"
                labels={['Needs work', 'Fair', 'Good', 'Great', 'Superb!']}
                activeColor="#f59e0b"
                idleColor={theme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.18)'}
                tipColor={theme === 'dark' ? '#18181b' : '#0f172a'}
                tipTextColor="#f5f5f5"
                size={32}
                lift={6}
                magnify={1.16}
                riseDuration={280}
                popScale={1.25}
                showTip={true}
                disabled={hasRated}
                onChange={handleRate}
              />
            </div>

            {/* Post-Rating Support Invite */}
            <AnimatePresence>
              {hasRated && (
                <motion.div 
                  className="rating-support-prompt"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="rating-support-text">
                    This utility is 100% free. If it saved your morning, consider buying a coffee!
                  </p>
                  <button 
                    className="rating-btn-coffee" 
                    onClick={onSupport}
                  >
                    <Coffee size={14} />
                    <span>Buy Me a Coffee</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="rating-actions">
              {!hasRated && (
                <button 
                  className="rating-btn-secondary" 
                  onClick={() => {
                    localStorage.setItem('popupClosed', 'true');
                    onClose();
                  }}
                >
                  Maybe later
                </button>
              )}
              <button 
                className="rating-btn-primary" 
                onClick={onClose}
              >
                {hasRated ? "Done" : "Not now"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RatingModal;
