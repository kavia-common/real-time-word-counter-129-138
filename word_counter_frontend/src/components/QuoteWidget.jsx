import React, { useEffect, useState } from "react";
import { getRandomQuote } from "../api/api.js";

/**
 * PUBLIC_INTERFACE
 * QuoteWidget
 * Fetches and displays an uplifting quote.
 * - Accessible: aria-live for region, clear labeling.
 * - Shows loading shimmer, error state, and retry.
 * - Button fetches a new random quote.
 * - No backend/env dependency.
 */
export default function QuoteWidget() {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  async function fetchQuote() {
    setLoading(true);
    setError("");
    try {
      const q = await getRandomQuote();
      setQuote(q);
    } catch (e) {
      setQuote({ text: "", author: "" });
      setError("Sorry, couldn't fetch a quote right now.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuote();
    // Only on mount/reloadKey change
    // eslint-disable-next-line
  }, [reloadKey]);

  return (
    <section
      className="quote-widget-container"
      aria-label="Daily inspirational quote"
      style={{
        background: "var(--color-surface-alt)",
        borderRadius: "11px",
        boxShadow: "0 1px 8px 0 rgba(60,80,120,0.07)",
        padding: "1.2rem 1.1rem 1.04rem 1.1rem",
        marginBottom: "var(--space-5)",
        marginTop: "var(--space-2)",
        minHeight: "98px",
        color: "var(--color-primary)",
        maxWidth: 480,
        width: "100%",
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative"
      }}
    >
      <div
        aria-live="polite"
        aria-atomic="true"
        className="quote-widget-quote"
        style={{
          minHeight: "38px",
          fontSize: "1.15rem",
          fontWeight: 500,
          letterSpacing: "-0.4px",
          color: "var(--color-text)",
          marginBottom: "0.6rem",
          display: "flex",
          alignItems: "center",
          gap: "0.45em"
        }}
        data-testid="quote-text"
      >
        {loading ? (
          <span
            className="quote-widget-loading"
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: "1.5em",
              height: "1.22em",
              borderRadius: "6px",
              background:
                "linear-gradient(90deg, #e8eef9 25%, #e2f2fa 50%, #f5f8fb 75%)",
              animation: "quote-shimmer 1.2s linear infinite"
            }}
          >&nbsp;</span>
        ) : error ? (
          <span
            className="quote-widget-error"
            style={{
              color: "var(--color-error)",
              fontSize: "1em"
            }}
            data-testid="quote-error"
          >
            {error}
          </span>
        ) : (
          <span>
            “{quote.text}”
            {quote.author && (
              <span
                style={{
                  display: "block",
                  fontWeight: 400,
                  fontSize: "1em",
                  color: "var(--color-secondary)",
                  marginTop: "0.35em"
                }}
                data-testid="quote-author"
              >
                — {quote.author}
              </span>
            )}
          </span>
        )}
      </div>
      <button
        className="counter-btn"
        onClick={() => setReloadKey(k => k + 1)}
        disabled={loading}
        aria-label="Get a new inspirational quote"
        style={{
          alignSelf: "flex-end",
          marginTop: "0.2rem",
          minWidth: 98,
        }}
        data-testid="quote-btn"
        type="button"
      >
        {loading ? "Fetching..." : "New Quote"}
      </button>
      <style>
        {`
        @keyframes quote-shimmer {
          0% { background-position: -1em 0; }
          100% { background-position: 2em 0; }
        }
        .quote-widget-loading {
          background-size: 200% 100%;
        }
        `}
      </style>
    </section>
  );
}
