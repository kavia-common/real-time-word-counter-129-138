import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';
import { getMostUsedWordAndLetter } from './components/FrequencyStats';

test('renders main counter UI and updates counts', () => {
  render(<App />);
  // Heading exists
  expect(screen.getByText(/real-time word counter/i)).toBeInTheDocument();

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

  const textarea = screen.getByLabelText(/text to analyze/i);

  // Single word
  fireEvent.change(textarea, { target: { value: 'waffle' } });
  expect(screen.getByTestId('stat-most-word')).toHaveTextContent('waffle');
  expect(screen.getByTestId('stat-most-letter')).toHaveTextContent('f'); // two fs

  // Add tie for letters
  fireEvent.change(textarea, { target: { value: 'baa' } });
  // a and b both 1, so lex smallest ("a")
  expect(screen.getByTestId('stat-most-letter')).toHaveTextContent('a');

  // Multiple words, tie on word (a/aa)
  fireEvent.change(textarea, { target: { value: 'a a b b' } });
  expect(screen.getByTestId('stat-most-word')).toHaveTextContent('a');
  expect(screen.getByTestId('stat-most-letter')).toHaveTextContent('a');

  // Punctuation ignored, counts correct, case ignored
  fireEvent.change(textarea, { target: { value: "Alpha! Beta, alpha. ALPHA; beta?" } });
  expect(screen.getByTestId('stat-most-word')).toHaveTextContent('alpha');
  expect(screen.getByTestId('stat-most-letter')).toHaveTextContent('a');
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

