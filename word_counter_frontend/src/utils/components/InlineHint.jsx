import React from "react";
import PropTypes from "prop-types";

/**
 * InlineHint - Minimalistic inline hint/info icon with optional text and a native hover tooltip.
 *
 * @component
 * @param {object} props
 * @param {string} props.title - Tooltip text (required for accessibility).
 * @param {string} [props.children] - Optional text next to the icon.
 * @param {string} [props.className] - Extra CSS classes.
 * @returns {JSX.Element}
 *
 * @example
 * <InlineHint title="This is a helper tooltip." />
 * <InlineHint title="Explains more"><strong>Help</strong></InlineHint>
 */
function InlineHint({ title, children, className = "", ...rest }) {
  return (
    <span
      className={`inline-hint${className ? " " + className : ""}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.32em",
        fontSize: "0.97em",
        cursor: "help",
        color: "var(--color-secondary, #64748b)"
      }}
      title={title}
      tabIndex={0}
      role="note"
      aria-label={title}
      {...rest}
    >
      {/* SVG info icon */}
      <svg
        width="1.04em"
        height="1.04em"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        focusable="false"
        style={{ verticalAlign: "middle", display: "inline" }}
      >
        <circle cx="10" cy="10" r="9" fill="#3b82f6" opacity="0.18" />
        <circle cx="10" cy="10" r="8.2" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <rect x="9.35" y="5.8" width="1.3" height="1.35" rx="0.65" fill="#3b82f6" />
        <rect x="9.35" y="8.1" width="1.3" height="5.85" rx="0.65" fill="#3b82f6" />
      </svg>
      {children && <span style={{ marginLeft: "0.16em" }}>{children}</span>}
    </span>
  );
}

InlineHint.propTypes = {
  /** Tooltip (native 'title' prop and aria-label) */
  title: PropTypes.string.isRequired,
  /** Optional inline text/children */
  children: PropTypes.node,
  /** Extra classes for placement/styling */
  className: PropTypes.string,
};

export default InlineHint;

// Example usage:
/*
  <InlineHint title="Words separated by spaces or punctuation.">Word count</InlineHint>
  <InlineHint title="This badge means feature in progress." />
*/
