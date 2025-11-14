import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';
import { getMostUsedWordAndLetter } from './components/FrequencyStats';
import DemoTypingSpeed from './components/DemoTypingSpeed.jsx';
import { act } from "react-dom/test-utils"; // for fake timers

// ---- MOCK QUOTE API at top-level, so applies to all widget tests ----
jest.mock("./api/api", () => ({
  getRandomQuote: jest.fn().mockResolvedValue({ text: "Test quote.", author: "Test Author" }),
}));
import { getRandomQuote } from "./api/api";

// -----
// --- QuoteWidget tests ---
// Helper for waiting for quote load in tests
async function waitForQuoteText() {
  // Use findByTestId async to wait for update
  return await screen.findByTestId("quote-text");
}

test("QuoteWidget renders a quote on initial render", async () => {
  render(<App />);
  // Should display QuoteWidget's initial quote (mocked)
  const qText = await screen.findByTestId("quote-text");
  expect(qText).toHaveTextContent("Test quote.");
  expect(qText).toHaveTextContent("Test Author");
});

test("Clicking 'New Quote' fetches a new quote", async () => {
  render(<App />);
  await waitForQuoteText();
  getRandomQuote.mockResolvedValueOnce({ text: "Another quote!", author: "New Author" });
  const btn = screen.getByTestId("quote-btn");
  fireEvent.click(btn);
  // Loading state
  expect(btn).toHaveTextContent(/fetching/i);
  // New quote should appear
  const qText = await screen.findByTestId("quote-text");
  expect(qText).toHaveTextContent("Another quote!");
  expect(qText).toHaveTextContent("New Author");
});

test("QuoteWidget handles API failure gracefully and shows fallback", async () => {
  getRandomQuote.mockImplementationOnce(() => Promise.resolve({
    text: "Creativity is intelligence having fun.",
    author: "Albert Einstein"
  }));
  render(<App />);
  const qText = await screen.findByTestId("quote-text");
  expect(qText).toHaveTextContent("Creativity is intelligence having fun.");
  expect(qText).toHaveTextContent("Albert Einstein");
});

test("QuoteWidget handles unexpected API error", async () => {
  getRandomQuote.mockImplementationOnce(() => Promise.reject("fail"));
  render(<App />);
  const errorText = await screen.findByTestId("quote-error");
  expect(errorText).toHaveTextContent(/couldn't fetch/i);
});

// -----

test('renders main counter UI and updates counts', () => {
  render(<App />);
  // Heading exists
  expect(screen.getByText(/real-time word counter/i)).toBeInTheDocument();

  // UtilityTips rendered (live tips area)
  const tips = screen.getByTestId("utility-tips");
  expect(tips).toBeInTheDocument();

  // Shows initial metrics (zero/blank)
  expect(screen.getByTestId("ut-avg-wordlen")).toHaveTextContent(/—|0.00/);
  expect(screen.getByTestId("ut-rt")).toBeInTheDocument();
  expect(screen.getByTestId("ut-sent")).toHaveTextContent("0");

  // Keyword density starts empty (unless stopword-only text)
  expect(screen.getByTestId("ut-keywords")).toHaveTextContent(/no keywords/i);
});


// Sidebar specific test: renders and shows at least 5 static, non-interactive items
test('Sidebar renders a list of view-only options (non-interactive)', () => {
  render(<App />);
  const nav = screen.getByRole('navigation', { name: /sidebar options/i });
  expect(nav).toBeInTheDocument();

  // Sidebar header present
  expect(within(nav).getByText(/options/i)).toBeInTheDocument();

  // Has a list with at least 5 items
  const items = within(nav).getAllByRole('listitem');
  expect(items.length).toBeGreaterThanOrEqual(5);
  // Each list item should not be interactive (no aria/href/tabindex=0)
  items.forEach((li) => {
    expect(li).not.toHaveAttribute('onclick');
    expect(li).not.toHaveAttribute('onClick');
    expect(li).toHaveAttribute('aria-disabled', 'true');
    // Tabindex -1 = not focusable
    expect(li).toHaveAttribute('tabindex', '-1');
  });
});
  // Textarea exists and has correct label
  const textarea = screen.getByLabelText(/text to analyze/i);
  expect(textarea).toBeInTheDocument();

  // Pills exist for stats
  const pills = [
    { label: 'Words', testid: 'stat-words', expected: '0' },
    { label: 'Chars', testid: 'stat-chars', expected: '0' },
    { label: 'No spaces', testid: 'stat-no-spaces', expected: '0' },
    { label: 'Lines', testid: 'stat-lines', expected: '1' },
  ];
  for (const pill of pills) {
    const el = screen.getByTestId(pill.testid);
    expect(el).toHaveTextContent(pill.expected);
  }

  // Enter text and verify stats update
  fireEvent.change(textarea, { target: { value: 'Hello world\nand AI magic!' } });
  expect(screen.getByTestId('stat-words')).toHaveTextContent('4');
  expect(screen.getByTestId('stat-chars')).toHaveTextContent('24');
  expect(screen.getByTestId('stat-no-spaces')).toHaveTextContent('20');
  expect(screen.getByTestId('stat-lines')).toHaveTextContent('2');

  // 'Clear' button disables when text is empty, enabled when text
  const clearBtn = screen.getByRole('button', { name: /clear/i });
  expect(clearBtn).not.toBeDisabled();
  fireEvent.click(clearBtn);
  expect(textarea).toHaveValue('');
  expect(clearBtn).toBeDisabled();
});

test('clipboard copy sets Copied! then resets', async () => {
  // Mock clipboard API
  Object.assign(navigator, {
    clipboard: { writeText: jest.fn().mockResolvedValue() }
  });
  render(<App />);
  const textarea = screen.getByLabelText(/text to analyze/i);
  fireEvent.change(textarea, { target: { value: 'Hello world' } });
  const copyBtn = screen.getByRole('button', { name: /copy/i });
  expect(copyBtn).not.toBeDisabled();
  fireEvent.click(copyBtn);
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello world');
  // "Copied!" temporary text visible
  expect(copyBtn).toHaveTextContent('Copied');
});

test('most used word and letter stats appear and update live', () => {
  render(<App />);
  // Initially blank = both em dash
  expect(screen.getByTestId('stat-most-word')).toHaveTextContent('—');
  expect(screen.getByTestId('stat-most-letter')).toHaveTextContent('—');

  // UtilityTips - keyword density and preview work & update
  const textarea = screen.getByLabelText(/text to analyze/i);

  // Enter text and see UtilityTips metrics/keywords update
  fireEvent.change(textarea, { target: { value: 'Fast fox jumps. Slow fox sleeps! Jumps fast.' } });

  // Metrics: Word length, Read time, Sentences (should be >0)
  expect(Number(screen.getByTestId("ut-avg-wordlen").textContent)).toBeGreaterThan(0);
  expect(screen.getByTestId("ut-rt").textContent).not.toMatch(/—/);
  expect(Number(screen.getByTestId("ut-sent").textContent)).toBeGreaterThanOrEqual(1);

  // Keyword density should list top words (excluding stopwords)
  const kwords = screen.getByTestId("ut-keywords");
  expect(kwords.textContent).toMatch(/fox/);
  expect(kwords.textContent).toMatch(/fast/);

  // Open preview for Title/UPPER/lower - should display preview content
  ["title", "upper", "lower"].forEach((key) => {
    const btn = screen.getByTestId(`ut-toggle-${key}`);
    fireEvent.click(btn);
    const area = screen.getByTestId(`ut-preview-${key}`);
    // Area shows preview (not empty)
    expect(area.textContent.length).toBeGreaterThan(0);
    // Close & open do not change textarea value
    const before = textarea.value;
    fireEvent.click(btn); // collapse
    fireEvent.click(btn); // open again
    expect(textarea.value).toBe(before);
  });
});


test('renders DemoTypingSpeed and updates metrics', () => {
  jest.useFakeTimers();
  const sample = "Test speed!";
  render(<DemoTypingSpeed sampleText={sample} typingSpeed={60} />);
  
  // Typing region and initial metrics
  const typingText = screen.getByTestId("demo-typing-text");
  const wpm = screen.getByTestId("demo-wpm");
  const cpm = screen.getByTestId("demo-cpm");
  const elapsed = screen.getByTestId("demo-elapsed");
  expect(typingText.textContent.length).toBe(0); // starts blank
  expect(wpm).toHaveTextContent("WPM");
  expect(cpm).toHaveTextContent("CPM");
  expect(elapsed).toHaveTextContent("0s");

  // Simulate animation for 4 chars, check cursor and metrics >0
  act(() => {
    jest.advanceTimersByTime(280 * 4); // about 4 chars worth at 60wpm
  });
  expect(typingText.textContent.length).toBeGreaterThan(0);
  expect(wpm.textContent).toMatch(/WPM: \d+/);
  expect(cpm.textContent).toMatch(/CPM: \d+/);
  expect(Number(elapsed.textContent.replace('s', ''))).toBeGreaterThanOrEqual(0);

  // Full sentence finished: metrics peak, cursor gone
  act(() => {
    jest.advanceTimersByTime(10000); // finish complete typing+pause
  });
  expect(typingText.textContent).toMatch(sample);
  expect(screen.getByTestId("demo-cursor").style.display).toBe("none");

  // Animation loops resets to 0 after pause
  act(() => {
    jest.advanceTimersByTime(2000);
  });
  expect(typingText.textContent.length).toBeLessThan(sample.length + 1);

  jest.useRealTimers();
});

test('getMostUsedWordAndLetter utility handles edge cases', () => {
  // Only punctuation and spaces
  expect(getMostUsedWordAndLetter('.,!?{}[]   " \' ')).toEqual({ word: null, letter: null });

  // Handles hyphenated words as words, not splitting inside hyphens
  expect(getMostUsedWordAndLetter('strong-will strong-will weak')).toEqual({
    word: 'strong-will',
    letter: 'l',
  });

  // Tie-breaking, with digits and lex order
  expect(getMostUsedWordAndLetter('2 1 1 2 3!')).toEqual({ word: '1', letter: '1' });

  // Remove punctuation at edges only
  expect(getMostUsedWordAndLetter('!foo! "foo", foo.')).toEqual({ word: 'foo', letter: 'o' });

  // Ignore non-ascii letters for letter most count
  expect(getMostUsedWordAndLetter('中文 中文 chinese chinese CHINESE')).toEqual({
    word: 'chinese',
    letter: 'c',
  });

  // Emojis and spaces, should ignore for letter
  expect(getMostUsedWordAndLetter('🦄 🦄 🦄 a a ab')).toEqual({ word: 'a', letter: 'a' });

  // Upper and lower case treat as same
  expect(getMostUsedWordAndLetter('Bob bob BOB, alice Alice')).toEqual({ word: 'bob', letter: 'b' });
});

