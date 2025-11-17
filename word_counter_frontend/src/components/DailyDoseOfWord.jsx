import React, { useState, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * DailyDoseOfWord
 * Shows a random word (and its meaning) each time the component mounts.
 * Purely presentational; uses modern light theme matching app.
 */
const WORDS = [
  { word: "Eloquent", definition: "Fluent or persuasive in speaking or writing." },
  { word: "Serendipity", definition: "Finding valuable things not sought for." },
  { word: "Lucid", definition: "Expressed clearly; easy to understand." },
  { word: "Quixotic", definition: "Exceedingly idealistic; unrealistic and impractical." },
  { word: "Ephemeral", definition: "Lasting for a very short time." },
  { word: "Resilient", definition: "Able to withstand or recover quickly from difficult conditions." },
  { word: "Melancholy", definition: "A feeling of pensive sadness, typically with no obvious cause." },
  { word: "Ambivalent", definition: "Having mixed feelings or contradictory ideas about something or someone." },
  { word: "Ubiquitous", definition: "Present, appearing, or found everywhere." },
];

function getRandomIndex(arrLen) {
  // Avoids Math.random outside render
  return Math.floor(Math.random() * arrLen);
}

// PUBLIC_INTERFACE
export default function DailyDoseOfWord() {
  const [selected, setSelected] = useState(WORDS[0]);

  useEffect(() => {
    setSelected(WORDS[getRandomIndex(WORDS.length)]);
  }, []);

  // Themed styling
  return (
    <section
      aria-label="Daily Dose of Word"
      className="daily-dose-word-box"
      style={{
        background: "var(--color-surface-alt)",
        borderRadius: "12px",
        boxShadow: "0 1px 7px 0 rgba(60,80,120,0.08)",
        margin: "1.1rem 0 1.4rem 0",
        alignSelf: "center",
        padding: "1.1em 1.2em 1.05em 1.2em",
        maxWidth: 420,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
      data-testid="daily-dose-word"
    >
      <header
        style={{
          color: "var(--color-primary)",
          fontWeight: 700,
          fontSize: "1.18rem",
          marginBottom: ".34rem",
          letterSpacing: "-0.5px",
        }}
      >
        Daily Dose of Word
      </header>
      <span
        style={{
          color: "var(--color-accent)",
          fontSize: "1.12rem",
          fontWeight: 650,
          fontFamily: "monospace",
          letterSpacing: "-0.1px",
          marginBottom: "0.22rem",
        }}
      >
        {selected.word}
      </span>
      <span
        style={{
          color: "var(--color-secondary)",
          fontSize: "1.01rem",
          marginTop: "0.07em",
        }}
      >
        {selected.definition}
      </span>
    </section>
  );
}
