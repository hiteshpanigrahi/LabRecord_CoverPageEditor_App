import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Trash2, X } from 'lucide-react';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, onConfirm, onClose, theme = 'dark', intent = 'clear' }) => {
  const isExit = intent === 'exit';
  const DialogIcon = isExit ? LogOut : Trash2;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={`confirm-modal-overlay theme-${theme}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div 
            className={`confirm-modal-card${isExit ? ' confirm-modal-exit' : ''}`}
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
          >
            {/* Top Close Button */}
            <button 
              className="confirm-close-btn" 
              onClick={onClose}
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>

            {/* Icon Badge */}
            <div className="confirm-icon-box">
              <DialogIcon size={22} />
            </div>

            {/* Content */}
            <h3 className="confirm-title">{isExit ? 'Leave the workspace?' : 'Clear all details?'}</h3>
            <p className="confirm-description">
              {isExit
                ? 'Your details are saved in this browser. Return to the homepage?'
                : 'This will reset all entered student, subject, and faculty fields back to empty defaults.'}
            </p>

            {/* Action Buttons */}
            <div className="confirm-actions">
              <button 
                className="confirm-btn-cancel" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                className={isExit ? 'confirm-btn-primary' : 'confirm-btn-danger'}
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {isExit ? 'Leave Workspace' : 'Clear Form'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
