import React, { useState, useRef } from 'react';
import './App.css';
import FrequencyStats from './components/FrequencyStats.jsx';
import DemoTypingSpeed from './components/DemoTypingSpeed.jsx';

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

  return (
    <div className="word-counter-app"
         style={{
            minHeight: '100vh',
            background: 'var(--color-bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
         }}>
      <main aria-label="Word Counter Application" style={{ width: '100%', padding: '1.5rem 0' }}>
        <section className="counter-card">
          <header className="counter-header">
            Real-time Word Counter
          </header>
          {/* DemoTypingSpeed component */}
          <DemoTypingSpeed />
          <label
            htmlFor="word-counter-textarea"
            style={{
              fontWeight: 600,
              marginBottom: 8,
              color: 'var(--color-text)',
              fontSize: '1.08rem'
            }}>
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
            style={{
              width: '100%',
              resize: 'vertical'
            }}
          />
          <div className="counter-actions"
               style={{
                 display: 'flex',
                 gap: '0.75rem',
                 justifyContent: 'flex-end',
                 marginBottom: '1.25rem'
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
              style={copied ? { boxShadow: '0 0 6px 0 var(--color-accent)55' } : {}}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

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

          <footer style={{
            fontSize: '0.93rem',
            color: 'var(--color-secondary)',
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Word Counter</span> •{' '}
              <span style={{ color: 'var(--color-accent)' }}>Light theme</span> •
              <span className="visually-hidden">All counts update automatically as you type.</span>
            </span>
          </footer>
        </section>
      </main>
    </div>
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
  return (
    <span
      className="counter-pill"
      data-testid={testid}
      style={{
        background: `color-mix(in srgb, ${color} 8%, transparent)`,
        color: color,
        borderRadius: 18,
        padding: '0.42rem 1.22rem',
        fontWeight: 600,
        fontSize: '1.12rem',
        letterSpacing: '-.3px',
        whiteSpace: 'nowrap',
        minWidth: 60,
        textAlign: 'center',
        userSelect: 'none',
        border: `1.5px solid color-mix(in srgb, ${color} 13%, transparent)`,
        outline: 'none'
      }}
      aria-label={`${label}: ${value}`}
      tabIndex={0}
    >
      {value} <span style={{ fontWeight: 400, fontSize: '0.95em' }}>{label}</span>
    </span>
  );
}

export default App;
