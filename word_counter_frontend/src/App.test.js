import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

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
