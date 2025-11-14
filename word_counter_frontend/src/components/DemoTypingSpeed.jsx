import React, { useEffect, useState, useRef } from "react";

/**
 * DemoTypingSpeed
 * Simulates animated typing of a sample sentence, showing WPM, CPM, and elapsed time.
 * - Purely demonstrative (does not interact with user text).
 * - Configurable string/speed, smooth animation, accessible markup.
 * - Loops with a pause on end.
 *
 * Usage: <DemoTypingSpeed sampleText="..." typingSpeed={90} />
 *
 * Props:
 * - sampleText: string (default: 'How fast can you type? Try it below!')
 * - typingSpeed: WPM (default: 70)
 * - pauseMs: ms after line completes before restart (default: 1250)
 */
const DEFAULT_TEXT = "How fast can you type? Try it below!";
const DEFAULT_WPM = 70;
const DEFAULT_PAUSE = 1250;

// PUBLIC_INTERFACE
export default function DemoTypingSpeed({
  sampleText = DEFAULT_TEXT,
  typingSpeed = DEFAULT_WPM,
  pauseMs = DEFAULT_PAUSE,
}) {
  // State
  const [index, setIndex] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Tick ref to clear interval on unmount
  const intervalRef = useRef(null);
  const ellapsedStart = useRef(performance.now());
  const loopTimeoutRef = useRef(null);

  // Calculate typing interval per char based on WPM (words = 5 chars for metrics)
  // typingSpeed (WPM): default 70wpm => 350cpm, ~172ms per char
  const cpm = typingSpeed * 5;
  const perCharMs = 60000 / cpm;

  // Animation effect
  useEffect(() => {
    function tickAnim() {
      setIndex((prev) => {
        if (prev < sampleText.length) {
          return prev + 1;
        } else {
          // Animation is done
          setIsDone(true);
          clearInterval(intervalRef.current);
          loopTimeoutRef.current = setTimeout(() => {
            setIsDone(false);
            setIndex(0);
            setElapsedMs(0);
            ellapsedStart.current = performance.now();
          }, pauseMs);
          return prev;
        }
      });
      setElapsedMs(performance.now() - ellapsedStart.current);
    }

    if (!isDone) {
      ellapsedStart.current = performance.now() - elapsedMs;
      intervalRef.current = setInterval(tickAnim, perCharMs);
      return () => {
        clearInterval(intervalRef.current);
        if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
      };
    } else {
      // When pause during the ended animation, stop interval.
      clearInterval(intervalRef.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone, sampleText, typingSpeed]);

  // Derived metrics
  const charsTyped = Math.min(index, sampleText.length);
  const wordsTyped = sampleText.slice(0, charsTyped).split(/\s+/).filter(Boolean).length;
  const timeMins = elapsedMs / 60000;
  const liveWpm = timeMins > 0 ? Math.round(wordsTyped / timeMins) : 0;
  const liveCpm = timeMins > 0 ? Math.round(charsTyped / timeMins) : 0;

  // Accessibility: animate text should use aria-live (polite)
  return (
    <section
      className="demo-typing-speed"
      aria-label="Demo typing speed"
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1.1rem",
        marginBottom: "1.1rem",
        justifyContent: "center",
        background: "var(--color-bg)",
        borderRadius: "12px",
        border: "1.5px solid #e1e8f2",
        padding: "0.76em 1.15em",
        color: "var(--color-text)",
        fontSize: "1.09rem",
        lineHeight: 1.35,
        boxShadow: "0 2px 7px 0 rgba(60,80,120,0.07)",
        minHeight: 56,
        maxWidth: 680,
        width: "100%",
      }}
    >
      <span
        aria-live="polite"
        aria-atomic="true"
        className="demo-typing-region"
        data-testid="demo-typing-text"
        style={{
          fontFamily: "monospace",
          fontWeight: 500,
          fontSize: "1.08em",
          color: "var(--color-primary)",
          letterSpacing: "0.01em",
          minWidth: "19ch",
          background: "none",
          border: "none",
          outline: "none",
          userSelect: "none",
        }}
      >
        {sampleText.slice(0, charsTyped)}
        <span
          style={{
            display: (charsTyped < sampleText.length) ? "inline" : "none",
            animation: "demo-blink .93s steps(1) infinite",
          }}
          data-testid="demo-cursor"
        >|</span>
      </span>

      <span
        className="demo-typing-metrics"
        style={{
          display: "flex",
          gap: "0.82rem",
          alignItems: "center",
          lineHeight: 1.33,
        }}
      >
        <span
          data-testid="demo-wpm"
          style={{
            background: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
            color: "var(--color-primary)",
            borderRadius: "9px",
            padding: "0.38em 0.9em",
            fontWeight: 600,
            fontSize: "0.97em",
            border: "1.1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)",
          }}
          aria-label={`Current WPM: ${liveWpm}`}
        >
          WPM: {liveWpm}
        </span>
        <span
          data-testid="demo-cpm"
          style={{
            background: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
            color: "var(--color-accent)",
            borderRadius: "9px",
            padding: "0.38em 0.7em",
            fontWeight: 600,
            fontSize: "0.97em",
            border: "1.1px solid color-mix(in srgb, var(--color-accent) 15%, transparent)",
          }}
          aria-label={`Current CPM: ${liveCpm}`}
        >
          CPM: {liveCpm}
        </span>
        <span
          data-testid="demo-elapsed"
          style={{
            color: "var(--color-secondary)",
            background: "var(--color-surface-alt)",
            borderRadius: "9px",
            padding: "0.31em 0.7em",
            fontWeight: 500,
            fontSize: "0.94em",
            border: "1px solid var(--color-border)",
          }}
          aria-label={`Typing time elapsed: ${Math.floor(elapsedMs/1000)} seconds`}
        >
          {Math.floor(elapsedMs / 1000)}s
        </span>
      </span>
    </section>
  );
}
