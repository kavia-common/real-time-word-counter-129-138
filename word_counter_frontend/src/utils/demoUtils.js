//
// Utility helpers for demo apps and random content needs.
//
// randomInt, shuffleArray, safeFetch (with timeout/error), debounce.
//

/**
 * PUBLIC_INTERFACE
 * randomInt - Returns a random integer in [min, max)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * PUBLIC_INTERFACE
 * shuffleArray - Returns a new shuffled array (Fisher-Yates)
 * @template T
 * @param {T[]} arr
 * @returns {T[]}
 */
export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * PUBLIC_INTERFACE
 * safeFetch - Fetch with abortable timeout; throws only network/timeout errors.
 * @param {string} url
 * @param {RequestInit} [opts]
 * @param {number} [timeoutMs]
 * @returns {Promise<Response>}
 */
export async function safeFetch(url, opts = {}, timeoutMs = 6500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(url, { ...opts, signal: controller.signal });
    return resp;
  } finally {
    clearTimeout(id);
  }
}

/**
 * PUBLIC_INTERFACE
 * debounce - Returns a debounced version of func.
 * @param {Function} func
 * @param {number} delay
 */
export function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
