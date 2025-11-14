import React from "react";

/**
 * Sidebar - Responsive, view-only sidebar panel with randomized options.
 * Uses current theme, is fully accessible, and non-interactive.
 *
 * Appears to the left of main content on wide screens, stacks above/collapses on narrow screens.
 * Does NOT change state or have click handlers.
 *
 * PUBLIC_INTERFACE
 */
export default function Sidebar() {
  // Static set of options
  const OPTIONS = [
    "Word Count Only",
    "Character Insights",
    "Live Typing Stats",
    "Theme Picker",
    "Line Counter",
    "Copy Support",
    "Accessibility",
    "Compact View"
  ];

  // Shuffle options on every render for simplicity (view-only)
  function getShuffled(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const shownOptions = getShuffled(OPTIONS).slice(0, 6);

  return (
    <nav
      className="sidebar-panel"
      aria-label="Sidebar options"
      role="navigation"
    >
      <header className="sidebar-header">
        Options
      </header>
      <ul className="sidebar-list">
        {shownOptions.map(opt => (
          <li className="sidebar-list-item" key={opt} tabIndex={-1} aria-disabled="true">
            <span>{opt}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
