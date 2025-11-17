import React from "react";
import styles from "./Header.module.css";

/**
 * PUBLIC_INTERFACE
 * Header - App header with title, light minimalist design, responsive and a11y.
 * - Primary color: #3b82f6 for the title.
 * - Centered on small screens, padded container, light surface background.
 * - Semantic <header> for accessibility.
 */
export default function Header() {
  return (
    <header className={styles.header} aria-label="App Header">
      <div className={styles.inner}>
        <h1 className={styles.title}>Real-time Word Counter</h1>
      </div>
    </header>
  );
}
