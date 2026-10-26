/**
 * HOT COOL SHAKE Social Share Card Generator
 */

export async function shareBeverageBlend({ title, description, url = window.location.href }) {
  const shareData = {
    title: `HOT COOL SHAKE | ${title || 'Bespoke Blend'}`,
    text: description || 'Check out my custom crafted beverage from HOT COOL SHAKE!',
    url,
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { method: 'native', success: true };
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.warn('Native share failed:', err);
      }
    }
  }

  // Fallback URLs
  const encodedText = encodeURIComponent(shareData.text);
  const encodedUrl = encodeURIComponent(shareData.url);

  return {
    method: 'fallback',
    urls: {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  };
}
