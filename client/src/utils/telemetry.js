/**
 * Client-Side Performance & Telemetry Observer
 * HOT COOL SHAKE Aero-Grid™ Telemetry Engine
 */

export const initTelemetryObserver = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  const telemetryData = {
    fcp: null,
    lcp: null,
    cls: 0,
    navigationTiming: null,
  };

  try {
    // 1. First Contentful Paint (FCP)
    const paintObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          telemetryData.fcp = Math.round(entry.startTime);
        }
      }
    });
    paintObserver.observe({ type: 'paint', buffered: true });

    // 2. Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        telemetryData.lcp = Math.round(lastEntry.startTime);
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // 3. Cumulative Layout Shift (CLS)
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          telemetryData.cls += entry.value;
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // Log telemetry metrics when user finishes navigation
    window.addEventListener('load', () => {
      const navEntry = performance.getEntriesByType('navigation')[0];
      if (navEntry) {
        telemetryData.navigationTiming = {
          dns: Math.round(navEntry.domainLookupEnd - navEntry.domainLookupStart),
          tcp: Math.round(navEntry.connectEnd - navEntry.connectStart),
          ttfb: Math.round(navEntry.responseStart - navEntry.requestStart),
          domComplete: Math.round(navEntry.domComplete),
        };
      }
    });
  } catch (e) {
    // Graceful degradation on unsupported browser engines
    console.debug('[Telemetry Observer]: Silently skipped on this platform');
  }

  return telemetryData;
};

export default initTelemetryObserver;
