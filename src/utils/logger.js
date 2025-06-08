/**
 * Logger Utility
 * Provides environment-aware logging with zero console statements in production
 * This is the ONLY place console methods should exist in the entire codebase
 */

// Vite replaces these at build time
// Using optional chaining to safely access if undefined
const IS_DEV = import.meta.env?.DEV ?? false;
const IS_PROD = import.meta.env?.PROD ?? true;

// Log levels for filtering
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4
};

// Current log level based on environment
const CURRENT_LOG_LEVEL = IS_DEV ? LOG_LEVELS.DEBUG : LOG_LEVELS.ERROR;

/**
 * Format log message with timestamp and level
 * @param {string} level - Log level
 * @param {Array} args - Arguments to log
 * @returns {Array} Formatted arguments
 */
const formatMessage = (level, args) => {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level}]`;
  return [prefix, ...args];
};

/**
 * Send error to tracking service in production
 * @param {Error} error - Error object
 * @param {Object} context - Additional context
 */
const sendToErrorTracking = (error, context = {}) => {
  // In production, this would send to Sentry, LogRocket, etc.
  // For now, we'll store in sessionStorage for debugging
  if (IS_PROD) {
    try {
      const errors = JSON.parse(sessionStorage.getItem('cyft_errors') || '[]');
      errors.push({
        timestamp: new Date().toISOString(),
        message: error.message,
        stack: error.stack,
        context
      });
      sessionStorage.setItem('cyft_errors', JSON.stringify(errors.slice(-50))); // Keep last 50
    } catch (e) {
      // Fail silently - we can't log here!
    }
  }
};

/**
 * Logger object with environment-aware methods
 * In production, only errors are tracked (no console output)
 */
export const logger = {
  /**
   * Debug level logging - development only
   */
  debug: (...args) => {
    if (IS_DEV && CURRENT_LOG_LEVEL <= LOG_LEVELS.DEBUG) {
      console.log(...formatMessage('DEBUG', args));
    }
  },

  /**
   * Info level logging - development only
   */
  info: (...args) => {
    if (IS_DEV && CURRENT_LOG_LEVEL <= LOG_LEVELS.INFO) {
      console.info(...formatMessage('INFO', args));
    }
  },

  /**
   * Warning level logging - development only
   */
  warn: (...args) => {
    if (IS_DEV && CURRENT_LOG_LEVEL <= LOG_LEVELS.WARN) {
      console.warn(...formatMessage('WARN', args));
    }
  },

  /**
   * Error level logging - tracked in production
   */
  error: (...args) => {
    const error = args[0] instanceof Error ? args[0] : new Error(String(args[0]));
    const context = args.slice(1);
    
    if (IS_DEV) {
      console.error(...formatMessage('ERROR', args));
    } else {
      sendToErrorTracking(error, { additional: context });
    }
  },

  /**
   * Performance timing helper
   */
  time: (label) => {
    if (IS_DEV) {
      console.time(label);
    }
  },

  /**
   * End performance timing
   */
  timeEnd: (label) => {
    if (IS_DEV) {
      console.timeEnd(label);
    }
  },

  /**
   * Group related logs - development only
   */
  group: (label) => {
    if (IS_DEV) {
      console.group(label);
    }
  },

  /**
   * End log group
   */
  groupEnd: () => {
    if (IS_DEV) {
      console.groupEnd();
    }
  },

  /**
   * Assert condition - development only
   */
  assert: (condition, ...args) => {
    if (IS_DEV && !condition) {
      console.assert(false, ...formatMessage('ASSERT', args));
    }
  }
};

// Freeze logger to prevent modifications
Object.freeze(logger);

// Export log levels for external configuration
export { LOG_LEVELS, IS_DEV, IS_PROD }; 