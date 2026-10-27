/**
 * Web Share API Wrapper with Clipboard Fallback
 * HOT COOL SHAKE International Coffee Experience
 */

/**
 * Share content using native share dialog if supported, otherwise copy to clipboard
 * @param {{ title: string, text?: string, url?: string }} shareData
 * @returns {Promise<{ shared: boolean, copied: boolean, error?: string }>}
 */
export async function shareContent(shareData) {
  const { title, text, url } = shareData;
  const shareUrl = url || window.location.href;
  const sharePayload = { title, text, url: shareUrl };

  // Attempt Web Share API first
  if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(sharePayload)) {
    try {
      await navigator.share(sharePayload);
      return { shared: true, copied: false };
    } catch (err) {
      if (err.name === 'AbortError') {
        return { shared: false, copied: false };
      }
      // Fallback on share error
    }
  }

  // Fallback to Clipboard API
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      const copyPayload = [title, text, shareUrl].filter(Boolean).join('\n');
      await navigator.clipboard.writeText(copyPayload);
      return { shared: false, copied: true };
    } catch (copyErr) {
      return { shared: false, copied: false, error: copyErr.message };
    }
  }

  return { shared: false, copied: false, error: 'Sharing not supported on this device' };
}

/**
 * Quick helper to share a custom coffee recipe link
 * @param {string} recipeId
 * @param {string} recipeName
 * @returns {Promise<{ shared: boolean, copied: boolean }>}
 */
export async function shareCustomRecipe(recipeId, recipeName) {
  const url = `${window.location.origin}/make-your-coffee?recipe=${encodeURIComponent(recipeId)}`;
  return shareContent({
    title: `Check out my custom blend: ${recipeName}!`,
    text: `Crafted at HOT COOL SHAKE International Coffee Studio. Try it here:`,
    url
  });
}
