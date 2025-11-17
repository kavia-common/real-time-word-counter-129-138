'use strict';

/**
 * Checks if a string is empty after trimming.
 * @param {string} str
 * @returns {boolean}
 */
export function isEmptyString(str) {
  return typeof str !== 'string' || str.trim().length === 0;
}

/**
 * Removes potentially unsafe characters (rudimentary XSS mitigation).
 * @param {string} input
 * @returns {string}
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>"'`\\]/g, '');
}
