import { useEffect } from 'react';

/**
 * Custom hook to update document title dynamically
 * @param {string} title
 * @param {boolean} [includeBranding=true]
 */
export function useDocumentTitle(title, includeBranding = true) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const baseTitle = 'HOT COOL SHAKE | Luxury Coffee Experience';
    document.title = title ? (includeBranding ? `${title} | HOT COOL SHAKE` : title) : baseTitle;

    return () => {
      document.title = baseTitle;
    };
  }, [title, includeBranding]);
}

export default useDocumentTitle;
