import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import outrLogo from '../assets/images/outr_logo.png';

const TemplatePreview = ({ formData, toggles, activeTab, setActiveTab, templateRef }) => {
  const tabs = ['tab-1', 'tab-2', 'tab-3'];

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
      <div className="template-scale-wrapper">
        <div className="tabs-header">
          {tabs.map((tab, idx) => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              Template {idx + 1}
            </button>
          ))}
        </div>
        <div className="template-container">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              className="template-wrapper" 
              ref={templateRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="template-border">
                <h3 className="university">
                  ODISHA UNIVERSITY OF <br />TECHNOLOGY AND RESEARCH
                </h3>
                <h3 className="location">BHUBANESWAR</h3>
                <h3 className="department">
                  {getDepartmentName(formData.school)}
                </h3>
                
                <img src={outrLogo} alt="University Logo" className="uni-logo" />
                
                <h2 className="lab-name">
                  {formData.lab || ""} <br />LAB RECORD
                </h2>

                {getTemplateLayout()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
