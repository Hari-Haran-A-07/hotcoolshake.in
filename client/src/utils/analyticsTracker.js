/**
 * Lightweight Privacy-Friendly In-Browser Analytics Tracker
 * HOT COOL SHAKE International Coffee Experience
 */

const STORAGE_KEY = 'hcs_analytics_queue';
const MAX_QUEUE_SIZE = 50;

/**
 * Dispatch an analytics event
 * @param {string} eventName
 * @param {Record<string, any>} [properties]
 */
export function trackEvent(eventName, properties = {}) {
  try {
    const event = {
      event: eventName,
      properties,
      timestamp: new Date().toISOString(),
      url: window.location.pathname
    };

    // Store in session storage queue
    const existingRaw = sessionStorage.getItem(STORAGE_KEY);
    const queue = existingRaw ? JSON.parse(existingRaw) : [];
    queue.push(event);

    if (queue.length > MAX_QUEUE_SIZE) {
      queue.shift();
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(queue));

    if (process.env.NODE_ENV === 'development') {
      console.debug('[Analytics Tracked]', eventName, properties);
    }
  } catch {
    // Fail silently to prevent disrupting user experience
  }
}

/**
 * Retrieve queued analytics events
 * @returns {Array<object>}
 */
export function getQueuedEvents() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Clear queued events
 */
export function clearAnalyticsQueue() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Fail silently
  }
}
