import React from "react";
import PropTypes from "prop-types";

/**
 * HelperBadge - Reusable pill/badge component for inline status, labels, or hints.
 *
 * @component
 * @param {object} props
 * @param {string} props.label - Text to display inside the badge (required).
 * @param {string} [props.color] - Hex or CSS color for background/border (defaults to #3b82f6).
 * @param {'solid'|'soft'} [props.variant] - Solid or soft style. Default: 'soft'.
 * @param {string} [props.className] - Extra CSS classes.
 * @returns {JSX.Element}
 *
 * @example
 * <HelperBadge label="Beta" color="#06b6d4" variant="solid" />
 * <HelperBadge label="Help" />
 */
function HelperBadge({
  label,
  color = "#3b82f6",
  variant = "soft",
  className = "",
  ...rest
}) {
  // Choose accessible contrast for text if solid
  const textColor = variant === "solid" ? "#fff" : color;
  const bgColor =
    variant === "solid"
      ? color
      : `color-mix(in srgb, ${color} 10%, #fff)`;
  const borderColor =
    variant === "solid"
      ? color
      : `color-mix(in srgb, ${color} 26%, transparent)`;

  return (
    <span
      role="status"
      aria-label={label}
      className={`helper-badge${className ? " " + className : ""}`}
      style={{
        display: "inline-block",
        padding: "0.27em 0.92em",
        fontSize: "0.98em",
        fontWeight: 600,
        letterSpacing: "-0.1px",
        borderRadius: "13px",
        background: bgColor,
        color: textColor,
        border: `1.2px solid ${borderColor}`,
        userSelect: "none",
        lineHeight: 1.11,
        transition: "background 0.16s, color 0.16s, border 0.17s",
        verticalAlign: "middle",
        ...rest.style
      }}
      tabIndex={0}
      {...rest}
    >
      {label}
    </span>
  );
}

// JSDoc propTypes for clarity & IDE integration
HelperBadge.propTypes = {
  /** Badge text content */
  label: PropTypes.string.isRequired,
  /** Theme color (hex/CSS, e.g., #3b82f6, #06b6d4) */
  color: PropTypes.string,
  /** Visual style: 'solid' | 'soft', default 'soft' */
  variant: PropTypes.oneOf(["solid", "soft"]),
  /** Extra classes (for spacing/placement) */
  className: PropTypes.string,
};

export default HelperBadge;

// Example usage:
/*
  <HelperBadge label="New" />
  <HelperBadge label="Success" color="#06b6d4" variant="solid" />
*/
