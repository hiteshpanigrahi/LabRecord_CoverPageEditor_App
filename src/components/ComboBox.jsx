import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ComboBox = ({ id, value, onChange, options, placeholder, disabled, onBlur, ...ariaProps }) => {
  const MotionDiv = motion.div;
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef(null);
  const listboxId = `${id}-options`;

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
    setActiveIndex(0);
    setIsOpen(true);
  };

  const handleOptionClick = (optionValue) => {
    onChange({ target: { id, value: optionValue } });
    setIsOpen(false);
  };

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes((value || '').toLowerCase())
  );

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex(current => {
        if (!filteredOptions.length) return 0;
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        return (current + direction + filteredOptions.length) % filteredOptions.length;
      });
    }
    if (event.key === 'Enter' && isOpen && filteredOptions.length) {
      event.preventDefault();
      handleOptionClick(filteredOptions[Math.min(activeIndex, filteredOptions.length - 1)]);
    }
  };

  return (
    <div className="combobox-wrapper" ref={wrapperRef}>
      <input
        type="text"
        id={id}
        className="glass-input"
        value={value}
        onChange={handleInputChange}
        onFocus={() => { setIsOpen(true); setActiveIndex(0); }}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen && !disabled}
        aria-controls={isOpen && !disabled ? listboxId : undefined}
        aria-activedescendant={isOpen && filteredOptions.length ? `${listboxId}-${activeIndex}` : undefined}
        {...ariaProps}
      />
      <AnimatePresence>
        {isOpen && !disabled && (
          <MotionDiv
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="combobox-dropdown"
            id={listboxId}
            role="listbox"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <div 
                  key={idx}
                  id={`${listboxId}-${idx}`}
                  role="option"
                  aria-selected={idx === activeIndex}
                  className={`combobox-option${idx === activeIndex ? ' active' : ''}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseDown={event => event.preventDefault()}
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
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComboBox;
