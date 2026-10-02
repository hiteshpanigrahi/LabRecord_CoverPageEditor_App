import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Expand } from 'lucide-react';
import outrLogo from '../assets/images/outr_logo.png';
import scissorsImg from '../assets/images/scissors.png';

const TemplatePreview = ({ formData, toggles, activeTab, setActiveTab, templateRef, onZoom, onDocumentClick }) => {
  const MotionDiv = motion.div;
  const touchStartX = useRef(null);
  const suppressClick = useRef(false);
  const [slideDirection, setSlideDirection] = useState(1);
  const tabs = ['tab-1', 'tab-2', 'tab-3'];
  const selectTemplate = (nextTab) => {
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = tabs.indexOf(nextTab);
    if (currentIndex !== nextIndex) {
      setSlideDirection(nextIndex > currentIndex ? 1 : -1);
      setActiveTab(nextTab);
    }
  };
  // Helper to get formatted department
  const getDepartmentName = (school) => {
    let result = "School of";
    if (school) {
      const lower = school.toLowerCase();
      if (lower.includes("biotechnology") || lower.includes("textile")) {
        result = school + " Department";
      } else {
        result = "School of " + school;
      }
    }
    return result;
  };

  const getTemplateLayout = () => {
    switch(activeTab) {
      case 'tab-2':
        return (
          <div className="info">
            <div className="submitted-by-t2">
              <h4>SUBMITTED BY: -</h4>
              <h5>NAME: <span>{formData.name || ""}</span></h5>
              <h5>REGD NO: <span>{formData.reg || ""}</span></h5>
              <h5>DEPT: <span>{formData.branch || ""}</span></h5>
              <h5>SEM: <span>{formData.semester || ""}</span></h5>
              {toggles.secActive && <h5>SEC: <span>{formData.section || ""}</span></h5>}
              {toggles.groupActive && <h5>GROUP: <span>{formData.group || ""}</span></h5>}
              {toggles.subGroupActive && <h5>SUB-GROUP: <span>{formData.subGroup || ""}</span></h5>}
            </div>
          </div>
        );
      case 'tab-3':
        return (
          <div className="info">
            <div className="submitted-to transparent-box">
              <h4>SUBMITTED TO: -</h4>
              <h5><span>{formData.teacher1 || ""}</span></h5>
              <h5><span>{formData.teacher2 || ""}</span></h5>
            </div>
            <div className="submitted-by transparent-box">
              <h4>SUBMITTED BY: -</h4>
              <h5>NAME: <span>{formData.name || ""}</span></h5>
              <h5>REGD NO: <span>{formData.reg || ""}</span></h5>
              <h5>DEPT: <span>{formData.branch || ""}</span></h5>
              <h5>SEM: <span>{formData.semester || ""}</span></h5>
              {toggles.secActive && <h5>SEC: <span>{formData.section || ""}</span></h5>}
              {toggles.groupActive && <h5>GROUP: <span>{formData.group || ""}</span></h5>}
              {toggles.subGroupActive && <h5>SUB-GROUP: <span>{formData.subGroup || ""}</span></h5>}
            </div>
          </div>
        );
      case 'tab-1':
      default:
        return (
          <div className="info">
            <div className="submitted-to">
              <h4>SUBMITTED TO: -</h4>
              <h5>{formData.teacher1 || ""}</h5>
              <h5>{formData.teacher2 || ""}</h5>
            </div>
            <div className="submitted-by">
              <h4>SUBMITTED BY: -</h4>
              <h5>NAME: <span>{formData.name || ""}</span></h5>
              <h5>REGD NO: <span>{formData.reg || ""}</span></h5>
              <h5>DEPT: <span>{formData.branch || ""}</span></h5>
              <h5>SEM: <span>{formData.semester || ""}</span></h5>
              {toggles.secActive && <h5>SEC: <span>{formData.section || ""}</span></h5>}
              {toggles.groupActive && <h5>GROUP: <span>{formData.group || ""}</span></h5>}
              {toggles.subGroupActive && <h5>SUB-GROUP: <span>{formData.subGroup || ""}</span></h5>}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="tabs">
      <div className="tabs-header" role="tablist" aria-label="Cover template">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => selectTemplate(tab)}
            role="tab"
            aria-selected={activeTab === tab}
            aria-label={`Select Template ${idx + 1}`}
          >
            <span className="template-tab-radio" aria-hidden="true" />
            <span>Cover {idx + 1}</span>
          </button>
        ))}
      </div>
      <div className="template-scale-wrapper">
        <div className="template-container" onClick={onDocumentClick}>
          {onZoom && <button type="button" className="preview-zoom-hint" onClick={onZoom} aria-label="Open full-screen preview"><Expand size={16} /></button>}
          <AnimatePresence mode="wait">
            <MotionDiv
              key={activeTab}
              className="template-wrapper" 
              ref={templateRef}
              initial={{ opacity: 0, x: slideDirection * 88, scale: .96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: slideDirection * -88, scale: .96 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18, mass: .68 }}
              onClick={() => {
                if (suppressClick.current) {
                  suppressClick.current = false;
                  return;
                }
                onZoom?.();
              }}
              onTouchStart={event => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
              onTouchEnd={event => {
                if (touchStartX.current === null) return;
                const delta = event.changedTouches[0].clientX - touchStartX.current;
                touchStartX.current = null;
                if (Math.abs(delta) < 55) return;
                const currentIndex = tabs.indexOf(activeTab);
                const nextIndex = (currentIndex + (delta < 0 ? 1 : tabs.length - 1)) % tabs.length;
                setSlideDirection(delta < 0 ? 1 : -1);
                setActiveTab(tabs[nextIndex]);
                suppressClick.current = true;
                window.setTimeout(() => { suppressClick.current = false; }, 450);
              }}
              onKeyDown={event => {
                if (onZoom && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  onZoom();
                }
              }}
              role={onZoom ? 'button' : undefined}
              tabIndex={onZoom ? 0 : undefined}
              aria-label={onZoom ? 'Open full-screen preview' : undefined}
            >
              <div className="template-border">
                <h3 className="university">
                  ODISHA UNIVERSITY OF <br />TECHNOLOGY AND RESEARCH
                </h3>
                <h3 className="location">BHUBANESWAR</h3>
                <h3 className="department">
                  <span>{getDepartmentName(formData.school)}</span>
                </h3>
                
                <img src={outrLogo} alt="University Logo" className="uni-logo" />
                
                <h2 className="lab-name">
                  {formData.lab || ""} <br />LAB RECORD
                </h2>

                {getTemplateLayout()}
              </div>
              
              {toggles.tearLine && (
                <div className="tear-line-container">
                  <div className="tear-line"></div>
                  <img src={scissorsImg} alt="scissors" className="scissor-icon print-only" />
                </div>
              )}
            </MotionDiv>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
