/**
 * Performance Monitor Module
 * Tracks Core Web Vitals and performance metrics
 */

import { logger } from '../../utils/logger.js';

export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      FCP: 0,
      LCP: 0,
      FID: 0,
      CLS: 0,
      TTFB: 0,
      resourceTimings: []
    };
    
    this.observer = null;
  }

  init() {
    // Only run in browsers that support Performance Observer
    if (!('PerformanceObserver' in window)) return;

    this.measureTTFB();
    this.observePaintMetrics();
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeResources();
    
    // Log metrics on page unload
    if ('sendBeacon' in navigator) {
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.reportMetrics();
        }
      });
    }
  }

  measureTTFB() {
    try {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.metrics.TTFB = Math.round(navigation.responseStart - navigation.fetchStart);
        logger.info(`TTFB: ${this.metrics.TTFB}ms`);
      }
    } catch (error) {
      logger.error('Failed to measure TTFB:', error);
    }
  }

  observePaintMetrics() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.FCP = Math.round(entry.startTime);
            logger.info(`FCP: ${this.metrics.FCP}ms`);
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    } catch (error) {
      logger.error('Failed to observe paint metrics:', error);
    }
  }

  observeLCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.LCP = Math.round(lastEntry.startTime);
        logger.info(`LCP: ${this.metrics.LCP}ms`);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      logger.error('Failed to observe LCP:', error);
    }
  }

  observeFID() {
    try {
      const observer = new PerformanceObserver((list) => {
        const firstInput = list.getEntries()[0];
        this.metrics.FID = Math.round(firstInput.processingStart - firstInput.startTime);
        logger.info(`FID: ${this.metrics.FID}ms`);
        observer.disconnect();
      });
      observer.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      logger.error('Failed to observe FID:', error);
    }
  }

  observeCLS() {
    let clsValue = 0;
    let clsEntries = [];
    let sessionValue = 0;
    let sessionEntries = [];

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Only count if no recent input
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            // New session if gap > 1s or duration > 5s
            if (sessionValue && 
                (entry.startTime - lastSessionEntry.startTime > 1000 ||
                 entry.startTime - firstSessionEntry.startTime > 5000)) {
              // Store session if it's the largest
              if (sessionValue > clsValue) {
                clsValue = sessionValue;
                clsEntries = [...sessionEntries];
              }
              sessionValue = entry.value;
              sessionEntries = [entry];
            } else {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            }
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });

      // Report final CLS when page unloads
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          observer.disconnect();
          
          // Check if current session is largest
          if (sessionValue > clsValue) {
            clsValue = sessionValue;
          }
          
          this.metrics.CLS = Math.round(clsValue * 1000) / 1000;
          logger.info(`CLS: ${this.metrics.CLS}`);
        }
      }, { once: true });
    } catch (error) {
      logger.error('Failed to observe CLS:', error);
    }
  }

  observeResources() {
    try {
      // Monitor large resources
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.transferSize > 100000) { // Resources > 100KB
            this.metrics.resourceTimings.push({
              name: entry.name,
              size: Math.round(entry.transferSize / 1024),
              duration: Math.round(entry.duration)
            });
            
            logger.warn(`Large resource detected: ${entry.name} (${Math.round(entry.transferSize / 1024)}KB)`);
          }
        }
      });
      observer.observe({ entryTypes: ['resource'] });
    } catch (error) {
      logger.error('Failed to observe resources:', error);
    }
  }

  reportMetrics() {
    const report = {
      ...this.metrics,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      connection: this.getConnectionInfo()
    };

    logger.info('Performance Report:', report);

    // Check against thresholds
    this.checkThresholds();

    // In production, send to analytics
    if (typeof navigator.sendBeacon === 'function') {
      // navigator.sendBeacon('/api/metrics', JSON.stringify(report));
    }
  }

  getConnectionInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!connection) return null;

    return {
      effectiveType: connection.effectiveType,
      rtt: connection.rtt,
      downlink: connection.downlink,
      saveData: connection.saveData
    };
  }

  checkThresholds() {
    // Core Web Vitals thresholds
    const thresholds = {
      LCP: { good: 2500, needs_improvement: 4000 },
      FID: { good: 100, needs_improvement: 300 },
      CLS: { good: 0.1, needs_improvement: 0.25 }
    };

    // Log warnings for poor metrics
    if (this.metrics.LCP > thresholds.LCP.needs_improvement) {
      logger.error(`Poor LCP: ${this.metrics.LCP}ms (should be < ${thresholds.LCP.good}ms)`);
    } else if (this.metrics.LCP > thresholds.LCP.good) {
      logger.warn(`LCP needs improvement: ${this.metrics.LCP}ms`);
    }

    if (this.metrics.FID > thresholds.FID.needs_improvement) {
      logger.error(`Poor FID: ${this.metrics.FID}ms (should be < ${thresholds.FID.good}ms)`);
    } else if (this.metrics.FID > thresholds.FID.good) {
      logger.warn(`FID needs improvement: ${this.metrics.FID}ms`);
    }

    if (this.metrics.CLS > thresholds.CLS.needs_improvement) {
      logger.error(`Poor CLS: ${this.metrics.CLS} (should be < ${thresholds.CLS.good})`);
    } else if (this.metrics.CLS > thresholds.CLS.good) {
      logger.warn(`CLS needs improvement: ${this.metrics.CLS}`);
    }
  }

  getMetrics() {
    return { ...this.metrics };
  }
}

export const createPerformanceMonitor = () => {
  const monitor = new PerformanceMonitor();
  monitor.init();
  return monitor;
}; 