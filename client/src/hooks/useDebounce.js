import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce any value (e.g., search term, form input)
 * @template T
 * @param {T} value
 * @param {number} delay Delay in milliseconds
 * @returns {T}
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
