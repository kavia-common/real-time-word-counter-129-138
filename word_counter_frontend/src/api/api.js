import { safeFetch } from "../utils/demoUtils.js";

// A demo API helper for getting a random quote from quotable.io.
// No API key required. Fallback to a local quote on error.

/**
 * PUBLIC_INTERFACE
 * getRandomQuote - Fetches a random quote from quotable.io, with robust error and timeout handling.
 * Returns: { text: string, author: string|null }
 */
export async function getRandomQuote() {
  const demoEndpoint = "https://api.quotable.io/random";
  const fallback = {
    text: "Creativity is intelligence having fun.",
    author: "Albert Einstein"
  };
  try {
    const resp = await safeFetch(demoEndpoint, {}, 5000);
    if (!resp.ok) throw new Error("API returned error");
    const data = await resp.json();
    if (!data.content) throw new Error("Malformed quote data");
    return {
      text: data.content,
      author: data.author || null
    };
  } catch (err) {
    // Fallback: local static quote if failure
    return fallback;
  }
}
