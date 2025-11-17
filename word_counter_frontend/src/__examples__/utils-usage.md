# Utils Usage Examples

These examples demonstrate how to use the utility helpers in `src/utils` in your React app.

## Word & Character Counting

```js
import { countWords, countChars } from '../utils/text';

const stats = countWords('Hello world! Welcome to the counter.');
// stats = { words: 6, chars: 33, charsNoSpaces: 27, lines: 1 };

const chars = countChars('Hello world'); // 11
```

## Number Formatting

```js
import { formatNumberWithCommas } from '../utils/number';

formatNumberWithCommas(1234567); // "1,234,567"
```

## String Helpers

```js
import { isEmptyString, sanitizeInput } from '../utils/string';

isEmptyString('   '); // true
sanitizeInput('<script>alert("hi")</script>'); // scriptalert(hi)/script
```

## Timing Helpers

```js
import { debounce, throttle } from '../utils/timing';

// Debounced input handler
const debouncedHandler = debounce((val) => console.log(val), 300);
// Throttled scroll event
const throttledScroll = throttle(() => console.log('scroll'), 200);
```

## Example: Using `countWords` in a component

```js
import { countWords } from '../utils/text';

function Example({ text }) {
  const stats = countWords(text);
  return <div>Word count: {stats.words}</div>;
}
```

## Example: Using `formatNumberWithCommas` for stats display

```js
import { formatNumberWithCommas } from '../utils/number';
<span>{formatNumberWithCommas(stats.words)}</span>
```

> **Note:** If you see a word counting function in another file (such as a legacy or component-level function), replace it with `countWords` from `utils/text` for consistency. See `App.js` for suggested integration.

