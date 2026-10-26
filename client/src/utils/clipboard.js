/**
 * HOT COOL SHAKE Clipboard Utility
 * Copies text securely to clipboard with fallback and optional feedback trigger.
 */
export async function copyToClipboard(text, feedbackMessage = 'Copied to clipboard!') {
  if (!text) return false;

  let success = false;
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      success = true;
    } catch {
      success = false;
    }
  }

  // Fallback for legacy environments
  if (!success && typeof document !== 'undefined') {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      success = document.execCommand('copy');
      textArea.remove();
    } catch {
      success = false;
    }
  }

  if (success && typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('hcs_toast', {
        detail: {
          title: 'Copied!',
          message: feedbackMessage,
          type: 'success',
        },
      })
    );
  }

  return success;
}
