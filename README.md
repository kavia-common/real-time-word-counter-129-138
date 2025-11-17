# Real-time Word Counter – Repository Overview

## Project Overview

The Real-time Word Counter is a modern, single-page React web application that provides users with instantaneous, privacy-friendly statistics about words, characters, and lines as they type or paste text. With a clean, responsive interface and engaging bonus widgets, it serves writers, students, professionals, and anyone who needs quick text analysis without data leaving their own machine.

- **Frontend**: React (served on [http://localhost:3000](http://localhost:3000) during development)
- **No backend/API keys required**: All logic runs client-side

For full product and system details, see [PROJECT_DOC.md](./PROJECT_DOC.md) and [SYSTEM_REQUIREMENTS.txt](./SYSTEM_REQUIREMENTS.txt).

---

## Live Preview

- **Development**: The React app runs locally at [http://localhost:3000](http://localhost:3000)
- Start with `npm start` from the `word_counter_frontend` directory

---

## Features

- **Real-time word, character, and line counting** as you type or paste text
- **Fun Widgets**:
  - **RandomWidget**: Presents a random fun fact each time, with the option to refresh
  - **AccentDivider**: Decorative, theme-matched divider between sections for visual clarity
- **Accessibility**: ARIA labeling, live regions, proper color contrast, and keyboard navigation
- **Copy/Clear Actions**: Quick copy-to-clipboard and clear functions with instant feedback
- **Sidebar Panel**: Non-interactive, themed options panel for additional context
- **Responsive Design**: Optimized for mobile and desktop
- **Analytics Helpers**: Most used word/letter, keyword density, readability metrics, and more
- **No backend dependencies**: Everything runs within your browser

---

## Tech Stack

- **React**: Function components and Hooks
- **CSS**: Vanilla CSS with theme tokens and responsiveness
- **Node.js + npm**: For development, build, and test scripts
- **Testing**: Jest and React Testing Library
- **ESLint**: Code linting with React plugin

---

## Getting Started

### Prerequisites

- Node.js (v14 or newer recommended; v18+ tested)
- npm

### Installation

1. Change into the frontend directory:
   ```sh
   cd word_counter_frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the app locally:
   ```sh
   npm start
   ```
   - Visit [http://localhost:3000](http://localhost:3000) in your browser

4. Build a production-optimized static bundle:
   ```sh
   npm run build
   ```

5. Run tests:
   ```sh
   npm test
   ```

---

## Environment Variables

The following `REACT_APP_*` environment variables are optionally available (not required for standard usage). All default to `None`.

| Variable                             | Default | Purpose/Notes                                       |
|---------------------------------------|---------|-----------------------------------------------------|
| REACT_APP_API_BASE                    | None    | Not used (no backend)                               |
| REACT_APP_BACKEND_URL                 | None    | Not used (no backend)                               |
| REACT_APP_FRONTEND_URL                | None    | Optional; not mandatory                             |
| REACT_APP_WS_URL                      | None    | Not required                                        |
| REACT_APP_NODE_ENV                    | None    | Standard/unused                                     |
| REACT_APP_NEXT_TELEMETRY_DISABLED     | None    | Not relevant for Create React App                   |
| REACT_APP_ENABLE_SOURCE_MAPS          | None    | Controls source maps (optional)                     |
| REACT_APP_PORT                        | None    | Defaults to 3000 if unset (for local dev)           |
| REACT_APP_TRUST_PROXY                 | None    | Not used; no backend                                |
| REACT_APP_LOG_LEVEL                   | None    | Not used in this app                                |
| REACT_APP_HEALTHCHECK_PATH            | None    | Not relevant; no backend                            |
| REACT_APP_FEATURE_FLAGS               | None    | Not used                                            |
| REACT_APP_EXPERIMENTS_ENABLED         | None    | Not used                                            |

**Note**: For most users/contributors, no environment variable setup is required.

---

## Project Structure

The repository is organized as follows:

```
real-time-word-counter-129-138/
├── PROJECT_DOC.md            # Product and implementation documentation
├── SYSTEM_REQUIREMENTS.txt   # Supported environments and requirements
├── README.md                 # (This file)
└── word_counter_frontend/
    ├── README.md             # App-level summary and quickstart
    ├── package.json          # npm scripts and configuration
    ├── eslint.config.mjs     # ESLint setup
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js / index.css
    │   ├── components/       # React components (RandomWidget, AccentDivider, etc.)
    │   ├── utils/            # Utility logic and helper UI components
    │   │   ├── string.js
    │   │   ├── number.js
    │   │   ├── timing.js
    │   │   ├── text.js
    │   │   ├── demoUtils.js
    │   │   ├── components/   # InlineHint, HelperBadge
    │   └── api/
    │       └── api.js        # Demo quote helper
    └── __examples__/         # Usage docs for utils/components
```

**Component Highlights**:
- `src/components/AccentDivider.jsx`: Themed horizontal divider for section breaks
- `src/components/RandomWidget.jsx`: Fun fact widget, new fact on click
- `src/components/FrequencyStats.jsx`: Calculates/display most used word/letter
- `src/components/Sidebar.jsx`: Displays randomized static options visually
- `src/utils/components/HelperBadge.jsx`: Inline badge/pill UI
- `src/utils/components/InlineHint.jsx`: Displays an inline info or explanation icon
- `src/utils/`: String, number, timing, text util functions (see `index.js` for exports)

For example usage, see `src/__examples__/utils-components-usage.md` and `src/__examples__/utils-usage.md`.

---

## Available npm Scripts

All scripts should be run inside `word_counter_frontend`:

| Script             | Description                                              |
|--------------------|---------------------------------------------------------|
| `npm start`        | Starts development server at http://localhost:3000      |
| `npm run build`    | Builds production-optimized static assets               |
| `npm test`         | Runs Jest + React Testing Library tests                 |
| `npm run eject`    | **Advanced:** Ejects from Create React App configuration|

---

## Coding Standards

- **Linting**: Uses ESLint (`eslint.config.mjs`) with React-recommended rules, including checks for unused variables.
- **Formatting**: Recommend Prettier, but not strictly enforced; use 2 spaces, single quotes, trailing commas allowed.
- **Naming**: camelCase for variables/functions, PascalCase for React components, and kebab-case for filenames.
- **Accessibility (a11y)**: Components include ARIA labels, high color contrast, and keyboard navigation.
- **Commits**: Concise, imperative messages (e.g., `Add RandomWidget`, `Fix a11y color`).
- **Pull Requests**: Focused, with a summary and rationale; tag maintainers for review; address CI/lint/test feedback.
- **Testing**: New/modified features should have coverage in `App.test.js` or component-level tests.

---

## Contribution Notes

- Please keep contributions focused and accessible.
- Feature/bug branches should be based off `main` or `develop` (`feature/feature-name`).
- Ensure code passes linting and tests (`npm test`) before submitting a PR.
- Add/update documentation for new components, utilities, or structure.

---

## Documentation Links

- [PROJECT_DOC.md](./PROJECT_DOC.md) – Product-level and technical documentation
- [SYSTEM_REQUIREMENTS.txt](./SYSTEM_REQUIREMENTS.txt) – Supported OS/browsers, setup, and tooling

---

Thank you for contributing!  
Questions? Open an issue or PR.

