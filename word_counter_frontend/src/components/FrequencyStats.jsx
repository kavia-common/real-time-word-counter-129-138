import React from "react";

/**
 * Calculates the most used word and letter from given text,
 * applying normalization and tie-breaking rules as per the requirements.
 * Returns { word: string|null, letter: string|null }
 * 
 * - Word frequency: Case-insensitive; ignores specified punctuation at boundaries;
 *   hyphenated words treated as words; empty tokens excluded.
 * - Letter frequency: Only a-z (case-insensitive); ignore digits, spaces, punctuation, emojis.
 * - Tie: pick lex smallest token among max-frequency.
 */
// PUBLIC_INTERFACE
export function getMostUsedWordAndLetter(text) {
  // Word frequency
  // Allowed punctuation to strip at boundaries
  const PUNCTUATION = /[.,!?:;'"()[\]{}]/g;
  const wordFreq = {};
  // Replace em/en/hyphen dash with space, split by whitespace
  const tokens = text
    .replace(/[—–‐]/g, " ")
    .split(/\s+/)
    .map(
      (w) =>
        w
          .replace(PUNCTUATION, "") // remove punctuation anywhere
          .replace(/^[^a-zA-Z0-9\-']+|[^a-zA-Z0-9\-']+$/g, "") // clean ends
          .toLowerCase()
    )
    .filter((w) => w.length > 0);

  for (const word of tokens) {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  }
  let word = null;
  let wordCount = 0;
  Object.keys(wordFreq).forEach((w) => {
    if (
      wordFreq[w] > wordCount ||
      (wordFreq[w] === wordCount && (word === null || w < word))
    ) {
      word = w;
      wordCount = wordFreq[w];
    }
  });

  // Letter frequency: only a-z, ignore everything else
  const letterFreq = {};
  const chars = text.toLowerCase().replace(/[^a-z]/g, "");
  for (const c of chars) {
    letterFreq[c] = (letterFreq[c] || 0) + 1;
  }
  let letter = null;
  let letterCount = 0;
  Object.keys(letterFreq).forEach((l) => {
    if (
      letterFreq[l] > letterCount ||
      (letterFreq[l] === letterCount && (letter === null || l < letter))
    ) {
      letter = l;
      letterCount = letterFreq[l];
    }
  });

  return {
    word,
    letter,
  };
}

// PUBLIC_INTERFACE
export default function FrequencyStats({ text }) {
  const { word, letter } = getMostUsedWordAndLetter(text);

  return (
    <section
      className="frequency-stats"
      aria-live="polite"
      aria-atomic="true"
      style={{
        background: "var(--color-surface-alt)",
        borderTop: "1.5px solid #e6edf5",
        borderRadius: "0 0 16px 16px",
        margin: "2rem -1.5rem -2rem -1.5rem",
        padding: "1.2rem 0.6rem 1.3rem 0.6rem",
        fontSize: "1.02rem",
        color: "#234",
        display: "flex",
        gap: "2.2rem",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 38,
        boxSizing: "border-box",
      }}
      data-testid="frequency-stats"
    >
      <span>
        <strong style={{ color: "var(--color-primary)" }}>Most used word: </strong>
        <span
          data-testid="stat-most-word"
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            color: word ? "var(--color-text)" : "#a0aec0",
            marginLeft: "0.35em",
          }}
        >
          {word || "—"}
        </span>
      </span>
      <span>
        <strong style={{ color: "var(--color-accent)" }}>Most used letter: </strong>
        <span
          data-testid="stat-most-letter"
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            color: letter ? "var(--color-text)" : "#a0aec0",
            marginLeft: "0.35em",
          }}
        >
          {letter || "—"}
        </span>
      </span>
    </section>
  );
}
