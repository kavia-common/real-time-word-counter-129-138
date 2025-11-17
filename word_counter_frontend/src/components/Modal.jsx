import React, {
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

/**
 * PUBLIC_INTERFACE
 * Modal - Fully-featured, accessible, reusable dialog/modal component.
 * Supports portal rendering, focus/ESC/overlay close, ARIA attributes, scroll lock,
 * and modern light/rounded design. Footer, header, and custom content supported.
 * 
 * @component
 * @prop {boolean} isOpen - Show/hide modal.
 * @prop {function} onClose - Called to close modal.
 * @prop {string|node} [title] - Modal header/title (visually & for a11y).
 * @prop {node} children - Body/content.
 * @prop {"sm"|"md"|"lg"} [size="md"] - Content width (responsive).
 * @prop {bool} [closeOnOverlay=true] - Click overlay/backdrop closes the modal.
 * @prop {bool} [showClose=true] - Show "X" close button.
 * @prop {string} [className] - Extra classes on modal.
 * @prop {string} [ariaLabel] - Custom aria-label if no title.
 * @prop {node} [footer] - Modal footer node (actions area).
 * @prop {object} [initialFocusRef] - Ref to an element that should auto-receive focus on open.
 * 
 * Accessibility:
 *  - Escape closes (trapped)
 *  - Focus trapped inside modal, and restored on close
 *  - aria-modal, role="dialog", aria-labelledby/aria-describedby
 *  - Header is referenced by aria-labelledby if possible
 * 
 * Example:
 * <Modal isOpen={show} title="Dialog" onClose={...}>Contents</Modal>
 */
function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlay = true,
  showClose = true,
  className = "",
  ariaLabel,
  footer,
  initialFocusRef,
  ...rest
}) {
  // Final environment: portal target, always document.body
  const overlayRef = useRef(null);
  const lastActiveRef = useRef(null);
  const modalContentRef = useRef(null);

  // Portal node for rendering
  const [portalNode, setPortalNode] = React.useState(() =>
    typeof window !== "undefined" ? document.body : null
  );
  useEffect(() => {
    // Update on mount in SSR situations
    if (typeof window !== "undefined") setPortalNode(document.body);
  }, []);

  // Prevent background scrolling (lock scroll)
  useEffect(() => {
    if (isOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [isOpen]);

  // Restore focus to triggering element on close
  useEffect(() => {
    if (isOpen) {
      lastActiveRef.current = document.activeElement;
    } else if (!isOpen && lastActiveRef.current) {
      setTimeout(() => {
        if (lastActiveRef.current?.focus) lastActiveRef.current.focus();
        lastActiveRef.current = null;
      }, 0);
    }
  }, [isOpen]);

  // Focus first element inside modal, or initialFocusRef, on open
  useLayoutEffect(() => {
    if (!isOpen) return;
    let node = null;
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
      return;
    }
    // Find first focusable child in dialog
    const focusables = getFocusableEls(modalContentRef.current);
    if (focusables.length) {
      node = focusables[0];
      node.focus();
    } else {
      // fallback: modalContent itself focusable
      modalContentRef.current?.focus();
    }
  }, [isOpen, initialFocusRef]);

  // Trap ESC key, only when open
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
      }
    }
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [isOpen, onClose]);

  // Trap focus inside modal (Shift+Tab/Tab cycling)
  const focusTrapHandler = useCallback(
    (e) => {
      if (e.key !== "Tab") return;
      const focusables = getFocusableEls(modalContentRef.current);
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        // Tab backwards
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        // Tab forwards
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    const node = modalContentRef.current;
    node?.addEventListener("keydown", focusTrapHandler);
    return () => node?.removeEventListener("keydown", focusTrapHandler);
  }, [isOpen, focusTrapHandler]);

  // Overlay click -- close only if clicking not on content, and enabled
  function onOverlayClick(e) {
    if (!closeOnOverlay) return;
    if (e.target === overlayRef.current) onClose?.();
  }

  // ARIA header and desc id setup
  const modalTitleId = React.useMemo(
    () => (title ? "modal-title-" + Math.floor(Math.random() * 1e7) : undefined),
    [title]
  );

  if (!isOpen || !portalNode) return null;

  // Modal size map
  const sizeMap = {
    sm: "340px",
    md: "440px",
    lg: "640px",
  };
  const modalWidth = sizeMap[size] || sizeMap["md"];

  // Render modal as portal
  return ReactDOM.createPortal(
    <>
      <div
        ref={overlayRef}
        className="modal-portal-overlay"
        aria-modal="true"
        role="dialog"
        aria-labelledby={title ? modalTitleId : undefined}
        aria-label={ariaLabel}
        aria-describedby={undefined}
        tabIndex={-1}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1300,
          background: "rgba(17, 24, 39, 0.19)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "modal-fadein 0.19s cubic-bezier(0.45,0.03,0.47,1.0)",
        }}
        onClick={onOverlayClick}
        data-testid="modal-overlay"
        {...rest}
      >
        <section
          ref={modalContentRef}
          className={`modal-portal-content${className ? " " + className : ""}`}
          style={{
            background: "var(--color-surface, #fff)",
            boxShadow:
              "0 12px 60px 0 rgba(60,80,120,0.17), 0 1.5px 12px 0 rgba(60,80,120,0.09)",
            borderRadius: "18px",
            width: "100%",
            maxWidth: modalWidth,
            minWidth: 240,
            minHeight: 95,
            padding: "2rem 1.7rem 1.5rem 1.7rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            position: "relative",
            outline: "none",
            animation: "modal-content-fadein 0.2s cubic-bezier(0.45,0.03,0.47,1.0)",
          }}
          role="document"
          aria-labelledby={title ? modalTitleId : undefined}
          tabIndex={-1}
        >
          {showClose && (
            <button
              className="modal-portal-close-btn"
              type="button"
              aria-label="Close modal"
              onClick={onClose}
              style={{
                position: "absolute",
                top: "1.02rem",
                right: "1.13rem",
                border: "none",
                background: "none",
                fontSize: "1.54rem",
                fontWeight: 700,
                color: "var(--color-primary, #3b82f6)",
                cursor: "pointer",
                lineHeight: 1,
                borderRadius: "7px",
                transition: "background 0.12s",
                padding: "0.08em 0.33em",
                outline: "none",
                zIndex: 10,
              }}
              tabIndex={0}
              onMouseDown={(e) => e.preventDefault()}
              data-testid="modal-close-btn"
            >
              ×
            </button>
          )}
          {title && (
            <header
              id={modalTitleId}
              className="modal-portal-title"
              style={{
                fontWeight: 700,
                fontSize: "1.17rem",
                color: "var(--color-primary, #3b82f6)",
                marginBottom: ".81rem",
                letterSpacing: "-0.5px",
                textAlign: "center",
                userSelect: "none",
              }}
              tabIndex={0}
            >
              {title}
            </header>
          )}
          <div
            className="modal-portal-body"
            tabIndex={0}
            style={{
              minWidth: 0,
              color: "var(--color-text)",
              fontSize: "1.08rem",
              flex: "1 1 auto",
            }}
          >
            {children}
          </div>
          {footer && (
            <footer
              className="modal-portal-footer"
              style={{
                marginTop: "1.3em",
                display: "flex",
                justifyContent: "flex-end",
                gap: "1.1em",
              }}
            >
              {footer}
            </footer>
          )}
        </section>
      </div>
      {/* Styles: Modal, overlay, close, animation, a11y focus ring */}
      <style>
        {`
        .modal-portal-overlay { animation: modal-fadein 0.17s cubic-bezier(0.45,0.03,0.47,1.0); }
        @keyframes modal-fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-portal-content {
          animation: modal-content-fadein 0.19s cubic-bezier(0.45,0.03,0.47,1.0);
        }
        @keyframes modal-content-fadein {
          from { opacity: 0.25; transform: scale(0.94) translateY(24px);}
          to { opacity: 1; transform: none;}
        }
        .modal-portal-close-btn:focus, .modal-portal-close-btn:hover {
          background: color-mix(in srgb, var(--color-primary) 12%, transparent);
          color: #1560bf;
        }
        .modal-portal-content:focus-visible {
          outline: 2.5px solid #3b82f6;
          box-shadow: 0 0 0 5px #3b82f640;
        }
        .modal-portal-content:focus {
          outline: 2px solid #3b82f6;
        }
        `}
      </style>
    </>,
    portalNode
  );
}

/** Get all focusable elements within a root node (input, button, a, etc.) */
function getFocusableEls(root) {
  if (!root) return [];
  // Select native focusable selectors
  return Array.from(
    root.querySelectorAll(
      [
        "a[href]:not([tabindex='-1'])",
        "button:not([disabled]):not([tabindex='-1'])",
        "textarea:not([disabled]):not([tabindex='-1'])",
        "input:not([type='hidden']):not([disabled]):not([tabindex='-1'])",
        "select:not([disabled]):not([tabindex='-1'])",
        "[tabindex]:not([tabindex='-1'])",
      ].join(",")
    )
  ).filter(
    (el) =>
      !el.hasAttribute("disabled") &&
      !el.getAttribute("aria-hidden") &&
      el.tabIndex >= 0 &&
      el.offsetParent !== null
  );
}

// JSDoc PropTypes
Modal.propTypes = {
  /** Show/hide modal dialog */
  isOpen: PropTypes.bool.isRequired,
  /** Called when user requests to close modal */
  onClose: PropTypes.func.isRequired,
  /** Modal title (header, a11y) */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Modal body/content */
  children: PropTypes.node.isRequired,
  /** Size: "sm" | "md" | "lg" */
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  /** Overlay click closes the modal */
  closeOnOverlay: PropTypes.bool,
  /** Show close "X" button */
  showClose: PropTypes.bool,
  /** Extra class name for main modal content */
  className: PropTypes.string,
  /** aria-label for dialog (if no title) */
  ariaLabel: PropTypes.string,
  /** Custom actions/footer */
  footer: PropTypes.node,
  /** Element ref to auto-focus on open */
  initialFocusRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default Modal;
