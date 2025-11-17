import React from "react";

/**
 * PUBLIC_INTERFACE
 * BottomDock - Fixed bottom dock for temporary option buttons.
 * Light/modern theme: rounded corners, subtle shadow, slight translucency.
 * Responsive: row, wraps/scrolls on small screens.
 * Appears across the app, does not interfere with FloatingDock, DailyDoseOfWord, or Navbar.
 */
export default function BottomDock() {
  // Demo placeholder options
  const options = [
    "Option A",
    "Option B",
    "Option C",
    "Option D",
    "Option E"
  ];

  return (
    <>
      <nav
        aria-label="Bottom Options"
        className="bottom-dock"
        role="navigation"
        tabIndex={-1}
      >
        {options.map((opt, i) => (
          <button
            type="button"
            key={opt}
            className="bottom-dock-btn"
            style={{}}
            tabIndex={0}
            aria-label={opt}
            disabled
          >
            {opt}
          </button>
        ))}
      </nav>
      <style>
        {`
        .bottom-dock {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 60;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.3rem;
          padding: 0.88rem 1.5rem 0.62rem 1.5rem;
          background: rgba(255,255,255,0.95);
          border-radius: 1.15rem 1.15rem 0 0;
          box-shadow: 0 -3px 26px 0 rgba(60,80,120,0.13), 0 -0.5px 10px 0 rgba(60,80,120,0.07);
          transition:
            box-shadow var(--motion-fast, .13s) var(--motion-ease, cubic-bezier(0.45,0.03,0.47,1.0)),
            background var(--motion-fast, .15s);
          backdrop-filter: blur(8px);
          pointer-events: auto;
        }
        .bottom-dock-btn {
          background: color-mix(in srgb, var(--color-primary) 7%, transparent);
          color: var(--color-primary, #3b82f6);
          border: 1.2px solid color-mix(in srgb, var(--color-primary) 20%, #e5e7eb);
          border-radius: 0.8em;
          box-shadow: 0 2px 11px 0 rgba(60,80,120,0.06);
          font-size: 1.07rem;
          font-weight: 600;
          min-width: 82px;
          padding: 0.53em 1.4em;
          margin: 0 2px;
          outline: none;
          opacity: 0.82;
          pointer-events: none; /* temp: visually shown but not clickable */
          user-select: none;
        }
        @media (max-width: 650px) {
          .bottom-dock {
            gap: 0.61rem;
            padding: 0.7rem 0.15rem 0.48rem 0.15rem;
            border-radius: 0.6rem 0.6rem 0 0;
          }
          .bottom-dock-btn {
            font-size: 0.96rem;
            min-width: 67px;
            padding: 0.45em 0.7em;
          }
        }
        @media (max-width: 430px) {
          .bottom-dock {
            overflow-x: auto;
            justify-content: flex-start;
            padding: 0.65rem 0.2rem 0.42rem 0.2rem;
            scrollbar-width: thin;
          }
          .bottom-dock-btn {
            flex: 0 0 auto;
            margin-right: 0.23rem;
          }
        }
        @media (max-width: 380px) {
          .bottom-dock {
            gap: 0.3rem;
            padding: 0.4rem 0.06rem 0.29rem 0.09rem;
            border-radius: 7px 7px 0 0;
          }
        }
        `}
      </style>
    </>
  );
}
