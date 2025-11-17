'use strict';

/**
 * PUBLIC_INTERFACE
 * Returns a debounced version of the given function.
 * @param {Function} fn
 * @param {number} delay
 */
export function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * PUBLIC_INTERFACE
 * Returns a throttled version of the given function.
 * @param {Function} fn
 * @param {number} limit
 */
export function throttle(fn, limit) {
  let lastRun = 0;
  let timeoutId;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      fn.apply(this, args);
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastRun = Date.now();
        fn.apply(this, args);
      }, limit - (now - lastRun));
    }
  };
}
