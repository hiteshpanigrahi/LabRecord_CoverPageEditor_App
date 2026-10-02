import React, { useState } from 'react';
import { Check, Coffee, Copy, Github, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import qrCode from '../assets/images/GooglePay_QR.png';
import Navbar from './Navbar';
import './SupportPage.css';

const SupportPage = ({ theme, onBack, onToggleTheme, onSupport }) => {
  const [copied, setCopied] = useState(false);
  const upiId = 'hitesh.edu9@okaxis';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(upiId);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main className={`support-page theme-${theme}`}>
      <Navbar theme={theme} onToggleTheme={onToggleTheme} onBack={onBack} onSupport={onSupport} />

      <section className="support-page-card" id="support-top" aria-labelledby="support-page-title">
        <div className="support-page-message">
          <span className="support-page-eyebrow"><Coffee size={14} /> Support the project</span>
          <h1 id="support-page-title">Support the project</h1>
          <p className="support-page-lead">I honestly just built this to save my own sanity. My flatmates and friends kept asking me to format their cover pages, and trying to fix clunky MS Word or Canva layouts on a phone right before a lab was incredibly annoying.</p>
          <p>I threw this together so we could just type, print, and be done with it. It’s completely free, private, and runs right in your browser. If it saved you from a last-minute formatting headache today, consider buying me a coffee to help keep the site running!</p>
          <div className="support-page-highlights">
            <span><Sparkles size={14} /> Always free to use</span>
            <span><ShieldCheck size={14} /> Quick and simple</span>
          </div>
          <div className="support-page-links">
            <a href="mailto:hitesh.edu@gmail.com"><Mail size={15} /> Email</a>
            <a href="https://github.com/hiteshpanigrahi" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
          </div>
        </div>

        <div className="support-page-payment">
          <div className="support-page-payment-heading">
            <span className="support-page-payment-kicker">Fuel the next update</span>
            <h2>Buy me a coffee</h2>
          </div>
          <div className="support-page-qr-box">
            <img src={qrCode} alt="UPI QR Code for supporting Hitesh Panigrahi" />
          </div>
          <p>Scan with GPay, PhonePe, Paytm, or any UPI app.</p>
          <button type="button" className="support-page-upi" onClick={handleCopy} aria-label="Copy UPI ID">
            <span>{upiId}</span>
            {copied ? <><Check size={15} /><span>Copied</span></> : <Copy size={15} />}
          </button>
        </div>
      </section>
    </main>
  );
};

export default SupportPage;
