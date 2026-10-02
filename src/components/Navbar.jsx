import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Coffee, FileText, Moon, Sun } from 'lucide-react';

const Navbar = ({ onBack, theme = 'light', onToggleTheme, onSupport }) => {
  const MotionHeader = motion.header;

  return (
    <MotionHeader
      className="workspace-topbar"
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <button className="workspace-back-button" onClick={onBack} aria-label="Back to home">
        <ArrowLeft size={16} /><span>Back to Home</span>
      </button>
      <a className="workspace-brand landing-brand" href="#workspace" aria-label="OUTR Coverpage Editor">
        <span className="workspace-brand-icon landing-brand-icon"><FileText size={20} strokeWidth={2.2} /></span>
        <span className="workspace-brand-name landing-brand-name"><b>OUTR</b><small>coverpage editor</small></span>
      </a>
      <div className="workspace-utility-actions">
        <button className="workspace-theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} aria-pressed={theme === 'dark'}>
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
        </button>
        <button className="workspace-coffee-button" onClick={onSupport}>
          <Coffee size={15} /><span>Buy me a coffee</span>
        </button>
      </div>
    </MotionHeader>
  );
};

export default Navbar;
