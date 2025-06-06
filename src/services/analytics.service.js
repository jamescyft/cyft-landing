/**
 * Analytics Service
 * Handles all analytics tracking with environment awareness
 * Clean implementation with NO commented code!
 */

import { ENV, isFeatureEnabled } from '../config/environment.js';
import { logger } from '../utils/logger.js';

/**
 * Analytics Service Class
 * Single responsibility: Handle analytics tracking
 */
export class AnalyticsService {
  constructor() {
    this.isEnabled = isFeatureEnabled('analytics');
    this.queue = [];
    this.isInitialized = false;
    
    if (this.isEnabled) {
      this.initialize();
    }
  }

  /**
   * Initialize analytics services
   */
  initialize() {
    if (this.isInitialized) return;

    try {
      // Initialize Google Analytics if available
      if (ENV.services.analytics.gtag && window.gtag) {
        window.gtag('config', ENV.services.analytics.gtag);
        logger.debug('Google Analytics initialized');
      }

      // Initialize Segment if available
      if (ENV.services.analytics.segment && window.analytics) {
        window.analytics.load(ENV.services.analytics.segment);
        logger.debug('Segment Analytics initialized');
      }

      this.isInitialized = true;
      
      // Process queued events
      this.processQueue();
    } catch (error) {
      logger.error('Failed to initialize analytics:', error);
    }
  }

  /**
   * Track event
   * @param {string} eventName - Event name
   * @param {Object} eventData - Event properties
   */
  track(eventName, eventData = {}) {
    logger.debug('Analytics Event:', eventName, eventData);

    if (!this.isEnabled) return;

    // Queue event if not initialized
    if (!this.isInitialized) {
      this.queue.push({ eventName, eventData });
      return;
    }

    try {
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', eventName, eventData);
      }

      // Segment
      if (window.analytics && window.analytics.track) {
        window.analytics.track(eventName, eventData);
      }
    } catch (error) {
      logger.error('Failed to track event:', error);
    }
  }

  /**
   * Track page view
   * @param {string} pagePath - Page path
   * @param {string} pageTitle - Page title
   */
  pageView(pagePath, pageTitle) {
    this.track('page_view', {
      page_path: pagePath,
      page_title: pageTitle
    });
  }

  /**
   * Track user identification
   * @param {string} userId - User ID
   * @param {Object} traits - User traits
   */
  identify(userId, traits = {}) {
    if (!this.isEnabled || !this.isInitialized) return;

    try {
      if (window.analytics && window.analytics.identify) {
        window.analytics.identify(userId, traits);
      }
    } catch (error) {
      logger.error('Failed to identify user:', error);
    }
  }

  /**
   * Track timing events
   * @param {string} category - Timing category
   * @param {string} variable - Timing variable
   * @param {number} value - Time in milliseconds
   * @param {string} label - Optional label
   */
  timing(category, variable, value, label) {
    this.track('timing_complete', {
      event_category: category,
      name: variable,
      value: Math.round(value),
      event_label: label
    });
  }

  /**
   * Track errors
   * @param {Error} error - Error object
   * @param {Object} context - Additional context
   */
  trackError(error, context = {}) {
    this.track('error', {
      error_message: error.message,
      error_stack: error.stack,
      ...context
    });
  }

  /**
   * Track conversion events
   * @param {string} conversionType - Type of conversion
   * @param {Object} data - Conversion data
   */
  trackConversion(conversionType, data = {}) {
    this.track(`conversion_${conversionType}`, {
      conversion_type: conversionType,
      ...data
    });
  }

  /**
   * Process queued events
   */
  processQueue() {
    while (this.queue.length > 0) {
      const { eventName, eventData } = this.queue.shift();
      this.track(eventName, eventData);
    }
  }

  /**
   * Custom dimension setter (Google Analytics)
   * @param {number} index - Dimension index
   * @param {string} value - Dimension value
   */
  setCustomDimension(index, value) {
    if (!this.isEnabled || !window.gtag) return;

    window.gtag('config', ENV.services.analytics.gtag, {
      custom_map: { [`dimension${index}`]: value }
    });
  }

  /**
   * Set user properties
   * @param {Object} properties - User properties
   */
  setUserProperties(properties) {
    if (!this.isEnabled) return;

    try {
      if (window.gtag) {
        window.gtag('set', { user_properties: properties });
      }

      if (window.analytics && window.analytics.identify) {
        window.analytics.identify(properties);
      }
    } catch (error) {
      logger.error('Failed to set user properties:', error);
    }
  }
}

// Create singleton instance
export const analyticsService = new AnalyticsService();

// Export convenience methods
export const track = (eventName, eventData) => analyticsService.track(eventName, eventData);
export const pageView = (pagePath, pageTitle) => analyticsService.pageView(pagePath, pageTitle);
export const timing = (category, variable, value, label) => analyticsService.timing(category, variable, value, label);
export const trackError = (error, context) => analyticsService.trackError(error, context);
export const trackConversion = (type, data) => analyticsService.trackConversion(type, data); 