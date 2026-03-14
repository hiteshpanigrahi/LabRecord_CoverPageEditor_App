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
            <h3 style={{ color: 'white', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <FaCoffee color="#ffd166"/> Support this project
            </h3>
            <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
              If this tool helped you, consider buying me a coffee.
            </p>

            {/* In a real project you'd place GooglePay_QR.png in public/ */}
            <img 
              src={qrCode} 
              alt="UPI QR Code" 
              style={{ width: '180px', borderRadius: '12px', marginBottom: '20px' }} 
            />

            <div 
              style={{ 
                position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: '12px 20px', background: 'rgba(255,255,255,0.1)', 
                borderRadius: '8px', cursor: 'pointer', marginBottom: '20px',
                color: 'white', fontWeight: 'bold'
              }}
              onClick={handleCopy}
            >
              <span>{upiId}</span>
              <FaCopy />
              
              <AnimatePresence>
                {copied && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      position: 'absolute', top: '-35px', background: 'rgba(50,50,50,0.9)',
                      padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: 'white'
                    }}
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
