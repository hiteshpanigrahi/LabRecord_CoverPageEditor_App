import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ComboBox = ({ id, value, onChange, options, placeholder, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    onChange(e);
    setIsOpen(true);
  };

  const handleOptionClick = (optionValue) => {
    onChange({ target: { id, value: optionValue } });
    setIsOpen(false);
  };

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes((value || '').toLowerCase())
  );

  return (
    <div className="combobox-wrapper" ref={wrapperRef}>
      <input
        type="text"
        id={id}
        className="glass-input"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
      />
      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="combobox-dropdown"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <div 
                  key={idx}
                  className="combobox-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="combobox-noresult">
                Use custom value: "{value}"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComboBox;
