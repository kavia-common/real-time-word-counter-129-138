import React, { useState, useRef } from 'react';
import './App.css';
import FrequencyStats from './components/FrequencyStats.jsx';
import DemoTypingSpeed from './components/DemoTypingSpeed.jsx';
import Sidebar from './components/Sidebar.jsx';
import UtilityTips from './components/UtilityTips.jsx';
import QuoteWidget from './components/QuoteWidget.jsx';
import FloatingDock from './components/FloatingDock.jsx';
import DailyDoseOfWord from './components/DailyDoseOfWord.jsx';
import Navbar from './components/Navbar.jsx';
import BottomDock from './components/BottomDock.jsx';
import Modal from './components/Modal.jsx';

// PUBLIC_INTERFACE
function countWords(text) {
  /** Robust word counter for the word counter app.
   * Returns { words, chars, charsNoSpaces, lines }
   */
  // Treat words as letter/number sequences separated by whitespace/punct
  // Remove apostrophe or dashes at endpoints
  const tokens = text
    .replace(/[—–‐]/g, ' ') // replace dashes with space
    .split(/\s+/)
    .map(w => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')) // trim non-word chars
    .filter(w => w.length > 0);

  return {
    words: tokens.length,
    chars: text.length,
    charsNoSpaces: text.replace(/\s/g, '').length,
    lines: (text.match(/\n/g) || []).length + 1,
  };
}

// PUBLIC_INTERFACE
function App() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textareaRef = useRef(null);

  const stats = countWords(text);

  const handleChange = (e) => {
    setText(e.target.value);
    setCopied(false);
  };

  const handleClear = () => {
    setText('');
    setCopied(false);
    textareaRef.current?.focus();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  // Top-right modal open button
  // Position: fixed, visible on all screens
  // Modern "info" icon look, primary color fill
  // Accessible: aria-label, tabIndex

  return (
    <>
      <Navbar />
      {/* Fixed top-right modal open button */}
      <button
        type="button"
        className="topright-modal-btn"
        aria-label="Open modal dialog"
        tabIndex={0}
        onClick={() => setIsModalOpen(true)}
        style={{
          position: "fixed",
          top: "20px",
          right: "28px",
          zIndex: 1100,
          background: "var(--color-primary, #3b82f6)",
          color: "#fff",
          border: "none",
          outline: "none",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.95rem",
          boxShadow: "0 4px 17px 0 rgba(60,80,120,0.15)",
          cursor: "pointer",
          transition: "background 0.14s cubic-bezier(0.45,0.03,0.47,1.0), box-shadow 0.13s",
          opacity: 0.98,
        }}
      >
        {/* SVG Info icon (modern, visually clear) */}
        <svg
          aria-hidden="true"
          focusable="false"
          width="27"
          height="27"
          viewBox="0 0 24 24"
          fill="none"
          style={{ display: "block" }}
        >
          <circle cx="12" cy="12" r="10" fill="#3b82f6" opacity="0.13"/>
          <circle cx="12" cy="12" r="9.2" stroke="#3b82f6" strokeWidth="1.4" fill="none"/>
          <rect x="11.16" y="7.19" width="1.73" height="1.74" rx="0.87" fill="#3b82f6"/>
          <rect x="11.13" y="10.14" width="1.73" height="6.2" rx="0.83" fill="#3b82f6"/>
        </svg>
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="About this App"
      >
        <div style={{ color: "var(--color-text)", fontSize: "1.08rem", minWidth: 0, paddingTop: "0.13em" }}>
          <p>
            This is a <b style={{ color: "var(--color-primary)" }}>modern React word counter</b> demo.
          </p>
          <ul style={{ paddingLeft: "1.2em", color: "var(--color-secondary)", fontSize: "1em", margin: "0.5em 0 0 0" }}>
            <li>Real-time counts for words, chars, lines</li>
            <li>Light theme, <span style={{ color: "#3b82f6" }}>#3b82f6</span> primary accents</li>
            <li>Responsive, a11y, and clean UI</li>
            <li>Modal supports close via <kbd>ESC</kbd>, X, or backdrop</li>
          </ul>
        </div>
      </Modal>
      {/* 
        Added bottom padding to ensure that BottomDock does not overlap. 
        If BottomDock height changes, adjust the 88px value appropriately.
      */}
      <div className="word-counter-app" style={{ paddingTop: "64px", paddingBottom: "88px" }}>
        <FloatingDock />
        <div className="layout">
          <Sidebar />
          <main aria-label="Word Counter Application" style={{ width: '100%' }}>
            <section className="counter-card">
              <header className="counter-header">
                Real-time Word Counter
              </header>
              {/* DemoTypingSpeed component */}
              <DemoTypingSpeed />
              {/* Demo QuoteWidget - motivational/inspirational quote */}
              <QuoteWidget />

              {/* DailyDoseOfWord - random vocabulary below the quote */}
              <DailyDoseOfWord />

            <label
              htmlFor="word-counter-textarea"
              className="counter-label"
            >
              Enter your text:
            </label>
            <textarea
              id="word-counter-textarea"
              aria-label="Text to analyze"
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              rows={10}
              spellCheck={true}
              className="word-counter-textarea"
              style={{resize: 'vertical'}}
            />
            <div className="counter-actions"
                  style={{
                    display: 'flex',
                    gap: 'var(--space-3)',
                    justifyContent: 'flex-end',
                    marginBottom: 'var(--space-4)'
                  }}
            >
              <button
                type="button"
                className="counter-btn"
                aria-label="Clear text"
                disabled={text.length === 0}
                onClick={handleClear}
                tabIndex={0}
              >
                Clear
              </button>
              <button
                type="button"
                className={`counter-btn primary${copied ? " copied" : ""}`}
                aria-label="Copy text to clipboard"
                disabled={text.length === 0}
                onClick={handleCopy}
                tabIndex={0}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* UtilityTips: immediately below textarea+actions, above frequency stats */}
            <UtilityTips text={text} />

            <div aria-live="polite" aria-atomic="true"
                  className="counter-stats-row"
            >
              <StatPill
                label="Words"
                value={stats.words}
                color="var(--color-primary)"
                testid="stat-words"
              />
              <StatPill
                label="Chars"
                value={stats.chars}
                color="var(--color-secondary)"
                testid="stat-chars"
              />
              <StatPill
                label="No spaces"
                value={stats.charsNoSpaces}
                color="var(--color-accent)"
                testid="stat-no-spaces"
              />
              <StatPill
                label="Lines"
                value={stats.lines}
                color="var(--color-text)"
                testid="stat-lines"
              />
            </div>
            {/* Bottom frequency stats section */}
            <FrequencyStats text={text} />

              <footer className="footer-hint">
                <span>
                  <span className="footer-title">Word Counter</span> •{' '}
                  <span className="footer-theme">Light theme</span> •
                  <span className="visually-hidden">All counts update automatically as you type.</span>
                </span>
              </footer>
            </section>
          </main>
        </div>
      </div>
      {/* BottomDock appears global & overlays app bottom only */}
      <BottomDock />
      {/* Scoped style for modal button (reinforce modern/hover/focus a11y) */}
      <style>
        {`
        .topright-modal-btn:focus, .topright-modal-btn:hover {
          background: #2563eb;
          color: #fff;
          box-shadow: 0 6px 31px 0 rgba(60,80,120,0.20);
        }
        @media (max-width: 600px) {
          .topright-modal-btn {
            width: 40px;
            height: 40px;
            top: 10px;
            right: 10px;
            font-size: 1.45rem;
          }
        }
        `}
      </style>
    </>
  );
}

/**
 * StatPill - Themed stat badge using theme color tokens.
 * @param {object} props
 * @param {string} props.label
 * @param {number} props.value
 * @param {string} props.color - CSS variable or hex.
 * @param {string} props.testid
 */
// PUBLIC_INTERFACE
function StatPill({ label, value, color = 'var(--color-text)', testid }) {
  // Micro-animation: animate value change
  const [displayVal, setDisplayVal] = React.useState(value);
  const [animClass, setAnimClass] = React.useState('');
  React.useEffect(() => {
    if (displayVal !== value) {
      setAnimClass('pill-value-animate');
      const timeout = setTimeout(() => {
        setDisplayVal(value);
        setAnimClass('');
      }, 320);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line
  }, [value]);
  return (
    <span
      className="counter-pill"
      data-testid={testid}
      style={{
        background: `color-mix(in srgb, ${color} 8%, transparent)`,
        color: color,
        border: `1.5px solid color-mix(in srgb, ${color} 13%, transparent)`,
        whiteSpace: 'nowrap'
      }}
      aria-label={`${label}: ${value}`}
      tabIndex={0}
    >
      <span className={animClass}>{displayVal}</span> <span style={{ fontWeight: 400, fontSize: '0.95em' }}>{label}</span>
    </span>
  );
}

export default App;
