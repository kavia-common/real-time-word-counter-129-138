'use strict';

/**
 * PUBLIC_INTERFACE
 * Counts words, characters, characters excluding spaces, and lines in a text.
 * @param {string} text
 * @returns {{words: number, chars: number, charsNoSpaces: number, lines: number}}
 */
export function countWords(text) {
  const tokens = String(text)
    .replace(/[—–‐]/g, ' ')
    .split(/\s+/)
    .map(w => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''))
    .filter(w => w.length > 0);
  return {
    words: tokens.length,
    chars: String(text).length,
    charsNoSpaces: String(text).replace(/\s/g, '').length,
    lines: (String(text).match(/\n/g) || []).length + 1,
  };
}

/**
 * PUBLIC_INTERFACE
 * Counts characters in a text string.
 * @param {string} text
 * @returns {number}
 */
export function countChars(text) {
  if (typeof text !== 'string') return 0;
  return text.length;
}
