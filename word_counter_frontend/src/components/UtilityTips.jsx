import React, { useMemo, useState } from "react";

/**
 * UtilityTips - Actionable helper panel for writing/analysis, live preview only.
 * Features:
 * - Readability metrics: avg word length, est. read time, sentence count.
 * - Quick transformations: Title Case, Uppercase, Lowercase (collapsible, view-only preview).
 * - Keyword density: Top 3 words with counts/percentages, excluding common stopwords.
 * - Accessibility: Headings, aria-expanded, theme tokens, high contrast, responsive.
 * - Animation: Subtle entrance.
 *
 * Props:
 * - text: string (current textarea value)
 */
const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "to", "of", "in", "on", "for", "with",
  "is", "are", "was", "were", "be", "been", "being", "at", "by", "from",
]);

function stripPunct(s) {
  // Remove basic punctuation for matching/word count
  return s.replace(/[.,!?:;'"()[\]{}<>`~^|\\/]/g, "");
}

function toTitleCase(s) {
  return s.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toLocaleUpperCase() + txt.substr(1).toLocaleLowerCase()
  );
}

function transformationPreviews(text) {
  return {
    titleCase: toTitleCase(text),
    lower: text.toLocaleLowerCase(),
    upper: text.toLocaleUpperCase(),
  };
}

function getWordsArray(text) {
  // Clean and split into tokens, ignore stopwords for keyword density.
  return text
    .replace(/[—–‐]/g, " ")
    .split(/\s+/)
    .map(w => stripPunct(w).toLowerCase())
    .filter(w => w.length > 0);
}

// PUBLIC_INTERFACE
export default function UtilityTips({ text }) {
  // Memoized metrics for performance
  const {
    avgWordLength,
    readingTime,
    sentenceCount,
    keywordDensity,
    wordCount,
    previews,
  } = useMemo(() => {
    const sentences = (text.match(/[\.\!\?](?!\w)/g) || []).length;
    const words = getWordsArray(text);
    const wordCount = words.length;
    const totalLength = words.reduce((acc, w) => acc + w.length, 0);
    const avgWordLength = wordCount ? (totalLength / wordCount) : 0;
    const readingTime = wordCount / 200; // 200 words per min (minutes)
    // Keyword density (exclude stopwords)
    const keywordCounts = {};
    let countForDensity = 0;
    for (const w of words) {
      if (!STOPWORDS.has(w)) {
        keywordCounts[w] = (keywordCounts[w] || 0) + 1;
        countForDensity++;
      }
    }
    // Get sorted top 3 words (by count, then lex)
    const sorted = Object.entries(keywordCounts)
      .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))
      .slice(0, 3);
    const keywordDensity = sorted.map(([w, c]) => ({
      word: w,
      count: c,
      percent: countForDensity ? (c / countForDensity * 100) : 0,
    }));
    const previews = transformationPreviews(text);
    return {
      avgWordLength,
      readingTime,
      sentenceCount: sentences || (text.trim() ? 1 : 0),
      keywordDensity,
      wordCount,
      previews,
    };
  }, [text]);

  // Manage collapsible state for previews (responsive/a11y)
  const [openPreview, setOpenPreview] = useState({
    title: false,
    upper: false,
    lower: false,
  });
  const togglePreview = (which) =>
    setOpenPreview(prev => ({ ...prev, [which]: !prev[which] }));

  return (
    <aside
      className="utility-tips-card"
      aria-label="Live Writing Helpers"
      tabIndex={-1}
      data-testid="utility-tips"
      style={{
        background: "var(--color-surface-alt)",
        borderRadius: "9px",
        boxShadow: "0 1px 9px 0 rgba(60,80,120,0.09)",
        padding: "var(--space-5) var(--space-3) var(--space-4) var(--space-3)",
        marginBottom: "var(--space-3)",
        marginTop: "var(--space-2)",
        position: "relative",
        color: "var(--color-text)",
        minWidth: 0,
        opacity: 0,
        transform: "translateY(16px) scale(0.98)",
        animation:
          "utility-tips-fadein var(--motion-medium, 0.28s) var(--motion-ease, cubic-bezier(0.45,0.03,0.47,1.0)) forwards",
      }}
    >
      <h2 style={{ fontSize: "1.18rem", color: "var(--color-primary)", fontWeight: 700, marginBottom: "var(--space-2)" }}>
        Utility Tips <span style={{ fontWeight: 400, fontSize: "1em", color: "var(--color-secondary)" }}>(Preview)</span>
      </h2>
      {/* Readability metrics */}
      <section aria-label="Readability metrics" style={{marginBottom: "1rem"}}>
        <h3 style={{ fontSize: "1em", margin: 0, fontWeight: 600, color: "var(--color-accent)" }}>
          Readability
        </h3>
        <ul style={{margin:0,padding:0,listStyle:"none",display:"flex",gap:"1.6rem",flexWrap:"wrap"}}>
          <li>
            <span style={{ fontWeight: 650 }} data-testid="ut-avg-wordlen">{avgWordLength ? avgWordLength.toFixed(2) : "—"}</span>
            <span style={{ color: "var(--color-secondary)", marginLeft: 4 }}>avg word length</span>
          </li>
          <li>
            <span style={{ fontWeight: 650 }} data-testid="ut-rt">
              {wordCount > 0 ? (readingTime < 1 ? `${Math.ceil(readingTime * 60)}s` : `${readingTime.toFixed(1)}m`) : "—"}
            </span>
            <span style={{ color: "var(--color-secondary)", marginLeft: 4 }}>estimated read</span>
          </li>
          <li>
            <span style={{ fontWeight: 650 }} data-testid="ut-sent">
              {sentenceCount}
            </span>
            <span style={{ color: "var(--color-secondary)", marginLeft: 4 }}>sentences</span>
          </li>
        </ul>
      </section>

      {/* Keyword Density */}
      <section style={{marginBottom: "1rem"}}>
        <h3 style={{ fontSize: "1em", fontWeight: 600, margin: 0, color: "var(--color-primary)" }}>Keyword Density</h3>
        {keywordDensity.length === 0 ? (
          <span data-testid="ut-keywords" style={{ color: "var(--color-secondary)" }}>No keywords found</span>
        ) : (
          <ul data-testid="ut-keywords" style={{padding:0,margin:0,listStyle:"none",display:"flex",gap:"0.95rem",flexWrap:"wrap"}}>
            {keywordDensity.map(({word, count, percent}) => (
              <li key={word} style={{ background: "color-mix(in srgb, var(--color-primary) 9%, transparent)", borderRadius: "7px", padding: "0.23em 0.67em", color: "var(--color-text)", fontWeight: 500, fontSize:"0.97em" }}>
                <span style={{ color: "var(--color-primary)", fontWeight: 650 }}>{word}</span>
                <span style={{ color: "var(--color-secondary)" }}> x{count} </span>
                <span style={{ color: "var(--color-accent)", fontSize: "0.93em", marginLeft: "0.09em" }}>
                  ({percent.toFixed(1)}%)
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Quick Transformations */}
      <section style={{marginBottom: "0.3rem"}}>
        <h3 style={{ fontSize: "1em", fontWeight: 600, margin: 0, color: "var(--color-accent)" }}>Quick Transformations</h3>
        <div style={{display:"flex",flexDirection:"column",gap:"0.25em"}}>
          {[
            { name: "Title Case", key: "title", preview: previews.titleCase },
            { name: "UPPERCASE", key: "upper", preview: previews.upper },
            { name: "lowercase", key: "lower", preview: previews.lower },
          ].map(({name, key, preview}) => (
            <div key={key} style={{ marginBottom: "0.18em" }}>
              <button
                type="button"
                aria-controls={`ut-prev-${key}`}
                aria-expanded={openPreview[key]}
                onClick={() => togglePreview(key)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-primary)",
                  fontWeight: 600,
                  fontSize: "0.97em",
                  padding: 0,
                  cursor: "pointer",
                  outline: openPreview[key] ? "2px solid var(--color-accent)" : "none",
                  marginBottom: "0.06em",
                  textAlign: "left",
                  transition: "color var(--motion-fast) var(--motion-ease)",
                  borderRadius: "4px"
                }}
                tabIndex={0}
                data-testid={`ut-toggle-${key}`}
              >
                {openPreview[key] ? "▼" : "►"} {name} Preview
              </button>
              <div
                id={`ut-prev-${key}`}
                aria-hidden={!openPreview[key]}
                style={{
                  maxHeight: openPreview[key] ? "200px" : "0",
                  overflow: "hidden",
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                  borderRadius: "7px",
                  marginTop: openPreview[key] ? "0.2em" : 0,
                  padding: openPreview[key] ? "0.5em 0.6em" : "0 0",
                  fontSize: "1em",
                  boxShadow: openPreview[key]
                    ? "0 2px 8px 0 rgba(60,80,120,0.07)"
                    : "none",
                  opacity: openPreview[key] ? 1 : 0,
                  transition:
                    "all var(--motion-fast,0.15s) var(--motion-bounce, cubic-bezier(0.34,1.56,0.64,1))"
                }}
                data-testid={`ut-preview-${key}`}
              >
                <code style={{whiteSpace:"pre-line",fontFamily: "inherit", color: "var(--color-secondary)"}}>
                  {openPreview[key] ? (preview || <span style={{color:"var(--color-text)",opacity:0.44}}>&lt;empty&gt;</span>) : ""}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

// Entrance animation
const style = `
@keyframes utility-tips-fadein {
  to {
    opacity: 1;
    transform: none;
  }
}
@media (max-width: 600px) {
  .utility-tips-card {
    padding: var(--space-3) var(--space-1);
    border-radius: 0.6rem;
    margin-bottom: var(--space-2);
    margin-top: var(--space-1);
  }
}
`;

// Inject style, only once per session
if (typeof window !== "undefined" && !window._utilityTipsStyle) {
  const s = document.createElement("style");
  s.innerHTML = style;
  document.head.appendChild(s);
  window._utilityTipsStyle = true;
}
