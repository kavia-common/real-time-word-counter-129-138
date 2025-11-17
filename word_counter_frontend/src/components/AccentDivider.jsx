import React from "react";

/**
 * PUBLIC_INTERFACE
 * AccentDivider - A subtle, decorative horizontal divider with a gradient accent for section separation.
 * - Gradient uses #3b82f6 (primary) and #06b6d4 (accent) on light backgrounds.
 * - Accessible: role is "presentation" for screen readers.
 * - Responsive: scales width and thickness, margin can be adjusted via props.
 * - Props:
 *   - style: override/additional style object
 *   - margin: vertical margins (default: "1.35rem 0")
 */
export default function AccentDivider({ style = {}, margin = "1.35rem 0" }) {
  return (
    <hr
      aria-hidden="true"
      role="presentation"
      tabIndex={-1}
      className="accent-divider"
      style={{
        border: "none",
        height: "4px",
        width: "100%",
        background: "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
        opacity: 0.22,
        borderRadius: "3px",
        margin: margin,
        ...style,
      }}
    />
  );
}
