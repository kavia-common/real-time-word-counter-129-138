'use strict';

/**
 * PUBLIC_INTERFACE
 * Safely formats a number with commas.
 * @param {number|string} n
 * @returns {string}
 */
export function formatNumberWithCommas(n) {
  if (isNaN(n)) return '0';
  return Number(n).toLocaleString();
}

/**
 * PUBLIC_INTERFACE
 * Clamps a number between min and max.
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
