import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCopy, FaCoffee } from 'react-icons/fa';
import qrCode from '../../assets/images/GooglePay_QR.png';

const SupportModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const upiId = "hitesh.edu9@okaxis";

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
          >
            <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <FaCoffee color="currentColor"/> Support this project
            </h3>
            <p className="modal-text" style={{ marginBottom: '20px' }}>
              If this tool helped you, consider buying me a coffee.
            </p>

            {/* In a real project you'd place GooglePay_QR.png in public/ */}
            <img 
              src={qrCode} 
              alt="UPI QR Code" 
              style={{ width: '180px', borderRadius: '12px', marginBottom: '20px' }} 
            />

            <div className="upi-chip" onClick={handleCopy}>
              <span>{upiId}</span>
              <FaCopy />
              
              <AnimatePresence>
                {copied && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="upi-copied-tooltip"
                  >
                    Copied!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="btn btn-secondary" onClick={onClose} style={{ width: '100%' }}>
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupportModal;
