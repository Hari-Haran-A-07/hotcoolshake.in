/**
 * Resilient Local Storage Cache Engine with TTL Expiration & Memory Fallback
 * HOT COOL SHAKE Offline & Performance Acceleration
 */

const memoryFallback = new Map();

export class StorageCache {
  static set(key, value, ttlSeconds = 3600) {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    const payload = JSON.stringify({ value, expiresAt });

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(`hcs_cache_${key}`, payload);
        return true;
      }
    } catch (e) {
      // Storage quota exceeded or disabled
      console.warn('[StorageCache]: Falling back to in-memory store', e);
    }

    memoryFallback.set(key, { value, expiresAt });
    return true;
  }

  static get(key, defaultValue = null) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = localStorage.getItem(`hcs_cache_${key}`);
        if (item) {
          const parsed = JSON.parse(item);
          if (Date.now() < parsed.expiresAt) {
            return parsed.value;
          }
          // Expired
          localStorage.removeItem(`hcs_cache_${key}`);
        }
      }
    } catch {
      // JSON parse error or access denied
    }

    // Check memory fallback
    if (memoryFallback.has(key)) {
      const entry = memoryFallback.get(key);
      if (Date.now() < entry.expiresAt) {
        return entry.value;
      }
      memoryFallback.delete(key);
    }

    return defaultValue;
  }

  static remove(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(`hcs_cache_${key}`);
      }
    } catch {}
    memoryFallback.delete(key);
  }

  static clear() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith('hcs_cache_')) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));
      }
    } catch {}
    memoryFallback.clear();
  }
}

export default StorageCache;
