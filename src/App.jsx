import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import FormSection from './components/FormSection';
import TemplatePreview from './components/TemplatePreview';
import Footer from './components/Footer';
import ConfirmModal from './components/Modals/ConfirmModal';
import RatingModal from './components/Modals/RatingModal';
import SupportModal from './components/Modals/SupportModal';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './App.css';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyesKfS4l1pBGgsi1mzK4_B7N-5OtYM2vCJM-AZY3YvS1zSGXAFHr2xFWwxfg-9qJN7Nw/exec";

function App() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('labFormData');
    return saved ? JSON.parse(saved) : {
      name: '', reg: '', school: '', branch: '', section: '', semester: '',
      lab: '', teacher1: '', teacher2: '', group: '', subGroup: ''
    };
  });
  const [toggles, setToggles] = useState(() => {
    const saved = localStorage.getItem('labToggles');
    return saved ? JSON.parse(saved) : {
      secActive: true, groupActive: true, subGroupActive: true
    };
  });
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('labActiveTab') || 'tab-1';
  });
  const [modals, setModals] = useState({
    confirm: false, rating: false, support: false
  });
  const [ratingStats, setRatingStats] = useState({ average: 0, count: 0 });

  const templateRef = useRef(null);

  useEffect(() => {
    // Generate/Restore UserID
    let uid = localStorage.getItem('userID');
    if (!uid) {
      uid = Math.random().toString(36).substring(2);
      localStorage.setItem('userID', uid);
    }

    // Fetch Rating Stats
    fetch(SCRIPT_URL)
      .then(res => res.json())
      .then(data => {
        if (data && data.count) {
          setRatingStats({ average: data.average, count: data.count });
        }
      })
      .catch(err => console.error("Stats Fetch Error:", err));
  }, []);

  useEffect(() => {
    localStorage.setItem('labFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('labToggles', JSON.stringify(toggles));
  }, [toggles]);

  useEffect(() => {
    localStorage.setItem('labActiveTab', activeTab);
  }, [activeTab]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    if (key === 'groupActive' && toggles.groupActive) setFormData(p => ({ ...p, group: '' }));
    if (key === 'subGroupActive' && toggles.subGroupActive) setFormData(p => ({ ...p, subGroup: '' }));
    if (key === 'secActive' && toggles.secActive) setFormData(p => ({ ...p, section: '' }));
  };

  const resetForm = () => {
    setFormData({
      name: '', reg: '', school: '', branch: '', section: '', semester: '',
      lab: '', teacher1: '', teacher2: '', group: '', subGroup: ''
    });
    setToggles({ secActive: true, groupActive: true, subGroupActive: true });
    setModals(p => ({ ...p, confirm: false }));
    localStorage.removeItem('labFormData');
    localStorage.removeItem('labToggles');
  };

  const downloadPDF = async () => {
    if (!templateRef.current) return;

    // Clone the template offscreen at full size so nothing flickers on screen
    const clone = templateRef.current.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.transform = 'none';
    clone.style.width = '600px';
    clone.style.height = '750px';
    clone.style.zIndex = '-1';
    document.body.appendChild(clone);

    // Wait one frame for the browser to layout the clone
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    const canvas = await html2canvas(clone, { scale: 3 });
    document.body.removeChild(clone);

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    const firstName = formData.name.split(' ')[0] || 'student';
    const firstLab = formData.lab.split(' ')[0] || 'lab';
    pdf.save(`${firstName}_${firstLab}_coverpage.pdf`);

    // Show rating after download if not closed permanently
    if (!localStorage.getItem('popupClosed')) {
      setTimeout(() => {
        setModals(p => ({ ...p, rating: true }));
      }, 1200);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="bg-container">
      </div>
      <Navbar ratingStats={ratingStats} />

      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <FormSection
          formData={formData}
          toggles={toggles}
          handleInputChange={handleInputChange}
          handleToggle={handleToggle}
          onClear={() => setModals(p => ({ ...p, confirm: true }))}
          onDownload={downloadPDF}
          onSupport={() => setModals(p => ({ ...p, support: true }))}
        />

        <TemplatePreview
          formData={formData}
          toggles={toggles}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          templateRef={templateRef}
        />
      </motion.div>

      <Footer />

      {/* Modals */}
      <ConfirmModal
        isOpen={modals.confirm}
        onConfirm={resetForm}
        onClose={() => setModals(p => ({ ...p, confirm: false }))}
      />
      <RatingModal
        isOpen={modals.rating}
        onClose={() => setModals(p => ({ ...p, rating: false }))}
        onSupport={() => {
          setModals(p => ({ ...p, rating: false, support: true }));
        }}
      />
      <SupportModal
        isOpen={modals.support}
        onClose={() => setModals(p => ({ ...p, support: false }))}
      />
    </div>
  );
}

export default App;
