import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * RandomWidget - Displays a random fun fact from a static list,
 * with a button to refresh for another item.
 * - Light/modern theme, responsive, accessible.
 * - No external dependencies, pure React.
 */
const FUN_FACTS = [
  "Honey never spoils — sealed honey jars found in ancient tombs are still edible.",
  "Bananas are berries, but strawberries are not.",
  "The unicorn is the national animal of Scotland.",
  "A flock of crows is called a 'murder'.",
  "Octopuses have three hearts.",
  "Wombat poop is cube-shaped.",
  "Hot water will turn into ice faster than cold water — the Mpemba effect.",
  "The Eiffel Tower can be 15 cm taller during the summer.",
  "Some turtles can breathe through their butts.",
];

function randomIndex(n, excluded) {
  let idx;
  do {
    idx = Math.floor(Math.random() * n);
  } while (n > 1 && idx === excluded);
  return idx;
}

// PUBLIC_INTERFACE
export default function RandomWidget() {
  const [currentIdx, setCurrentIdx] = useState(() => randomIndex(FUN_FACTS.length));
  const fact = FUN_FACTS[currentIdx];

  const handleNext = () => {
    setCurrentIdx(idx => randomIndex(FUN_FACTS.length, idx));
  };

  return (
    <section
      className="random-widget-container"
      aria-label="Fun Fact"
      style={{
        background: "var(--color-surface-alt)",
        borderRadius: "11px",
        boxShadow: "0 1px 8px 0 rgba(60,80,120,0.07)",
        padding: "1.08rem 1.08rem 0.95rem 1.08rem",
        marginBottom: "var(--space-4)",
        marginTop: "var(--space-2)",
        maxWidth: 480,
        width: "100%",
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minHeight: 82,
        position: "relative",
      }}
      data-testid="fun-fact-widget"
    >
      <header
        style={{
          color: "var(--color-success, #06b6d4)",
          fontWeight: 700,
          fontSize: "1.13rem",
          marginBottom: ".33rem",
          letterSpacing: "-0.4px"
        }}
      >
        Fun Fact of the Moment
      </header>
      <div
        style={{
          color: "var(--color-text, #111827)",
          fontSize: "1.08rem",
          fontWeight: 500,
          marginBottom: "0.77em",
          letterSpacing: "-0.15px",
          minHeight: "1.8em",
          lineHeight: 1.38
        }}
        aria-live="polite"
        data-testid="fun-fact-text"
      >
        {fact}
      </div>
      <button
        className="counter-btn"
        type="button"
        onClick={handleNext}
        aria-label="Show another fun fact"
        style={{
          alignSelf: "flex-end",
          marginTop: "0.16rem",
          minWidth: 96,
          background: "var(--color-success, #06b6d4)",
          color: "#fff",
          borderColor: "var(--color-success, #06b6d4)"
        }}
        data-testid="fun-fact-btn"
      >
        Another Fact
      </button>
    </section>
  );
}
