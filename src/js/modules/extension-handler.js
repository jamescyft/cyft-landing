/**
 * Chrome Extension Handler Module
 * Handles Chrome extension communication errors gracefully
 * Prevents "Unchecked runtime.lastError" messages
 */

import { logger } from '../../utils/logger.js';

export class ExtensionHandler {
  constructor() {
    this.extensionErrors = [];
    this.isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  }

  init() {
    if (!this.isChrome) return;

    // Override chrome runtime if it exists
    this.wrapChromeRuntime();
    
    // Handle message port errors
    this.handleMessagePortErrors();
    
    // Monitor for extension injection attempts
    this.monitorExtensionActivity();
  }

  /**
   * Wrap chrome.runtime to catch errors
   */
  wrapChromeRuntime() {
    // Check if chrome runtime exists (from extensions)
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      const originalSendMessage = chrome.runtime.sendMessage;
      
      // Wrap sendMessage to handle errors
      if (originalSendMessage) {
        chrome.runtime.sendMessage = (...args) => {
          try {
            return originalSendMessage.apply(chrome.runtime, args);
          } catch (error) {
            logger.debug('Chrome extension communication blocked:', error);
            return undefined;
          }
        };
      }

      // Handle lastError checks
      const lastErrorHandler = {
        get: function(target, prop) {
          if (prop === 'lastError') {
            const error = target.lastError;
            if (error) {
              logger.debug('Chrome runtime error handled:', error.message);
            }
            return error;
          }
          return target[prop];
        }
      };

      try {
        chrome.runtime = new Proxy(chrome.runtime, lastErrorHandler);
      } catch (e) {
        // Proxy might fail in some environments
        logger.debug('Could not proxy chrome.runtime');
      }
    }
  }

  /**
   * Handle message port errors specifically
   */
  handleMessagePortErrors() {
    // Listen for unhandled port messages
    window.addEventListener('message', (event) => {
      // Check if it's from an extension
      if (event.source === window && event.data && event.data.type) {
        if (event.data.type.includes('extension') || 
            event.data.type.includes('chrome') ||
            event.data.type.includes('PORT')) {
          // Log and suppress
          logger.debug('Extension message intercepted:', event.data.type);
          event.stopImmediatePropagation();
        }
      }
    }, true); // Use capture phase
  }

  /**
   * Monitor for extension activity
   */
  monitorExtensionActivity() {
    // Create a MutationObserver to watch for extension-injected elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            // Check for common extension attributes
            if (node.hasAttribute && (
              node.hasAttribute('data-extension') ||
              node.classList?.contains('extension') ||
              node.id?.includes('extension'))) {
              logger.debug('Extension element detected:', node.id || node.className);
            }
          }
        });
      });
    });

    // Start observing
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });

    // Stop observing after initial page load to prevent performance impact
    window.addEventListener('load', () => {
      setTimeout(() => {
        observer.disconnect();
        logger.debug('Extension monitoring stopped');
      }, 5000);
    });
  }

  /**
   * Check if specific extensions are present
   */
  detectCommonExtensions() {
    const commonExtensions = {
      react: window.__REACT_DEVTOOLS_GLOBAL_HOOK__,
      vue: window.__VUE_DEVTOOLS_GLOBAL_HOOK__,
      redux: window.__REDUX_DEVTOOLS_EXTENSION__,
      // Add more as needed
    };

    const detected = [];
    for (const [name, global] of Object.entries(commonExtensions)) {
      if (global) {
        detected.push(name);
      }
    }

    if (detected.length > 0) {
      logger.debug('Dev tools detected:', detected.join(', '));
    }

    return detected;
  }
}

// Export singleton instance
export const extensionHandler = new ExtensionHandler();

// Export factory function
export const createExtensionHandler = () => {
  extensionHandler.init();
  return extensionHandler;
}; 