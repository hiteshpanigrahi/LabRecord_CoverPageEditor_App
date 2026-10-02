import React, { useState } from 'react';
import { ChevronDown, FileText, GraduationCap, Scissors, UserRound } from 'lucide-react';
import ComboBox from './ComboBox';

function FieldLabel({ id, label, toggle }) {
  return (
    <div className="workspace-field-label-row">
      <label htmlFor={id}>{label}</label>
      <div className="workspace-field-label-actions">
        {toggle}
      </div>
    </div>
  );
}

function OptionalSwitch({ checked, label, onChange }) {
  return (
    <button
      type="button"
      className="workspace-switch"
      role="switch"
      aria-label={label}
      aria-checked={checked}
      onClick={onChange}
    ><span /></button>
  );
}

const schoolOptions = [
  'Electronics Sciences', 'Electrical Sciences', 'Mechanical Sciences',
  'Computer Sciences', 'Infrastructure and Planning', 'Biotechnology Engineering',
  'Textile Engineering'
];
const branchOptions = ['E&I', 'ECE', 'EE', 'ME', 'CE', 'CSE', 'IT', 'AIML&R', 'BT', 'TE'];
const semesterOptions = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

const FormSection = ({
  formData, toggles, handleInputChange, handleToggle
}) => {
  const [expanded, setExpanded] = useState({ personal: true, academic: true, cover: true });

  const toggle = (key, label) => <OptionalSwitch checked={toggles[key]} label={label} onChange={() => handleToggle(key)} />;

  const sectionHeader = (key, title, Icon) => {
    const SectionIcon = Icon;
    return (
      <button
      type="button"
      className="workspace-section-header"
      aria-expanded={expanded[key]}
      onClick={() => setExpanded(previous => ({ ...previous, [key]: !previous[key] }))}
    >
      <span className="workspace-section-icon"><SectionIcon size={17} /></span>
      <span className="workspace-section-title">{title}</span>
      <ChevronDown className={expanded[key] ? 'workspace-chevron expanded' : 'workspace-chevron'} size={18} />
      </button>
    );
  };

  return (
    <div className="editor workspace-form-sections">
      <section className="formSection glass-panel workspace-form-card">
        {sectionHeader('personal', 'Personal Details', UserRound)}
        {expanded.personal && <div className="workspace-section-content" id="workspace-section-personal">
          <div className="workspace-fields-grid">
            <div className="workspace-field">
              <FieldLabel id="name" label="Full Name" />
              <input className="glass-input" type="text" id="name" value={formData.name} onChange={handleInputChange} placeholder="Enter full name" autoComplete="name" />
            </div>
            <div className="workspace-field">
              <FieldLabel id="reg" label="Redg. No." />
              <input className="glass-input" type="text" id="reg" value={formData.reg} onChange={handleInputChange} placeholder="e.g. 2201089204" autoComplete="off" />
            </div>
          </div>
        </div>}
      </section>

      <section className="formSection glass-panel workspace-form-card">
        {sectionHeader('academic', 'Academic Details', GraduationCap)}
        {expanded.academic && <div className="workspace-section-content" id="workspace-section-academic">
          <div className="workspace-fields-grid">
            <div className="workspace-field">
              <FieldLabel id="school" label="School Of" />
              <ComboBox id="school" value={formData.school} onChange={handleInputChange} options={schoolOptions} placeholder="Select school" />
            </div>
            <div className="workspace-field">
              <FieldLabel id="branch" label="Branch" />
              <ComboBox id="branch" value={formData.branch} onChange={handleInputChange} options={branchOptions} placeholder="Select branch" />
            </div>
            <div className="workspace-field">
              <FieldLabel id="section" label="Section" toggle={toggle('secActive', 'Show Section')} />
              <ComboBox id="section" value={formData.section} onChange={handleInputChange} options={['A', 'B', 'C']} disabled={!toggles.secActive} placeholder="Select section" />
            </div>
            <div className="workspace-field">
              <FieldLabel id="semester" label="Semester" />
              <ComboBox id="semester" value={formData.semester} onChange={handleInputChange} options={semesterOptions} placeholder="Select semester" />
            </div>
          </div>
        </div>}
      </section>

      <section className="formSection glass-panel workspace-form-card">
        {sectionHeader('cover', 'Cover Details', FileText)}
        {expanded.cover && <div className="workspace-section-content" id="workspace-section-cover">
          <div className="workspace-fields-grid">
            <div className="workspace-field workspace-field-full">
              <FieldLabel id="lab" label="Lab Name" />
              <input className="glass-input" type="text" id="lab" value={formData.lab} onChange={handleInputChange} placeholder="Enter lab name" />
            </div>
            <div className="workspace-field">
              <FieldLabel id="teacher1" label="Teacher 1" />
              <input className="glass-input" type="text" id="teacher1" value={formData.teacher1} onChange={handleInputChange} placeholder="Faculty name" />
            </div>
            <div className="workspace-field">
              <FieldLabel id="teacher2" label="Teacher 2" />
              <input className="glass-input" type="text" id="teacher2" value={formData.teacher2} onChange={handleInputChange} placeholder="Faculty name" />
            </div>
            <div className="workspace-field">
              <FieldLabel id="group" label="Group" toggle={toggle('groupActive', 'Show Group')} />
              <input className="glass-input" type="text" id="group" value={formData.group} onChange={handleInputChange} disabled={!toggles.groupActive} placeholder="Group" />
            </div>
            <div className="workspace-field">
              <FieldLabel id="subGroup" label="Sub-group" toggle={toggle('subGroupActive', 'Show Sub-group')} />
              <input className="glass-input" type="text" id="subGroup" value={formData.subGroup} onChange={handleInputChange} disabled={!toggles.subGroupActive} placeholder="Sub-group" />
            </div>
          </div>
          <div className="workspace-tearline-row">
            <span className="workspace-tearline-icon"><Scissors size={16} /></span>
            <span className="workspace-tearline-copy"><b>Tear-off slip cut line</b><small>Include a cut line in the PDF output</small></span>
            {toggle('tearLine', 'Include tear-off cut line')}
          </div>
        </div>}
      </section>
    </div>
  );
};

export default FormSection;
