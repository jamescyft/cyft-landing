/**
 * DOM Utility Functions
 * Centralized DOM manipulation helpers with error handling
 */

console.log('[CYFT] dom.js module loading...');

import { logger } from './logger.js';

console.log('[CYFT] dom.js imported logger successfully');

/**
 * Safely query a single DOM element
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {Element|null} Element or null if not found
 */
export const $ = (selector, context = document) => {
  try {
    return context.querySelector(selector);
  } catch (error) {
    logger.error(`Invalid selector: ${selector}`, error);
    return null;
  }
};

/**
 * Safely query multiple DOM elements
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {Element[]} Array of elements
 */
export const $$ = (selector, context = document) => {
  try {
    return Array.from(context.querySelectorAll(selector));
  } catch (error) {
    logger.error(`Invalid selector: ${selector}`, error);
    return [];
  }
};

/**
 * Add event listener with automatic cleanup
 * @param {Element} element - Target element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {Object} options - Event options
 * @returns {Function} Cleanup function
 */
export const on = (element, event, handler, options = {}) => {
  if (!element || !event || !handler) {
    logger.error('Invalid parameters for event listener');
    return () => {};
  }
  
  element.addEventListener(event, handler, options);
  
  // Return cleanup function
  return () => element.removeEventListener(event, handler, options);
};

/**
 * Add multiple event listeners
 * @param {Element} element - Target element
 * @param {Object} events - Event map {event: handler}
 * @returns {Function} Cleanup function
 */
export const onMultiple = (element, events) => {
  const cleanups = Object.entries(events).map(([event, handler]) => 
    on(element, event, handler)
  );
  
  return () => cleanups.forEach(cleanup => cleanup());
};

/**
 * Add class to element
 * @param {Element} element - Target element
 * @param {...string} classes - Classes to add
 */
export const addClass = (element, ...classes) => {
  if (!element) return;
  element.classList.add(...classes);
};

/**
 * Remove class from element
 * @param {Element} element - Target element
 * @param {...string} classes - Classes to remove
 */
export const removeClass = (element, ...classes) => {
  if (!element) return;
  element.classList.remove(...classes);
};

/**
 * Toggle class on element
 * @param {Element} element - Target element
 * @param {string} className - Class to toggle
 * @param {boolean} force - Force add/remove
 */
export const toggleClass = (element, className, force) => {
  if (!element) return;
  element.classList.toggle(className, force);
};

/**
 * Check if element has class
 * @param {Element} element - Target element
 * @param {string} className - Class to check
 * @returns {boolean}
 */
export const hasClass = (element, className) => {
  if (!element) return false;
  return element.classList.contains(className);
};

/**
 * Set element attributes
 * @param {Element} element - Target element
 * @param {Object} attributes - Attribute map
 */
export const setAttributes = (element, attributes) => {
  if (!element) return;
  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      element.setAttribute(key, value);
    }
  });
};

/**
 * Create element with attributes and content
 * @param {string} tag - Tag name
 * @param {Object} options - Element options
 * @returns {Element}
 */
export const createElement = (tag, options = {}) => {
  const element = document.createElement(tag);
  
  if (options.classes) {
    addClass(element, ...options.classes);
  }
  
  if (options.attributes) {
    setAttributes(element, options.attributes);
  }
  
  if (options.text) {
    element.textContent = options.text;
  }
  
  if (options.html) {
    element.innerHTML = options.html;
  }
  
  if (options.children) {
    options.children.forEach(child => element.appendChild(child));
  }
  
  return element;
};

/**
 * Show element
 * @param {Element} element - Target element
 * @param {string} display - Display value
 */
export const show = (element, display = 'block') => {
  if (!element) return;
  element.style.display = display;
};

/**
 * Hide element
 * @param {Element} element - Target element
 */
export const hide = (element) => {
  if (!element) return;
  element.style.display = 'none';
};

/**
 * Get element's offset relative to document
 * @param {Element} element - Target element
 * @returns {Object} {top, left, bottom, right}
 */
export const getOffset = (element) => {
  if (!element) return { top: 0, left: 0, bottom: 0, right: 0 };
  
  const rect = element.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    bottom: rect.bottom + scrollTop,
    right: rect.right + scrollLeft
  };
};

/**
 * Smooth scroll to element
 * @param {Element|string} target - Element or selector
 * @param {Object} options - Scroll options
 */
export const scrollTo = (target, options = {}) => {
  const element = typeof target === 'string' ? $(target) : target;
  
  if (!element) return;
  
  const defaultOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
    ...options
  };
  
  element.scrollIntoView(defaultOptions);
};

/**
 * Wait for DOM ready
 * @param {Function} callback - Callback function
 */
export const ready = (callback) => {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 150) => {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Wait for element to appear in DOM
 * @param {string} selector - CSS selector
 * @param {number} timeout - Timeout in ms
 * @returns {Promise<Element>}
 */
export const waitForElement = (selector, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const element = $(selector);
    
    if (element) {
      return resolve(element);
    }
    
    const observer = new MutationObserver((mutations, obs) => {
      const element = $(selector);
      if (element) {
        obs.disconnect();
        resolve(element);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element ${selector} not found after ${timeout}ms`));
    }, timeout);
  });
}; 