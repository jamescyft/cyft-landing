/**
 * Simple logger utility for development
 * In production, logs are disabled unless explicitly enabled
 */

const isDevelopment = import.meta.env?.MODE === 'development' || 
                     window.location.hostname === 'localhost';

export const logger = {
  info: (...args) => {
    if (isDevelopment) {
      console.info('[Cyft]', ...args);
    }
  },
  
  error: (...args) => {
    // Always log errors
    console.error('[Cyft Error]', ...args);
  },
  
  warn: (...args) => {
    if (isDevelopment) {
      console.warn('[Cyft Warning]', ...args);
    }
  },
  
  debug: (...args) => {
    if (isDevelopment) {
      console.debug('[Cyft Debug]', ...args);
    }
  }
}; 