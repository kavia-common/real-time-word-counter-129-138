# Real-time Word Counter React App

A modern single-page React app for counting words, characters, and lines as you type. Paste or write text and see live updates in a beautiful, accessible UI.

---

## Features

- **Live word, char, and line counting** with robust tokenization
- Single, centered responsive card with gradient header
- **Copy to clipboard** and **Clear** buttons with instant feedback
- Accessible (`aria-label`s, aria-live, color contrast)
- Stylish light theme, soft shadows, and color accents (`#3b82f6`, `#06b6d4`, `#f9fafb`)
- Mobile-friendly, adjusts layout for all devices
- No backend, no API keys, no env vars needed

## Usage

1. Start the app locally:

   ```
   npm install
   npm start
   ```

2. Visit [http://localhost:3000](http://localhost:3000).

3. Type or paste into the textarea. The stats will update live:
   - **Words**: Sequences of letters or numbers (not just whitespace splits)
   - **Chars**: All characters
   - **No spaces**: Excludes whitespace from char count
   - **Lines**: Line breaks detected

4. Use the "Clear" or "Copy" buttons.
   - *Copy* places text on clipboard and flashes "Copied!"

5. Fully responsive: Try on phone and desktop.

## Accessibility

- Textarea has a visible label and `aria-label`
- Stats update in a polite `aria-live` region
- Good color contrast for readability
- Keyboard accessible: Tab to all buttons/fields.

## Technical Notes

- Uses only React + vanilla CSS (no Tailwind or extra UI libs).
- All theme/colors in `src/App.css`:  
    - `--primary: #3b82f6`, `--success: #06b6d4`, `--background: #f9fafb`, `--text: #111827` etc.
- `src/App.js` contains all logic and UI.  
- Minimal, robust `countWords` handles apostrophe/dashes and real "words".

## Testing

- Minimal Jest/RTL test for main functionality.
- Run tests:  
  ```
  npm test
  ```

---

**MIT License**

