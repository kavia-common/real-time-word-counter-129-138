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
    <div className="word-counter-app" style={{
      minHeight: '100vh',
      background: '#f9fafb',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <main aria-label="Word Counter Application" style={{ width: '100%', padding: '1.5rem 0' }}>
        <section className="counter-card" style={{
          maxWidth: 800,
          margin: '0 auto',
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 6px 32px 0 rgba(60,80,120,0.09), 0 1px 4px 0 rgba(60,80,120,0.03)',
          padding: '2.5rem 1.5rem 2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch'
        }}>
          <header className="counter-header"
            style={{
              textAlign: 'center',
              paddingBottom: '1.3rem',
              background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '-1px',
              margin: '-1rem -1rem 1.25rem -1rem',
              userSelect: 'none'
            }}>
            Real-time Word Counter
          </header>
          {/* DemoTypingSpeed component */}
          <DemoTypingSpeed />
          <label htmlFor="word-counter-textarea"
                 style={{
                   fontWeight: 600,
                   marginBottom: 8,
                   color: '#111827',
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
              resize: 'vertical',
              fontSize: '1.15rem',
              padding: '1.25rem',
              borderRadius: 8,
              border: '1.5px solid #dde3e7',
              background: '#f9fafb',
              color: '#111827',
              minHeight: 130,
              fontFamily: 'inherit',
              marginBottom: '1.2rem',
              outlineColor: '#3b82f6'
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
              style={{
                background: '#f3f4f6',
                color: '#111827',
                border: '1px solid #e5e7eb',
                borderRadius: 6,
                padding: '0.6rem 1.2rem',
                fontWeight: 500,
                fontSize: '1rem',
                cursor: text.length > 0 ? 'pointer' : 'not-allowed',
                opacity: text.length > 0 ? 1 : 0.5,
                transition: 'background .2s'
              }}
              aria-label="Clear text"
              disabled={text.length === 0}
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="button"
              className="counter-btn"
              style={{
                background: '#3b82f6',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '0.6rem 1.3rem',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: text.length > 0 ? 'pointer' : 'not-allowed',
                opacity: text.length > 0 ? 1 : 0.55,
                boxShadow: copied ? '0 0 6px 0 #06b6d455' : '',
                transition: 'background .2s, box-shadow .2s'
              }}
              aria-label="Copy text to clipboard"
              disabled={text.length === 0}
              onClick={handleCopy}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div aria-live="polite" aria-atomic="true"
               className="counter-stats-row"
               style={{
                 display: 'flex',
                 flexWrap: 'wrap',
                 gap: '0.7rem',
                 justifyContent: 'center',
                 alignItems: 'center'
               }}
          >
            <StatPill
              label="Words"
              value={stats.words}
              color="#3b82f6"
              testid="stat-words"
            />
            <StatPill
              label="Chars"
              value={stats.chars}
              color="#64748b"
              testid="stat-chars"
            />
            <StatPill
              label="No spaces"
              value={stats.charsNoSpaces}
              color="#06b6d4"
              testid="stat-no-spaces"
            />
            <StatPill
              label="Lines"
              value={stats.lines}
              color="#111827"
              testid="stat-lines"
            />
          </div>
          {/* Bottom frequency stats section */}
          <FrequencyStats text={text} />

          <footer style={{
            fontSize: '0.93rem',
            color: '#64748b',
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <span>
              <span style={{ color: '#3b82f6', fontWeight: 700 }}>Word Counter</span> •{' '}
              <span style={{ color: '#06b6d4' }}>Light theme</span> •
              <span className="visually-hidden">All counts update automatically as you type.</span>
            </span>
          </footer>
        </section>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
function StatPill({ label, value, color = '#111827', testid }) {
  return (
    <span
      className="counter-pill"
      data-testid={testid}
      style={{
        background: `${color}15`,
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
        border: `1.5px solid ${color}22`
      }}
      aria-label={`${label}: ${value}`}
      tabIndex={0}
    >
      {value} <span style={{ fontWeight: 400, fontSize: '0.95em' }}>{label}</span>
    </span>
  );
}

export default App;
