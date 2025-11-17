import React from "react";

/**
 * PUBLIC_INTERFACE
 * Navbar - Responsive, sticky top navigation bar.
 * Light/modern theme, primary (#3b82f6), secondary (#64748b).
 * Displays app title ("Word Counter") left, placeholder links ("Home", "About") right.
 * No routing; sticky at top; subtle shadow; spans full width.
 */
export default function Navbar() {
  return (
    <nav
      className="navbar"
      aria-label="Main Navigation"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        background: "var(--color-surface, #fff)",
        boxShadow: "0 2px 12px 0 rgba(60,80,120,0.08)",
        borderBottom: "1px solid #e5e7eb",
        minHeight: "58px",
        display: "flex",
        alignItems: "center",
        padding: "0 .9rem",
        transition: "box-shadow 0.17s var(--motion-ease, cubic-bezier(0.45,0.03,0.47,1.0));"
      }}
      data-testid="navbar"
    >
      <div
        className="navbar-title"
        style={{
          color: "var(--color-primary, #3b82f6)",
          fontWeight: 800,
          fontSize: "1.38rem",
          letterSpacing: "-0.5px",
          userSelect: "none",
          flex: "1 1 auto",
          padding: ".16em 0"
        }}
      >
        Word Counter
      </div>
      <ul
        className="navbar-nav"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.6rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
          flex: "0 1 auto"
        }}
      >
        <li
          className="navbar-link"
          style={{
            color: "var(--color-secondary, #64748b)",
            fontWeight: 500,
            fontSize: "1.07rem",
            cursor: "pointer",
            userSelect: "none",
            transition: "color 0.13s var(--motion-fast, ease)",
          }}
          tabIndex={0}
          aria-label="Home"
        >
          Home
        </li>
        <li
          className="navbar-link"
          style={{
            color: "var(--color-secondary, #64748b)",
            fontWeight: 500,
            fontSize: "1.07rem",
            cursor: "pointer",
            userSelect: "none",
            transition: "color 0.13s var(--motion-fast, ease)",
          }}
          tabIndex={0}
          aria-label="About"
        >
          About
        </li>
      </ul>
      <style>
        {`
        @media (max-width: 700px) {
          .navbar {
            padding: 0 .25rem !important;
          }
          .navbar-title {
            font-size: 1.09rem !important;
          }
          .navbar-link {
            font-size: 0.96rem !important;
            padding: 0 0.3em !important;
          }
        }
        `}
      </style>
    </nav>
  );
}
