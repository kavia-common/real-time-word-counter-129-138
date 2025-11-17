import React, { useEffect, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * Modal - Reusable modal component with overlay.
 * Props:
 *  - isOpen: boolean (show/hide modal)
 *  - onClose: function (called to close modal)
 *  - title: string (optional, modal header)
 *  - children: modal content
 *
 * Closes on:
 *  - ESC keypress
 *  - Backdrop click (not inner content)
 *  - X close button
 * Light/modern theme with #3b82f6 accent, subtle shadow, and rounded corners.
 */
export default function Modal({ isOpen, onClose, title, children }) {
  const overlayRef = useRef(null);

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Trap focus for accessibility
  useEffect(() => {
    if (!isOpen) return;
    const focusableSelectors = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";
    const modalNode = overlayRef.current?.querySelector(".modal-content");
    if (!modalNode) return;
    const focusables = modalNode.querySelectorAll(focusableSelectors);
    if (focusables.length) focusables[0].focus();

    function trapTab(e) {
      if (e.key !== "Tab" || !focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    modalNode.addEventListener("keydown", trapTab);
    return () => modalNode.removeEventListener("keydown", trapTab);
  }, [isOpen]);

  // Close on backdrop (but not if clicked inside modal)
  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) {
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal-overlay"
        ref={overlayRef}
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        onClick={handleOverlayClick}
        style={{
          position: "fixed",
          zIndex: 999,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(17, 24, 39, 0.19)", // subtle dark overlay
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.14s cubic-bezier(0.45,0.03,0.47,1.0)",
        }}
        data-testid="modal-overlay"
      >
        <section
          className="modal-content"
          tabIndex={-1}
          style={{
            background: "var(--color-surface, #fff)",
            boxShadow: "0 12px 60px 0 rgba(60,80,120,0.17), 0 1.5px 12px 0 rgba(60,80,120,0.09)",
            borderRadius: "18px",
            minWidth: "320px",
            maxWidth: "93vw",
            minHeight: "90px",
            maxHeight: "90vh",
            padding: "2rem 1.8rem 1.5rem 1.8rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            position: "relative",
            transition: "box-shadow 0.17s cubic-bezier(0.45,0.03,0.47,1.0)",
            outline: "none"
          }}
          aria-label={title || "Modal"}
        >
          {/* Close button top right */}
          <button
            className="modal-close-btn"
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1.05rem",
              right: "1.1rem",
              border: "none",
              background: "none",
              fontSize: "1.52rem",
              fontWeight: 700,
              color: "var(--color-primary, #3b82f6)",
              cursor: "pointer",
              lineHeight: 1,
              borderRadius: "7px",
              transition: "background 0.13s",
              padding: "0.1em 0.36em",
              outline: "none",
              zIndex: 10,
            }}
            tabIndex={0}
            onMouseDown={e => e.preventDefault()}
          >
            ×
          </button>
          {title && (
            <header
              className="modal-title"
              style={{
                fontWeight: 700,
                fontSize: "1.17rem",
                color: "var(--color-primary, #3b82f6)",
                marginBottom: ".82rem",
                letterSpacing: "-0.5px",
                textAlign: "center",
                userSelect: "none"
              }}
              tabIndex={0}
            >
              {title}
            </header>
          )}
          <div tabIndex={0}>{children}</div>
        </section>
      </div>
      <style>
        {`
        .modal-overlay {
          animation: modal-fadein 0.16s var(--motion-ease, cubic-bezier(0.45,0.03,0.47,1.0));
        }
        @keyframes modal-fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-content {
          animation: modal-content-fadein 0.19s cubic-bezier(0.45,0.03,0.47,1.0);
        }
        @keyframes modal-content-fadein {
          from { 
            opacity: 0.2;
            transform: scale(0.93) translateY(24px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .modal-close-btn:focus, .modal-close-btn:hover {
          background: color-mix(in srgb, var(--color-primary) 12%, transparent);
          color: #1560bf;
        }
        `}
      </style>
    </>
  );
}
