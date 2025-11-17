import React from "react";
import styles from "./GlassButton.module.css";

/**
 * Spinner is an inline circular loader for the GlassButton loading state.
 */
function Spinner() {
  return (
    <span
      className={styles.spinner}
      aria-label="Loading"
      role="status"
      data-testid="glass-btn-spinner"
    />
  );
}

/**
 * PUBLIC_INTERFACE
 * GlassButton - Reusable glassmorphic button component with accessibility and loading support.
 *
 * Props:
 * - text: string (label, required if no children)
 * - onClick?: (event) => void
 * - disabled?: boolean
 * - type?: 'button'|'submit'|'reset'
 * - className?: string (additional classes)
 * - children?: React.ReactNode (if provided, overrides 'text')
 * - loading?: boolean (if true, shows spinner and disables interactions)
 */
function GlassButton({
  text,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  children,
  loading = false,
  ...rest
}) {
  const isDisabled = disabled || loading;
  const btnClass =
    styles.button +
    (isDisabled ? " " + styles.disabled : "") +
    (className ? " " + className : "");

  // Accessible ARIA label: text for screen readers, prefer children if present
  const label =
    typeof children === "string"
      ? children
      : typeof text === "string"
      ? text
      : undefined;

  return (
    <button
      type={type}
      className={btnClass}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-label={label}
      aria-busy={loading ? "true" : undefined}
      tabIndex={0}
      {...rest}
    >
      {loading && <Spinner />}
      {children || text}
    </button>
  );
}

export default GlassButton;
