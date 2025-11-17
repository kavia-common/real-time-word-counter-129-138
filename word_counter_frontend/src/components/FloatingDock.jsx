import React from "react";

/**
 * PUBLIC_INTERFACE
 * FloatingDock - Fixed right-side floating dock labeled 'knob'.
 * Appears on all pages, styled for modern light theme.
 * Hides or shrinks on very small screens.
 */
export default function FloatingDock() {
  return (
    <aside
      className="floating-dock"
      aria-label="Floating Dock: knob"
      tabIndex={-1}
    >
      <span className="floating-dock-label">knob</span>
      <style>
        {`
        .floating-dock {
          position: fixed;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          width: 56px;
          height: 160px;
          background: #ffffff;
          color: #111827;
          border-left: 1px solid #e5e7eb;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          letter-spacing: 0.5px;
          font-size: 1.09rem;
          z-index: 50;
          transition: width 0.2s, height 0.2s;
          user-select: none;
          pointer-events: none; /* not obstructing interaction */
        }
        .floating-dock-label {
          pointer-events: none;
          color: inherit;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          text-align: center;
        }
        @media (max-width: 600px) {
          .floating-dock {
            width: 37px;
            height: 100px;
            font-size: 0.97rem;
          }
          .floating-dock-label {
            font-size: 0.90rem;
          }
        }
        @media (max-width: 400px) {
          .floating-dock {
            display: none !important;
          }
        }
      `}
      </style>
    </aside>
  );
}
