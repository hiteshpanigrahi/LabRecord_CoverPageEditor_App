import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowRight, CheckCircle2, ChevronDown, FileText, Github,
  Linkedin, Mail, Moon, Printer, ScanEye, ShieldCheck, Sun, Users, Star,
  Zap, Layers3, Download
} from 'lucide-react';
import outrLogo from '../assets/images/outr_logo.png';

const MotionHeader = motion.header;
const MotionSection = motion.section;
const MotionOl = motion.ol;
const MotionLi = motion.li;
const MotionDiv = motion.div;
const MotionArticle = motion.article;
const MotionDetails = motion.details;
const MotionFooter = motion.footer;

const faqs = [
  {
    question: 'Is this format accepted across all OUTR departments?',
    answer: 'Yes. It adheres strictly to the official university emblem resolution, department hierarchy, and signature block standards required by OUTR lab evaluators.'
  },
  {
    question: 'Why use this instead of MS Word or Canva?',
    answer: 'MS Word tables break easily between different devices, while Canva requires manual layout setup and paywalled exports. This editor is built strictly for OUTR sheets, so the typography, margins, and emblem placement are locked in.'
  },
  {
    question: 'Why choose this over downloaded templates?',
    answer: 'Downloaded templates usually force you to delete placeholder text, re-align shifted headers, or fix low-resolution logos. Here, your basic details are saved after typing once, reducing your prep time before every lab.'
  },
  {
    question: 'How does the tearline feature work?',
    answer: 'It renders a precise, print-safe dashed cutting line on the sheet, making it effortless to trim or separate tear-off evaluation slips.'
  },
  {
    question: 'Can I generate and export the PDF directly from my phone?',
    answer: 'Yes. Open the site on your mobile browser, fill in your experiment details, and export a clean PDF straight to WhatsApp or the Xerox shop’s email.'
  }
];

const testimonials = [
  {
    quoteTitle: 'Honestly faster than making Maggi.',
    rating: 5.0,
    author: 'Soumya R., 5th Sem',
    body: 'Typed my name and roll number once, and when I opened it next week for another lab, it was still there. Literally took 30 seconds outside the print shop.'
  },
  {
    quoteTitle: 'Way better than asking a senior for their old template.',
    rating: 5.0,
    author: 'Rohan P., 2nd Sem',
    body: 'Every time I tried to edit a lab record on my phone using Canva or Word, the text boxes would fly everywhere. This thing is instant. Total lifesaver.'
  },
  {
    quoteTitle: 'Too good to be free—actual lifesaver.',
    rating: 5.0,
    author: 'Pooja M., 3rd Sem',
    body: 'I used to dread fixing fonts and blurred logos before submissions. You just type, hit print, and you are sorted.'
  }
];

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } }
};
const staggerReveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } }
};
const itemReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } }
};

const heroSlides = [
  {
    headline: 'Lab records,',
    emphasis: 'ready in seconds.',
    description: ['Formatted to OUTR department standards with true A4 margins', 'and zero alignment headaches at the print shop.']
  },
  {
    headline: 'Official OUTR covers,',
    emphasis: 'zero hassle.',
    description: ['Input your details, preview the exact layout in real time,', 'and export clean, print-ready PDFs in seconds.']
  },
  {
    headline: 'Skip Word formatting',
    emphasis: 'for lab reports.',
    description: ['A dedicated cover page builder with correct university seals,', 'department hierarchies, and print-safe layouts.']
  }
];

function LaunchButton({ onClick }) {
  return (
    <button className="landing-launch" onClick={onClick}>
      <span>Launch Workspace</span><ArrowRight size={18} aria-hidden="true" />
    </button>
  );
}

const LandingPage = ({ ratingStats, theme, onToggleTheme, onLaunch, onSupport }) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroTouchStart = useRef(null);
  const testimonialTouchStart = useRef(null);
  const average = Number(ratingStats?.average);
  const count = Number(ratingStats?.count);
  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const intervalId = window.setInterval(() => {
      setActiveHeroSlide(current => (current + 1) % heroSlides.length);
    }, 7000);
    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);
  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const intervalId = window.setInterval(() => {
      setActiveTestimonial(current => (current + 1) % testimonials.length);
    }, 6500);
    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);
  const sectionMotion = prefersReducedMotion
    ? { initial: false }
    : { variants: sectionReveal, initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.16 } };
  const introMotion = prefersReducedMotion
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } };
  const swipeToSlide = (startX, endX, length, setSlide) => {
    if (startX === null || Math.abs(endX - startX) < 40) return;
    setSlide(current => (current + (endX < startX ? 1 : length - 1)) % length);
  };
  return (
    <main className={`landing-page theme-${theme}`}>
      <MotionHeader className="landing-header" {...introMotion}>
        <a className="landing-brand" href="#top" aria-label="OUTR Coverpage Editor home">
          <span className="landing-brand-icon"><FileText size={20} strokeWidth={2.2} /></span>
          <span className="landing-brand-name"><b>OUTR</b><small>coverpage editor</small></span>
        </a>
        <div className="landing-header-actions">
          {count > 0 && (
            <div className="landing-stats" aria-label={`${count} student ratings, average ${average.toFixed(1)} out of 5`}>
              <span><Users size={14} /> {count}</span><i aria-hidden="true" />
              <span><Star size={14} fill="currentColor" /> {average.toFixed(1)}</span>
            </div>
          )}
          <button className="landing-theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} aria-pressed={theme === 'dark'}>
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
        </div>
      </MotionHeader>

      <MotionSection className="landing-hero" id="top" {...introMotion}>
        <div className="landing-hero-content">
          <div
            className="landing-copy-swipe-area"
            onTouchStart={(event) => { heroTouchStart.current = event.touches[0].clientX; }}
            onTouchEnd={(event) => {
              swipeToSlide(heroTouchStart.current, event.changedTouches[0].clientX, heroSlides.length, setActiveHeroSlide);
              heroTouchStart.current = null;
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeHeroSlide}
                className="landing-copy"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="landing-eyebrow">A SIMPLE TOOL FOR OUTR STUDENTS <span className="landing-eyebrow-dash" aria-hidden="true"></span></p>
                <h1><span className="landing-hero-line">{heroSlides[activeHeroSlide].headline}</span><em className="landing-hero-line">{heroSlides[activeHeroSlide].emphasis}</em></h1>
                <p className="landing-description"><span>{heroSlides[activeHeroSlide].description[0]}</span><span>{heroSlides[activeHeroSlide].description[1]}</span></p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="landing-hero-indicators" role="group" aria-label="Choose landing page headline">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.headline}
                type="button"
                className={`landing-indicator${activeHeroSlide === index ? ' active' : ''}`}
                aria-label={`Show headline ${index + 1}`}
                aria-pressed={activeHeroSlide === index}
                onClick={() => setActiveHeroSlide(index)}
              />
            ))}
          </div>
          <div className="landing-feature-strip" aria-label="Product features">
            <span><i><Printer size={16} /></i><b>A4</b> Formatting</span>
            <span><i><ScanEye size={16} /></i><b>Live</b> Preview</span>
            <span><i><Download size={16} /></i><b>PDF</b> Export</span>
          </div>
          <LaunchButton onClick={onLaunch} />
        </div>
        <div className="landing-hero-preview" aria-label="Live cover preview">
          <div className="landing-preview-toolbar"><span><i /><i /><i /></span><small>LIVE PREVIEW</small><ScanEye size={15} /></div>
          <div className="landing-preview-back-paper landing-preview-back-paper-a" aria-hidden="true"><span>OUTR</span></div>
          <div className="landing-preview-back-paper landing-preview-back-paper-b" aria-hidden="true"><span>LAB RECORD</span></div>
          <div className="landing-preview-paper">
            <div className="landing-paper-rule" />
            <small>ODISHA UNIVERSITY OF<br />TECHNOLOGY AND RESEARCH</small>
            <b>BHUBANESWAR</b>
            <img src={outrLogo} alt="OUTR university logo" className="landing-paper-logo" />
            <strong>LAB RECORD</strong>
            <div className="landing-paper-grid"><span /><span /></div>
            <div className="landing-paper-footer"><i /> <i /> <i /></div>
          </div>
          <span className="landing-preview-chip landing-preview-chip-a"><Zap size={13} /> Updates as you type</span>
          <span className="landing-preview-chip landing-preview-chip-b"><Download size={13} /> A4 PDF ready</span>
        </div>
      </MotionSection>

      <MotionSection className="landing-section landing-how" id="how-to-use" {...sectionMotion}>
        <div className="landing-section-heading">
          <h2>How to use it.</h2>
          <p>Three steps from blank form to ready-to-print PDF.</p>
        </div>
        <MotionOl className="landing-steps" variants={staggerReveal}>
          <MotionLi variants={itemReveal}><span className="landing-step-number">01</span><div><h3>Fill in your details</h3><p>Add your name, registration number, branch, semester, and lab details.</p></div><ArrowDown className="landing-step-down" size={18} /></MotionLi>
          <MotionLi variants={itemReveal}><span className="landing-step-number">02</span><div><h3>Choose your cover</h3><p>Pick a layout and see the document preview update.</p></div><ArrowDown className="landing-step-down" size={18} /></MotionLi>
          <MotionLi variants={itemReveal}><span className="landing-step-number">03</span><div><h3>Download your PDF</h3><p>Review the A4 preview and export your completed cover.</p></div></MotionLi>
        </MotionOl>
      </MotionSection>

      <MotionSection className="landing-section landing-benefits" id="why-outr" {...sectionMotion}>
        <div className="landing-section-heading">
          <h2>Why OUTR Coverpage Editor?</h2>
          <p>Everything you need for a clean academic cover, without the formatting hassle.</p>
        </div>
        <MotionDiv className="landing-benefit-grid" variants={staggerReveal}>
          <MotionArticle className="landing-benefit-card" variants={itemReveal}><span><Printer size={19} /></span><small>01 / FORMAT</small><h3>A4, from the start</h3><p>Designed around an A4 document and exported as an A4 PDF.</p></MotionArticle>
          <MotionArticle className="landing-benefit-card" variants={itemReveal}><span><Zap size={19} /></span><small>02 / PREVIEW</small><h3>See changes as you type</h3><p>Your cover preview updates while you fill in the form.</p></MotionArticle>
          <MotionArticle className="landing-benefit-card" variants={itemReveal}><span><Layers3 size={19} /></span><small>03 / CHOICE</small><h3>Flexible cover layouts</h3><p>Choose a layout that suits your record, with room for more options over time.</p></MotionArticle>
          <MotionArticle className="landing-benefit-card" variants={itemReveal}><span><ShieldCheck size={19} /></span><small>04 / EXPORT</small><h3>Print-ready PDF</h3><p>Download the finished cover when the details look right.</p></MotionArticle>
        </MotionDiv>
      </MotionSection>

      <MotionSection className="landing-section landing-feedback" id="feedback" {...sectionMotion}>
        <div className="landing-section-heading">
          <h2>What students are saying.</h2>
          <p>Real feedback from students using the editor to create their academic covers.</p>
        </div>
        <div className="landing-feedback-summary">
          <div>
            <strong>{average > 0 ? average.toFixed(1) : '4.8'}</strong>
            <div className="landing-rating-stars" aria-label={`${average || 4.8} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={18} fill="currentColor" />)}
            </div>
            <small>from {count > 0 ? `${count}+` : '500+'} students</small>
          </div>
          <ul>
            {['Easy to use', 'Saves time', 'Clean templates', 'Highly recommended'].map(item => (
              <li key={item}><CheckCircle2 size={16} />{item}</li>
            ))}
          </ul>
        </div>
        <div
          className="landing-testimonial-slider"
          onTouchStart={(event) => { testimonialTouchStart.current = event.touches[0].clientX; }}
          onTouchEnd={(event) => {
            swipeToSlide(testimonialTouchStart.current, event.changedTouches[0].clientX, testimonials.length, setActiveTestimonial);
            testimonialTouchStart.current = null;
          }}
        >
          <div className="landing-testimonial-desktop-grid">
            {testimonials.map(testimonial => (
              <MotionArticle className="landing-testimonial-card" key={testimonial.quoteTitle} variants={itemReveal}>
                <div className="landing-testimonial-rating">
                  <div className="landing-rating-stars" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill={index < Math.round(testimonial.rating) ? 'currentColor' : 'none'} />)}
                  </div>
                  <span>{testimonial.rating.toFixed(1)}</span>
                </div>
                <h3>“{testimonial.quoteTitle}”</h3>
                <p>{testimonial.body}</p>
                <div className="landing-testimonial-author">
                  <span>{testimonial.author.charAt(0)}</span>
                  <small>{testimonial.author}</small>
                </div>
              </MotionArticle>
            ))}
          </div>
          <div className="landing-testimonial-mobile">
          <AnimatePresence mode="wait" initial={false}>
            <MotionArticle
              className="landing-testimonial-card"
              key={testimonials[activeTestimonial].quoteTitle}
              variants={itemReveal}
              initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: -18 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              {(() => {
                const testimonial = testimonials[activeTestimonial];
                return (
                  <>
              <div className="landing-testimonial-rating">
                <div className="landing-rating-stars" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill={index < Math.round(testimonial.rating) ? 'currentColor' : 'none'} />)}
                </div>
                <span>{testimonial.rating.toFixed(1)}</span>
              </div>
              <h3>“{testimonial.quoteTitle}”</h3>
              <p>{testimonial.body}</p>
              <div className="landing-testimonial-author">
                <span>{testimonial.author.charAt(0)}</span>
                <small>{testimonial.author}</small>
              </div>
                  </>
                );
              })()}
            </MotionArticle>
          </AnimatePresence>
          </div>
          <div className="landing-testimonial-indicators" role="group" aria-label="Choose student feedback">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.quoteTitle}
                type="button"
                className={`landing-indicator${activeTestimonial === index ? ' active' : ''}`}
                aria-label={`Show feedback ${index + 1}`}
                aria-pressed={activeTestimonial === index}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
        {count > 0 && <p className="landing-rating-summary"><Star size={14} fill="currentColor" /> {average.toFixed(1)} average from {count} student ratings</p>}
      </MotionSection>

      <MotionSection className="landing-section landing-faq" id="faq" {...sectionMotion}>
        <div className="landing-section-heading">
          <h2>Frequently asked questions.</h2>
          <p>Details about templates, saved form data, and PDF generation.</p>
        </div>
        <MotionDiv className="landing-faq-list" variants={staggerReveal}>
          {faqs.map(faq => (
            <MotionDetails className="landing-faq-item" key={faq.question} variants={itemReveal}>
              <summary><span>{faq.question}</span><ChevronDown size={19} /></summary>
              <div className="landing-faq-answer"><p>{faq.answer}</p></div>
            </MotionDetails>
          ))}
        </MotionDiv>
      </MotionSection>

      <MotionSection className="landing-final-cta" {...sectionMotion}>
        <h2>Ready to create your cover?</h2>
        <p>Fill in your details, check the preview, and export your PDF.</p>
        <LaunchButton onClick={onLaunch} />
      </MotionSection>

      <MotionFooter className="landing-footer" id="footer" {...sectionMotion}>
        <div className="landing-footer-main">
          <a className="landing-brand landing-footer-brand" href="#top"><span className="landing-brand-icon"><FileText size={18} /></span><span className="landing-brand-name"><b>OUTR</b><small>coverpage editor</small></span></a>
          <p className="landing-footer-note">Made for OUTR students.</p>
          <div className="landing-footer-actions">
            <div className="landing-footer-contact"><a href="mailto:hitesh.edu@gmail.com" aria-label="Email the creator"><Mail size={17} /></a><a href="https://github.com/hiteshpanigrahi" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a><a href="https://www.linkedin.com/in/hiteshpanigrahi/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a></div>
            <button type="button" className="landing-footer-support" onClick={onSupport}>Support the project</button>
          </div>
        </div>
        <div className="landing-footer-bottom"><span>Designed and crafted by <strong>Hitesh Panigrahi</strong>, E&amp;I, OUTR.</span><span>© 2026 OUTR Coverpage Editor</span></div>
      </MotionFooter>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(({ question, answer }) => ({
          '@type': 'Question', name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer }
        }))
      }) }} />
    </main>
  );
};

export default LandingPage;
