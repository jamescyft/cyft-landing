/**
 * Environment Configuration
 * Centralized environment detection and feature flags
 * NO MORE COMMENTED PRODUCTION CODE!
 */

import { logger } from '../utils/logger.js';

// Environment detection using Vite
export const ENV = {
  isDev: import.meta.env?.DEV ?? false,
  isProd: import.meta.env?.PROD ?? false,
  mode: import.meta.env?.MODE ?? 'development',
  
  // API Configuration
  api: {
    baseUrl: import.meta.env?.VITE_API_URL || '/api',
    timeout: 30000,
    retryAttempts: 3
  },
  
  // Feature Flags
  features: {
    analytics: import.meta.env?.VITE_ENABLE_ANALYTICS === 'true',
    errorTracking: import.meta.env?.VITE_ENABLE_ERROR_TRACKING === 'true',
    performanceMonitoring: import.meta.env?.VITE_ENABLE_PERFORMANCE === 'true',
    debugMode: import.meta.env?.VITE_DEBUG_MODE === 'true'
  },
  
  // Third-party service configuration
  services: {
    analytics: {
      gtag: import.meta.env?.VITE_GTAG_ID || '',
      segment: import.meta.env?.VITE_SEGMENT_KEY || ''
    },
    errorTracking: {
      sentry: import.meta.env?.VITE_SENTRY_DSN || '',
      logRocket: import.meta.env?.VITE_LOGROCKET_ID || ''
    }
  }
};

// Freeze to prevent modifications
Object.freeze(ENV);
Object.freeze(ENV.api);
Object.freeze(ENV.features);
Object.freeze(ENV.services);
Object.freeze(ENV.services.analytics);
Object.freeze(ENV.services.errorTracking);

/**
 * Check if a feature is enabled
 * @param {string} feature - Feature name
 * @returns {boolean}
 */
export const isFeatureEnabled = (feature) => {
  return ENV.features[feature] === true;
};

/**
 * Get API endpoint URL
 * @param {string} endpoint - Endpoint path
 * @returns {string} Full URL
 */
export const getApiUrl = (endpoint) => {
  const base = ENV.api.baseUrl.replace(/\/$/, '');
  const path = endpoint.replace(/^\//, '');
  return `${base}/${path}`;
};

/**
 * Environment-aware console logging
 * @param  {...any} args - Arguments to log
 */
export const devLog = (...args) => {
  if (ENV.isDev || ENV.features.debugMode) {
    logger.debug('[DEV]', ...args);
  }
}; 