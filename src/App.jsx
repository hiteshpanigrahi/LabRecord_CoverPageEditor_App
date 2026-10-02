import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import FormSection from './components/FormSection';
import TemplatePreview from './components/TemplatePreview';
import ConfirmModal from './components/Modals/ConfirmModal';
import RatingModal from './components/Modals/RatingModal';
import SupportModal from './components/Modals/SupportModal';
import LandingPage from './components/LandingPage';
import SupportPage from './components/SupportPage';
import WorkspaceActions from './components/WorkspaceActions';
import { FileText } from 'lucide-react';
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import './App.css';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyesKfS4l1pBGgsi1mzK4_B7N-5OtYM2vCJM-AZY3YvS1zSGXAFHr2xFWwxfg-9qJN7Nw/exec";
function App() {
  const MotionDiv = motion.div;
  const prefersReducedMotion = useReducedMotion();
  const [currentView, setCurrentView] = useState(() => {
    const savedView = localStorage.getItem('outrCurrentView');
    return savedView === 'workspace' || savedView === 'support' ? savedView : 'landing';
  });
  const [supportReturnView, setSupportReturnView] = useState('landing');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewZoomed, setIsPreviewZoomed] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('labFormData');
    return saved ? JSON.parse(saved) : {
      name: '', reg: '', school: '', branch: '', section: '', semester: '',
      lab: '', teacher1: '', teacher2: '', group: '', subGroup: ''
    };
  });
  const [toggles, setToggles] = useState(() => {
    const saved = localStorage.getItem('labToggles');
    const defaults = { secActive: true, groupActive: true, subGroupActive: true, tearLine: true };
    if (!saved) return defaults;
    try {
      const parsed = JSON.parse(saved);
      return { ...defaults, ...parsed };
    } catch {
      return defaults;
    }
  });
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('labActiveTab') || 'tab-1';
  });
  const [modals, setModals] = useState({
    confirm: false, exit: false, rating: false, supportQr: false
  });
  const [ratingStats, setRatingStats] = useState({ average: 0, count: 0 });

  const templateRef = useRef(null);
  const toastTimer = useRef(null);
  const formEndReached = useRef(false);
  const formStartReached = useRef(true);
  const formElasticControls = useAnimationControls();

  const handleEditorScroll = (event) => {
    const element = event.currentTarget;
    const hasOverflow = element.scrollHeight > element.clientHeight + 12;
    const atEnd = hasOverflow && element.scrollTop + element.clientHeight >= element.scrollHeight - 10;
    const atStart = hasOverflow && element.scrollTop <= 10;

    if (atEnd && !formEndReached.current) {
      formEndReached.current = true;
      if (!prefersReducedMotion) {
        formElasticControls.start({
          transformOrigin: '50% 100%',
          scaleY: [1, 1.018, 0.997, 1],
          transition: { duration: 0.9, times: [0, 0.38, 0.76, 1], ease: [0.22, 1, 0.36, 1] }
        });
      }
    } else if (!atEnd) {
      formEndReached.current = false;
    }

    if (atStart && !formStartReached.current) {
      formStartReached.current = true;
      if (!prefersReducedMotion) {
        formElasticControls.start({
          transformOrigin: '50% 0%',
          scaleY: [1, 0.985, 1.003, 1],
          transition: { duration: 0.9, times: [0, 0.38, 0.76, 1], ease: [0.22, 1, 0.36, 1] }
        });
      }
    } else if (!atStart) {
      formStartReached.current = false;
    }
  };

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

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('outrCurrentView', currentView);
  }, [currentView]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  useEffect(() => {
    if (!isPreviewZoomed) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsPreviewZoomed(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isPreviewZoomed]);

  const toggleTheme = () => setTheme(current => current === 'light' ? 'dark' : 'light');
  const openSupport = () => {
    setSupportReturnView(currentView === 'support' ? 'landing' : currentView);
    setCurrentView('support');
  };
  const closeSupport = () => setCurrentView(supportReturnView);

  const showToast = (message, type = 'success') => {
    window.clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = window.setTimeout(() => setToast(null), 3600);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    if (key === 'groupActive' && toggles.groupActive) setFormData(p => ({ ...p, group: '' }));
    if (key === 'subGroupActive' && toggles.subGroupActive) setFormData(p => ({ ...p, subGroup: '' }));
    if (key === 'secActive' && toggles.secActive) setFormData(p => ({ ...p, section: '' }));
    // Note: tearLine doesn't clear any formData
  };

  const resetForm = () => {
    setFormData({
      name: '', reg: '', school: '', branch: '', section: '', semester: '',
      lab: '', teacher1: '', teacher2: '', group: '', subGroup: ''
    });
    setToggles({ secActive: true, groupActive: true, subGroupActive: true, tearLine: true });
    setModals(p => ({ ...p, confirm: false }));
    localStorage.removeItem('labFormData');
    localStorage.removeItem('labToggles');
  };

  const downloadPDF = async () => {
    if (!templateRef.current) return;

    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf')
    ]);

    // Clone the template offscreen at full size so nothing flickers on screen
    const clone = templateRef.current.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.transform = 'none';
    clone.style.width = '600px';
    clone.style.height = '848.57px';
    clone.style.zIndex = '-1';
    clone.classList.add('is-printing');
    document.body.appendChild(clone);

    let canvas;
    try {
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      canvas = await html2canvas(clone, { scale: 3 });
    } finally {
      clone.remove();
    }

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

  const handleDownload = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      await downloadPDF();
      showToast('PDF downloaded successfully.');
    } catch (error) {
      console.error('PDF generation error:', error);
      showToast('PDF could not be generated. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`app-wrapper theme-${theme}${currentView === 'landing' ? ' landing-shell' : ''}${currentView === 'support' ? ' support-shell' : ''}`}>
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })}
      >
      {currentView === 'landing' ? (
        <MotionDiv
          key="landing-view"
          className="view-transition landing-view-transition"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <LandingPage ratingStats={ratingStats} theme={theme} onToggleTheme={toggleTheme} onLaunch={() => setCurrentView('workspace')} onSupport={openSupport} />
        </MotionDiv>
      ) : currentView === 'support' ? (
        <MotionDiv
          key="support-view"
          className="view-transition support-view-transition"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <SupportPage
            theme={theme}
            onBack={closeSupport}
            onToggleTheme={toggleTheme}
            onSupport={() => setModals(p => ({ ...p, supportQr: true }))}
          />
        </MotionDiv>
      ) : (
        <MotionDiv
          key="workspace-view"
          className="view-transition workspace-view-transition"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
      <div className="bg-container">
      </div>
      <Navbar ratingStats={ratingStats} theme={theme} onToggleTheme={toggleTheme} onBack={() => setModals(p => ({ ...p, exit: true }))} onSupport={openSupport} />

      <MotionDiv
          className="workspace-main"
          id="workspace"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="workspace-editor-column" aria-labelledby="workspace-editor-title">
          <div className="workspace-editor-heading">
            <div>
              <h1 id="workspace-editor-title">Details Editor</h1>
              <p>Configure report parameters</p>
            </div>
            <WorkspaceActions
              placement="desktop"
              onClear={() => setModals(p => ({ ...p, confirm: true }))}
              onDownload={handleDownload}
              isGenerating={isGenerating}
            />
          </div>
          <div className="workspace-editor-scroll-region" onScroll={handleEditorScroll}>
            <MotionDiv className="workspace-form-elastic" animate={formElasticControls} initial={false}>
              <FormSection
                formData={formData}
                toggles={toggles}
                handleInputChange={handleInputChange}
                handleToggle={handleToggle}
              />
            </MotionDiv>
          </div>
        </section>

        <section className="workspace-preview-column" aria-labelledby="workspace-template-title">
          <div className="workspace-template-heading">
            <span className="workspace-template-icon"><FileText size={17} /></span>
            <div><h2 id="workspace-template-title">Cover Template</h2><p>Select a layout · preview updates live</p></div>
          </div>
          <TemplatePreview
            formData={formData}
            toggles={toggles}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            templateRef={templateRef}
            onZoom={() => setIsPreviewZoomed(true)}
          />
          <WorkspaceActions
            placement="mobile"
            onClear={() => setModals(p => ({ ...p, confirm: true }))}
            onDownload={handleDownload}
            isGenerating={isGenerating}
          />
        </section>
      </MotionDiv>

      {isPreviewZoomed && (
        <div className="preview-zoom-overlay" onClick={() => setIsPreviewZoomed(false)}>
          <section className="preview-zoom-dialog" role="dialog" aria-modal="true" aria-label="Full-screen cover preview">
            <TemplatePreview
              formData={formData}
              toggles={toggles}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onDocumentClick={event => event.stopPropagation()}
            />
          </section>
        </div>
      )}

      {toast && <div className={`workspace-toast workspace-toast-${toast.type}`} role={toast.type === 'error' ? 'alert' : 'status'} aria-live={toast.type === 'error' ? 'assertive' : 'polite'}>{toast.message}</div>}

      {/* Modals */}
      <ConfirmModal
        isOpen={modals.confirm || modals.exit}
        intent={modals.exit ? 'exit' : 'clear'}
        theme={theme}
        onConfirm={modals.exit ? () => setCurrentView('landing') : resetForm}
        onClose={() => setModals(p => ({ ...p, confirm: false, exit: false }))}
      />
      <RatingModal
        isOpen={modals.rating}
        theme={theme}
        onClose={() => setModals(p => ({ ...p, rating: false }))}
        onSupport={() => {
          setModals(p => ({ ...p, rating: false, supportQr: true }));
        }}
      />
      <SupportModal
        isOpen={modals.supportQr}
        theme={theme}
        onClose={() => setModals(p => ({ ...p, supportQr: false }))}
      />
        </MotionDiv>
      )}
      </AnimatePresence>
    </div>
  );
}

export default App;
