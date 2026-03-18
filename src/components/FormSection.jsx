import React from 'react';
import { motion } from 'framer-motion';
import { FaTrashAlt, FaDownload, FaCoffee, FaCut } from 'react-icons/fa';
import ComboBox from './ComboBox';

const FormSection = ({ formData, toggles, handleInputChange, handleToggle, onClear, onDownload, onSupport }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="editor">
      <motion.div 
        className="formSection glass-panel"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <h2>Personal Details</h2>
        <label htmlFor="name">Full Name:</label>
        <input className="glass-input" type="text" id="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" />
        
        <label htmlFor="reg">Reg No.:</label>
        <input className="glass-input" type="text" id="reg" value={formData.reg} onChange={handleInputChange} placeholder="Your Registration Number" />
      </motion.div>

      <motion.div 
        className="formSection glass-panel"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <h2>Academic Details</h2>
        <label htmlFor="school">School of:</label>
        <ComboBox 
          id="school" 
          value={formData.school} 
          onChange={handleInputChange} 
          placeholder="Select or type School"
          options={[
            "Electronics Sciences",
            "Electrical Sciences",
            "Mechanical Sciences",
            "Computer Sciences",
            "Infrastructure and Planning",
            "Biotechnology Engineering",
            "Textile Engineering"
          ]}
        />

        <label htmlFor="branch">Branch</label>
        <ComboBox 
          id="branch" 
          value={formData.branch} 
          onChange={handleInputChange} 
          placeholder="Select or type Branch"
          options={[
            "E&I", "ECE", "EE", "ME", "CE", "CSE", "IT", "AIML&R", "BT", "TE"
          ]}
        />

        <div className="form-group">
          <div className="label-row">
            <label htmlFor="section">Section:</label>
            <label className="switch">
              <input type="checkbox" checked={toggles.secActive} onChange={() => handleToggle('secActive')} />
              <span className="slider"></span>
            </label>
          </div>
          <ComboBox 
            id="section" 
            value={formData.section} 
            onChange={handleInputChange} 
            disabled={!toggles.secActive}
            placeholder="Select or type Section"
            options={["A", "B", "C"]}
          />
        </div>

        <label htmlFor="semester">Semester:</label>
        <ComboBox 
          id="semester" 
          value={formData.semester} 
          onChange={handleInputChange} 
          placeholder="Select or type Semester"
          options={[
            "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"
          ]}
        />
      </motion.div>

      <motion.div 
        className="formSection glass-panel"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <h2>Lab Details</h2>
        <label htmlFor="lab">Lab Name:</label>
        <input className="glass-input" type="text" id="lab" value={formData.lab} onChange={handleInputChange} placeholder="Enter Lab Name" />
        
        <label htmlFor="teacher1">Teacher 1:</label>
        <input className="glass-input" type="text" id="teacher1" value={formData.teacher1} onChange={handleInputChange} placeholder="Enter Teacher Name" />
        
        <label htmlFor="teacher2">Teacher 2:</label>
        <input className="glass-input" type="text" id="teacher2" value={formData.teacher2} onChange={handleInputChange} placeholder="Enter Teacher Name" />
        
        <div className="form-group">
          <div className="label-row">
            <label htmlFor="group">Group:</label>
            <label className="switch">
              <input type="checkbox" checked={toggles.groupActive} onChange={() => handleToggle('groupActive')} />
              <span className="slider"></span>
            </label>
          </div>
          <input className="glass-input" type="text" id="group" value={formData.group} onChange={handleInputChange} disabled={!toggles.groupActive} placeholder="Enter Group" />
        </div>
        <div className="form-group">
          <div className="label-row">
            <label htmlFor="subGroup">Sub-Group:</label>
            <label className="switch">
              <input type="checkbox" checked={toggles.subGroupActive} onChange={() => handleToggle('subGroupActive')} />
              <span className="slider"></span>
            </label>
          </div>
          <input className="glass-input" type="text" id="subGroup" value={formData.subGroup} onChange={handleInputChange} disabled={!toggles.subGroupActive} placeholder="Enter Sub-Group" />
        </div>

        <div className="form-group" style={{ marginTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
          <div className="label-row">
            <label htmlFor="tearLine" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <FaCut style={{ transform: 'rotate(-45deg)' }} /> Tear Line 
            </label>
            <label className="switch">
              <input type="checkbox" id="tearLine" checked={toggles.tearLine} onChange={() => handleToggle('tearLine')} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="editor-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button className="btn btn-secondary" onClick={onClear}>
          <FaTrashAlt /> Clear All
        </button>
        <button className="btn btn-primary" onClick={onDownload}>
          <FaDownload /> Download
        </button>
        <button className="btn btn-support" onClick={onSupport}>
          🍵 Buy me a Coffee
        </button>
      </motion.div>
    </div>
  );
};

export default FormSection;
