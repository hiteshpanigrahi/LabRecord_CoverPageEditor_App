import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Copy, Check, X } from 'lucide-react';
import qrCode from '../../assets/images/GooglePay_QR.png';
import './SupportModal.css';

const SupportModal = ({ isOpen, onClose, theme = 'dark' }) => {
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
          className={`support-overlay theme-${theme}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="support-modal-card"
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          >
            {/* Top Close Button */}
            <button
              className="support-close-btn"
              onClick={onClose}
              aria-label="Close dialog"
            >
              <X size={17} />
            </button>

            {/* Content Container */}
            <div className="support-grid">
              {/* Left Details Column (Desktop) / Top Details (Mobile) */}
              <div className="support-left">
                <div className="support-tag-pill">
                  <Coffee size={13} />
                  <span>Buy Me a Coffee</span>
                </div>

                <h3 className="support-heading">Support the Project</h3>

              </div>

              {/* Right QR & UPI Column */}
              <div className="support-right">
                <div className="support-qr-box">
                  <img
                    src={qrCode}
                    alt="UPI QR Code - Hitesh Panigrahi"
                    className="support-qr-img"
                  />
                </div>

                <button
                  className="support-upi-pill"
                  onClick={handleCopy}
                  title="Click to copy UPI ID"
                  aria-label="Copy UPI ID"
                >
                  <span className="upi-id-text">{upiId}</span>
                  {copied ? (
                    <span className="upi-copied-indicator">
                      <Check size={14} />
                      <span className="copied-label">Copied</span>
                    </span>
                  ) : (
                    <Copy size={14} className="upi-copy-icon" />
                  )}

                  <AnimatePresence>
                    {copied && (
                      <motion.div
                        className="support-copied-toast"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                      >
                        ✓ Copied to clipboard!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                <span className="support-apps-note">
                  Scan with GPay, PhonePe, Paytm, or any UPI app
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupportModal;
