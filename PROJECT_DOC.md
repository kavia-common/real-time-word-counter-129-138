# Real-time Word Counter

## Overview

The Real-time Word Counter is a modern, single-page React application designed to provide users with instant, accurate statistics on words, characters, and lines as they type or paste text. It is ideal for writers, students, professionals, and anyone needing quick text analysis without privacy concerns—no data leaves your machine.

The app sports a light, friendly, and accessible UI, with live updates and several bonus widgets to make the experience engaging and informative.

## Features

- **Real-time word, character, and line counting**
- **RandomWidget:** Displays fun facts that refresh on click
- **QuoteWidget:** Shows a random inspirational quote
- **DailyDoseOfWord:** Presents a new word and definition each time
- **Responsive design:** Fully optimized from mobile to desktop
- **Copy to Clipboard** and **Clear** actions for user convenience
- **Frequency statistics:** Shows most used word and letter
- **UtilityTips:** In-line analytics, keyword density, transformations
- **Sidebar:** Non-interactive, themed option panel
- **Accessible:** ARIA labels, live regions, color contrast, keyboard navigation
- **No backend or API keys required:** All logic runs client-side

## Tech Stack

- **Frontend:** React (Functional Components, Hooks)
- **Styling:** Vanilla CSS (theme tokens, responsive layouts)
- **Environment:** Node.js with npm (for build/run/test)
- **No backend:** All logic runs in the browser; APIs used for public quote data only
- **Port:** Served on `localhost:3000` during development

## Getting Started (Local Development)

### Prerequisites

- Node.js (version 14 or above recommended)
- npm

### Installation and Running Locally

1. **Install dependencies:**
   ```sh
   cd word_counter_frontend
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm start
   ```
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production:**
   ```sh
   npm run build
   ```

4. **Run tests:**
   ```sh
   npm test
   ```

> _Note:_ The preview environment is also managed by the hosting platform and uses the same `npm start` script.

## Environment Variables

The following `REACT_APP_*` environment variables are available but not required for standard use. All are optional and default to `None` unless provided:

| Variable                               | Default | Purpose/Notes                                              |
|-----------------------------------------|---------|------------------------------------------------------------|
| REACT_APP_API_BASE                      | None    | Not used (no backend)                                      |
| REACT_APP_BACKEND_URL                   | None    | Not used (no backend)                                      |
| REACT_APP_FRONTEND_URL                  | None    | Not mandatory                                              |
| REACT_APP_WS_URL                        | None    | Not required                                               |
| REACT_APP_NODE_ENV                      | None    | Standard Node/React builds use NODE_ENV                    |
| REACT_APP_NEXT_TELEMETRY_DISABLED       | None    | Not relevant for Create React App                          |
| REACT_APP_ENABLE_SOURCE_MAPS            | None    | Optional, controls source maps in React                    |
| REACT_APP_PORT                          | None    | Defaults to 3000 if unset                                  |
| REACT_APP_TRUST_PROXY                   | None    | No backend involved                                        |
| REACT_APP_LOG_LEVEL                     | None    | Not utilized by this app                                   |
| REACT_APP_HEALTHCHECK_PATH              | None    | No backend, so not required                                |
| REACT_APP_FEATURE_FLAGS                 | None    | No feature flag system implemented                         |
| REACT_APP_EXPERIMENTS_ENABLED           | None    | Not used                                                   |

In most cases, none of these variables need to be set for local development or usage.

## Project Structure

Key folders and files of the frontend codebase:

```
word_counter_frontend/
├── src/
│   ├── App.js           # Main app logic and UI
│   ├── App.css          # Global styles
│   ├── index.js         # App bootstrap
│   ├── index.css        # Theme and root styling
│   ├── components/      # React components: RandomWidget, QuoteWidget, Sidebar, UtilityTips, etc.
│   ├── utils/           # Utility functions (string, text, number, timing, index)
│   │   ├── string.js
│   │   ├── text.js
│   │   ├── number.js
│   │   ├── timing.js
│   │   ├── index.js
│   │   └── demoUtils.js
│   ├── api/             # API helpers (quotes)
│   │   └── api.js
│   ├── __examples__/    # Example usage (see utils-usage.md)
│   ├── App.test.js      # Unit tests (Jest/RTL)
│   └── setupTests.js    # Test environment config
├── public/
│   └── ...              # Static assets (not shown)
├── package.json         # Project metadata and npm scripts
├── eslint.config.mjs    # ESLint config for code linting
└── README.md            # Short description

...
```

## Available Scripts

All scripts are defined in `package.json`. From `word_counter_frontend/`, use:

| Script          | Description                                 |
|-----------------|---------------------------------------------|
| `npm start`     | Start the local app at http://localhost:3000|
| `npm run build` | Build production-optimized static files     |
| `npm test`      | Run automated tests with Jest + RTL         |
| `npm run eject` | (Advanced) Ejects CRA config                |

## Coding Standards

- **Linting:** Uses ESLint with React recommended rules (`eslint.config.mjs`), including code style and no-unused-vars checks.
- **Formatting:** If Prettier is not set up, it is strongly suggested to use standard JS formatting conventions (2 spaces, single quotes, trailing commas allowed).
- **Naming Conventions:** Use camelCase for variables/functions, PascalCase for React components, kebab-case for filenames where possible.
- **Accessibility:** Components include ARIA labels, keyboard navigation, and color contrast.
- **Commits:** Write concise, imperative commit messages (e.g., "Add RandomWidget", "Refactor utils", "Fix a11y label")
- **PRs:** Submit focused pull requests with a short summary of changes.

## Utilities Overview

The app features a robust set of utility functions in `src/utils/` (see also `src/__examples__/utils-usage.md`):

### `text.js`
- **countWords(text)**: Returns `{ words, chars, charsNoSpaces, lines }` for a given string.
- **countChars(text)**: Returns total character count.

### `number.js`
- **formatNumberWithCommas(n)**: Formats a number with commas as thousands separators.
- **clamp(val, min, max)**: Restrict a number to a given range.

### `timing.js`
- **debounce(fn, delay)**: Debounces a function, useful for optimizing input handling.
- **throttle(fn, limit)**: Ensures a function runs at most once per specified limit.

### `string.js`
- **isEmptyString(str)**: Checks if string is empty or only whitespace.
- **sanitizeInput(input)**: Rudimentary stripping of unsafe HTML/script characters.

### `demoUtils.js`
- Utility helpers for demo use: `randomInt`, `shuffleArray`, `safeFetch` (with timeout), additional debounce.

### `index.js`
- Exports all utility functions from above modules for easy import.

## Components Overview

Major React components and widgets:

- **RandomWidget** (`src/components/RandomWidget.jsx`): Displays a random fun fact from a static list. Users can click the "Another Fact" button to see a new fact. Accessible and themed per app style.
- **QuoteWidget**: Fetches and displays an inspirational quote from quotable.io, with live region, loading states, and retry.
- **DailyDoseOfWord**: Shows a random word and its meaning each time you visit or reload.
- **FrequencyStats**: Shows the most frequently used word and letter in the main input.
- **UtilityTips**: Offers live readability metrics and keyword density, as well as quick transformation previews (Title Case, UPPERCASE, lowercase) for the current input.
- **Sidebar**: Lists several app "options" (static, reshuffled per render), non-interactive but thematically consistent.
- **DemoTypingSpeed**: Animates sample typing to showcase WPM/CPM speed.
- **Navbar** and **Header**: Prominent at the top, providing branding and navigation.

### Core Word Counter Area

At the heart of the app is the textarea and live metrics:

- **Text input** (with accessible labeling)
- **Instant stats:** words, characters, characters excluding spaces, and line counts live-update as you type or paste text.
- **Action buttons:** Copy to clipboard, Clear
- **Inline UtilityTips** and bottom FrequencyStats appear below

## Contribution Guide

- **Branching:** Create feature branches from `main` or `develop` (e.g., `feature/a11y-enhancements`).
- **Pull Requests:** Keep PRs focused; include a summary and clear rationale. Link to issues if applicable.
- **Commit Style:** Use short, imperative subject lines (e.g., "Add RandomWidget", "Fix quote loading bug").
- **Reviews:** Tag at least one maintainer; respond to feedback promptly.
- **Code Quality:** Ensure ESLint passes and that UI remains accessible.
- **Testing:** Add or update test cases in `App.test.js` for new features/bugs.

## Roadmap

Planned or potential improvements:

- [ ] **Character Count Toggle** (show/hide characters including/excluding spaces)
- [ ] **Paste Cleanup:** Automatically remove formatting or invisible chars on paste
- [ ] **Accessibility Enhancements:** Improved screen reader experience for metrics and interactive buttons
- [ ] **Internationalization (i18n):** Support multiple languages
- [ ] **Theme Customization:** Allow user to change accent/background colors
- [ ] **Mobile Input Optimization:** Enhanced controls for touch devices

## License

MIT

## Changelog

- **How to maintain:**  
  - Add a "## [version] - YYYY-MM-DD" header at the bottom of this file for each new release or major change.
  - List added, changed, deprecated, or removed features under that heading.
  - Example:
    ```
    ## [1.0.1] - 2024-06-12
    ### Changed
    - Improved a11y labeling for textarea.
    ### Added
    - RandomWidget: Fun facts widget.
    ```

---

Happy counting! For questions or contributions, open an issue or PR on the repository.

