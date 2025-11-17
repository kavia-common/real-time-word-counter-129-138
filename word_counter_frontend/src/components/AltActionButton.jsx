import React from "react";

/**
 * PUBLIC_INTERFACE
 * AltActionButton - A fixed-position alternative action button in a contrasting accent color.
 * - Uses a "success" (#06b6d4) color for visibility.
 * - Hover/focus/active styles included, accessible and modern.
 * - Exposes onClick prop for parent control of modal.
 * 
 * Props:
 * - onClick (function): called when button is clicked/focused (required).
 */
export default function AltActionButton({ onClick, ...rest }) {
  return (
    <>
      <button
        type="button"
        className="alt-action-btn"
        aria-label="Open info modal (alternative)"
        title="Open info modal"
        tabIndex={0}
        onClick={onClick}
        {...rest}
        style={{
          position: "fixed",
          top: "80px",
          right: "28px",
          zIndex: 1099,
          background: "var(--color-accent, #06b6d4)",
          color: "#fff",
          border: "none",
          outline: "none",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.6rem",
          boxShadow: "0 3px 14px 0 rgba(6,182,212,0.17)",
          cursor: "pointer",
          transition:
            "background 0.13s cubic-bezier(0.45,0.03,0.47,1.0), box-shadow 0.13s",
          opacity: 0.98,
        }}
      >
        {/* SVG Check Circle for success action */}
        <svg
          aria-hidden="true"
          focusable="false"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          style={{ display: "block" }}
        >
          <circle cx="12" cy="12" r="10" fill="#06b6d4" opacity="0.13" />
          <circle
            cx="12"
            cy="12"
            r="9.2"
            stroke="#06b6d4"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M9.2 12.8l2 2.2 3.6-4.6"
            stroke="#06b6d4"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>
      <style>
        {`
        .alt-action-btn:focus, .alt-action-btn:hover {
          background: #0891b2;
          color: #fff;
          box-shadow: 0 6px 25px 0 rgba(6,182,212,0.31);
        }
        .alt-action-btn:active {
          filter: brightness(0.93);
          transform: scale(0.96);
        }
        @media (max-width: 600px) {
          .alt-action-btn {
            width: 36px !important;
            height: 36px !important;
            top: 58px !important;
            right: 10px !important;
            font-size: 1.17rem !important;
          }
        }
        `}
      </style>
    </>
  );
}
