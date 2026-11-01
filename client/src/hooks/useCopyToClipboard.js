import { useState, useCallback } from 'react';

/**
 * Custom hook for copying text to clipboard with automatic reset timer
 * @param {number} [resetTimeout=2000] - Duration in ms before copied state resets
 * @returns {{
 *   copy: (text: string) => Promise<boolean>,
 *   isCopied: boolean,
 *   error: Error | null,
 *   reset: () => void
 * }}
 */
export function useCopyToClipboard(resetTimeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);

  const reset = useCallback(() => {
    setIsCopied(false);
    setError(null);
  }, []);

  const copy = useCallback(
    async (text) => {
      if (typeof window === 'undefined') {
        return false;
      }

      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers or non-secure contexts
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          textarea.style.pointerEvents = 'none';
          document.body.appendChild(textarea);
          textarea.select();
          const successful = document.execCommand('copy');
          document.body.removeChild(textarea);
          if (!successful) {
            throw new Error('Clipboard copy command was unsuccessful');
          }
        }

        setIsCopied(true);
        setError(null);

        if (resetTimeout > 0) {
          setTimeout(() => {
            setIsCopied(false);
          }, resetTimeout);
        }

        return true;
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsCopied(false);
        return false;
      }
    },
    [resetTimeout]
  );

  return { copy, isCopied, error, reset };
}

export default useCopyToClipboard;
