/**
 * Performance Monitoring Service
 * Tracks Core Web Vitals and custom performance metrics
 * Clean, focused implementation
 */

import { ENV, isFeatureEnabled } from '../config/environment.js';
import { logger } from '../utils/logger.js';
import { analyticsService } from './analytics.service.js';

/**
 * Performance Monitor Class
 * Single responsibility: Track and report performance metrics
 */
export class PerformanceMonitor {
  constructor() {
    this.isEnabled = isFeatureEnabled('performanceMonitoring');
    this.metrics = new Map();
    this.observers = new Map();
    
    if (this.isEnabled) {
      this.initialize();
    }
  }

  /**
   * Initialize performance monitoring
   */
  initialize() {
    try {
      this.observeWebVitals();
      this.observeResourceTiming();
      this.trackPageVisibility();
      logger.debug('Performance monitoring initialized');
    } catch (error) {
      logger.error('Failed to initialize performance monitoring:', error);
    }
  }

  /**
   * Observe Core Web Vitals
   */
  observeWebVitals() {
    if (!('PerformanceObserver' in window)) {
      logger.warn('PerformanceObserver not supported');
      return;
    }

    // Largest Contentful Paint (LCP)
    this.createObserver('lcp', ['largest-contentful-paint'], (entries) => {
      for (const entry of entries) {
        const value = entry.startTime;
        this.recordMetric('lcp', value);
        logger.debug(`LCP: ${value.toFixed(2)}ms`);
      }
    });

    // First Input Delay (FID)
    this.createObserver('fid', ['first-input'], (entries) => {
      for (const entry of entries) {
        const value = entry.processingStart - entry.startTime;
        this.recordMetric('fid', value);
        logger.debug(`FID: ${value.toFixed(2)}ms`);
      }
    });

    // Cumulative Layout Shift (CLS)
    this.createObserver('cls', ['layout-shift'], (entries) => {
      let clsValue = 0;
      for (const entry of entries) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.recordMetric('cls', clsValue);
      logger.debug(`CLS: ${clsValue.toFixed(4)}`);
    });

    // First Contentful Paint (FCP)
    if (window.performance && window.performance.getEntriesByType) {
      const paintEntries = window.performance.getEntriesByType('paint');
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcp) {
        this.recordMetric('fcp', fcp.startTime);
        logger.debug(`FCP: ${fcp.startTime.toFixed(2)}ms`);
      }
    }

    // Time to First Byte (TTFB)
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const ttfb = timing.responseStart - timing.navigationStart;
      this.recordMetric('ttfb', ttfb);
      logger.debug(`TTFB: ${ttfb}ms`);
    }
  }

  /**
   * Create performance observer
   * @param {string} name - Observer name
   * @param {string[]} entryTypes - Entry types to observe
   * @param {Function} callback - Callback function
   */
  createObserver(name, entryTypes, callback) {
    try {
      const observer = new PerformanceObserver(callback);
      observer.observe({ entryTypes });
      this.observers.set(name, observer);
    } catch (error) {
      logger.error(`Failed to create observer ${name}:`, error);
    }
  }

  /**
   * Observe resource timing
   */
  observeResourceTiming() {
    if (!window.performance || !window.performance.getEntriesByType) return;

    // Track initial resources
    const resources = window.performance.getEntriesByType('resource');
    this.processResourceEntries(resources);

    // Observe new resources
    this.createObserver('resource', ['resource'], (entries) => {
      this.processResourceEntries(entries.getEntries());
    });
  }

  /**
   * Process resource timing entries
   * @param {PerformanceResourceTiming[]} entries - Resource entries
   */
  processResourceEntries(entries) {
    const summary = {
      scripts: { count: 0, totalSize: 0, totalDuration: 0 },
      styles: { count: 0, totalSize: 0, totalDuration: 0 },
      images: { count: 0, totalSize: 0, totalDuration: 0 },
      fonts: { count: 0, totalSize: 0, totalDuration: 0 },
      other: { count: 0, totalSize: 0, totalDuration: 0 }
    };

    entries.forEach(entry => {
      const type = this.getResourceType(entry);
      summary[type].count++;
      summary[type].totalSize += entry.transferSize || 0;
      summary[type].totalDuration += entry.duration || 0;
    });

    this.metrics.set('resources', summary);
  }

  /**
   * Get resource type from entry
   * @param {PerformanceResourceTiming} entry - Resource entry
   * @returns {string} Resource type
   */
  getResourceType(entry) {
    const url = entry.name;
    if (url.match(/\.(js|mjs)$/i)) return 'scripts';
    if (url.match(/\.(css)$/i)) return 'styles';
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'images';
    if (url.match(/\.(woff|woff2|ttf|otf)$/i)) return 'fonts';
    return 'other';
  }

  /**
   * Track page visibility
   */
  trackPageVisibility() {
    let startTime = Date.now();
    let totalVisibleTime = 0;

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        totalVisibleTime += Date.now() - startTime;
        this.recordMetric('timeOnPage', totalVisibleTime);
        analyticsService.track('engagement', {
          metric: 'time_on_page',
          value: totalVisibleTime
        });
      } else {
        startTime = Date.now();
      }
    });

    // Track before unload
    window.addEventListener('beforeunload', () => {
      if (!document.hidden) {
        totalVisibleTime += Date.now() - startTime;
        this.recordMetric('totalTimeOnPage', totalVisibleTime);
        analyticsService.track('engagement', {
          metric: 'total_time_on_page',
          value: totalVisibleTime
        });
      }
    });
  }

  /**
   * Record a performance metric
   * @param {string} name - Metric name
   * @param {number} value - Metric value
   */
  recordMetric(name, value) {
    this.metrics.set(name, value);
    
    // Send to analytics
    analyticsService.timing('performance', name, value);
  }

  /**
   * Mark performance timing start
   * @param {string} name - Mark name
   */
  mark(name) {
    if (window.performance && window.performance.mark) {
      window.performance.mark(name);
    }
  }

  /**
   * Measure performance between marks
   * @param {string} name - Measure name
   * @param {string} startMark - Start mark
   * @param {string} endMark - End mark (optional)
   */
  measure(name, startMark, endMark) {
    if (window.performance && window.performance.measure) {
      try {
        window.performance.measure(name, startMark, endMark);
        const measure = window.performance.getEntriesByName(name, 'measure')[0];
        if (measure) {
          this.recordMetric(name, measure.duration);
        }
      } catch (error) {
        logger.error('Performance measure failed:', error);
      }
    }
  }

  /**
   * Get all recorded metrics
   * @returns {Object} Metrics object
   */
  getMetrics() {
    const metrics = {};
    this.metrics.forEach((value, key) => {
      metrics[key] = value;
    });
    return metrics;
  }

  /**
   * Get specific metric
   * @param {string} name - Metric name
   * @returns {any} Metric value
   */
  getMetric(name) {
    return this.metrics.get(name);
  }

  /**
   * Clear all metrics
   */
  clearMetrics() {
    this.metrics.clear();
  }

  /**
   * Destroy performance monitor
   */
  destroy() {
    // Disconnect all observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    
    // Clear metrics
    this.clearMetrics();
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Export convenience methods
export const recordMetric = (name, value) => performanceMonitor.recordMetric(name, value);
export const mark = (name) => performanceMonitor.mark(name);
export const measure = (name, startMark, endMark) => performanceMonitor.measure(name, startMark, endMark);
export const getMetrics = () => performanceMonitor.getMetrics(); 