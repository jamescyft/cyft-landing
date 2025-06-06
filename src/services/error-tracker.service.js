/**
 * Error Tracking Service
 * Handles error capture, logging, and reporting
 * Clean implementation with environment awareness
 */

import { ENV, isFeatureEnabled } from '../config/environment.js';
import { logger } from '../utils/logger.js';
import { analyticsService } from './analytics.service.js';

/**
 * Error Tracker Class
 * Single responsibility: Track and report errors
 */
export class ErrorTracker {
  constructor() {
    this.isEnabled = isFeatureEnabled('errorTracking');
    this.errorQueue = [];
    this.isInitialized = false;
    this.maxQueueSize = 50;
    
    if (this.isEnabled) {
      this.initialize();
    }
  }

  /**
   * Initialize error tracking
   */
  initialize() {
    if (this.isInitialized) return;

    try {
      // Setup global error handlers
      this.setupGlobalHandlers();
      
      // Initialize Sentry if available
      if (ENV.services.errorTracking.sentry && window.Sentry) {
        window.Sentry.init({
          dsn: ENV.services.errorTracking.sentry,
          environment: ENV.mode,
          beforeSend: (event) => this.beforeSend(event)
        });
        logger.debug('Sentry error tracking initialized');
      }

      // Initialize LogRocket if available
      if (ENV.services.errorTracking.logRocket && window.LogRocket) {
        window.LogRocket.init(ENV.services.errorTracking.logRocket);
        logger.debug('LogRocket error tracking initialized');
      }

      this.isInitialized = true;
      
      // Process queued errors
      this.processQueue();
    } catch (error) {
      logger.error('Failed to initialize error tracking:', error);
    }
  }

  /**
   * Setup global error handlers
   */
  setupGlobalHandlers() {
    // Handle unhandled errors
    window.addEventListener('error', (event) => {
      this.captureError(event.error || new Error(event.message), {
        type: 'unhandledError',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError(new Error(event.reason), {
        type: 'unhandledRejection',
        promise: event.promise
      });
      event.preventDefault();
    });
  }

  /**
   * Capture and track an error
   * @param {Error} error - Error object
   * @param {Object} context - Additional context
   */
  captureError(error, context = {}) {
    // Always log to our logger
    logger.error(error.message, error, context);

    if (!this.isEnabled) return;

    // Add to queue if not initialized
    if (!this.isInitialized) {
      this.addToQueue({ error, context });
      return;
    }

    try {
      // Send to Sentry
      if (window.Sentry) {
        window.Sentry.captureException(error, {
          contexts: { custom: context }
        });
      }

      // Send to LogRocket
      if (window.LogRocket) {
        window.LogRocket.captureException(error);
      }

      // Track in analytics
      analyticsService.trackError(error, context);

      // Store in session for debugging
      this.storeError(error, context);
    } catch (trackingError) {
      logger.error('Failed to track error:', trackingError);
    }
  }

  /**
   * Capture a message (non-error)
   * @param {string} message - Message to capture
   * @param {string} level - Severity level
   * @param {Object} context - Additional context
   */
  captureMessage(message, level = 'info', context = {}) {
    logger[level](message, context);

    if (!this.isEnabled || !this.isInitialized) return;

    try {
      if (window.Sentry) {
        window.Sentry.captureMessage(message, level);
      }

      if (window.LogRocket && level === 'error') {
        window.LogRocket.captureMessage(message);
      }
    } catch (error) {
      logger.error('Failed to capture message:', error);
    }
  }

  /**
   * Set user context for error tracking
   * @param {Object} user - User information
   */
  setUserContext(user) {
    if (!this.isEnabled || !this.isInitialized) return;

    try {
      if (window.Sentry) {
        window.Sentry.setUser(user);
      }

      if (window.LogRocket) {
        window.LogRocket.identify(user.id, user);
      }
    } catch (error) {
      logger.error('Failed to set user context:', error);
    }
  }

  /**
   * Set additional context
   * @param {string} key - Context key
   * @param {Object} context - Context data
   */
  setContext(key, context) {
    if (!this.isEnabled || !this.isInitialized) return;

    try {
      if (window.Sentry) {
        window.Sentry.setContext(key, context);
      }
    } catch (error) {
      logger.error('Failed to set context:', error);
    }
  }

  /**
   * Add breadcrumb for debugging
   * @param {Object} breadcrumb - Breadcrumb data
   */
  addBreadcrumb(breadcrumb) {
    if (!this.isEnabled || !this.isInitialized) return;

    try {
      if (window.Sentry) {
        window.Sentry.addBreadcrumb(breadcrumb);
      }
    } catch (error) {
      logger.error('Failed to add breadcrumb:', error);
    }
  }

  /**
   * Before send hook for Sentry
   * @param {Object} event - Sentry event
   * @returns {Object|null} Modified event or null to drop
   */
  beforeSend(event) {
    // Filter out certain errors
    if (event.exception && event.exception.values) {
      const error = event.exception.values[0];
      
      // Filter out common non-critical errors
      if (error.value && (
        error.value.includes('ResizeObserver loop limit exceeded') ||
        error.value.includes('Non-Error promise rejection captured')
      )) {
        return null;
      }
    }

    return event;
  }

  /**
   * Add error to queue
   * @param {Object} errorData - Error data
   */
  addToQueue(errorData) {
    this.errorQueue.push({
      ...errorData,
      timestamp: new Date().toISOString()
    });

    // Limit queue size
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }
  }

  /**
   * Process queued errors
   */
  processQueue() {
    while (this.errorQueue.length > 0) {
      const { error, context } = this.errorQueue.shift();
      this.captureError(error, context);
    }
  }

  /**
   * Store error in session storage
   * @param {Error} error - Error object
   * @param {Object} context - Additional context
   */
  storeError(error, context) {
    try {
      const errors = JSON.parse(sessionStorage.getItem('cyft_errors') || '[]');
      errors.push({
        timestamp: new Date().toISOString(),
        message: error.message,
        stack: error.stack,
        context
      });
      
      // Keep only last 50 errors
      sessionStorage.setItem('cyft_errors', JSON.stringify(errors.slice(-50)));
    } catch (e) {
      // Fail silently
    }
  }

  /**
   * Get stored errors from session
   * @returns {Array} Stored errors
   */
  getStoredErrors() {
    try {
      return JSON.parse(sessionStorage.getItem('cyft_errors') || '[]');
    } catch (e) {
      return [];
    }
  }

  /**
   * Clear stored errors
   */
  clearStoredErrors() {
    try {
      sessionStorage.removeItem('cyft_errors');
    } catch (e) {
      // Fail silently
    }
  }

  /**
   * Test error tracking
   */
  test() {
    this.captureError(new Error('Test error from ErrorTracker'), {
      test: true,
      timestamp: new Date().toISOString()
    });
  }
}

// Create singleton instance
export const errorTracker = new ErrorTracker();

// Export convenience methods
export const captureError = (error, context) => errorTracker.captureError(error, context);
export const captureMessage = (message, level, context) => errorTracker.captureMessage(message, level, context);
export const setUserContext = (user) => errorTracker.setUserContext(user);
export const addBreadcrumb = (breadcrumb) => errorTracker.addBreadcrumb(breadcrumb); 