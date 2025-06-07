/**
 * Scroll Animations Module
 * Handles all scroll-triggered animations with Intersection Observer
 */

import { PERFORMANCE } from '../../config/constants.js';
import { $$, addClass, removeClass } from '../../utils/dom.js';
import { logger } from '../../utils/logger.js';

/**
 * ScrollAnimations Class
 * Manages scroll-based animations efficiently
 */
export class ScrollAnimations {
  constructor(options = {}) {
    this.options = {
      animationClass: 'u-animate-fade-in',
      visibleClass: 'is-visible',
      threshold: PERFORMANCE.intersectionThreshold,
      rootMargin: PERFORMANCE.intersectionRootMargin,
      animateOnce: true,
      delay: 0,
      ...options
    };
    
    this.observer = null;
    this.elements = new Map();
    this.init();
  }
  
  /**
   * Initialize scroll animations
   */
  init() {
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
      logger.warn('IntersectionObserver not supported, falling back to immediate animation');
      this.fallback();
      return;
    }
    
    // Create observer
    this.createObserver();
    
    // Find and observe elements
    this.observeElements();
  }
  
  /**
   * Create Intersection Observer instance
   */
  createObserver() {
    const observerOptions = {
      threshold: this.options.threshold,
      rootMargin: this.options.rootMargin
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      observerOptions
    );
  }
  
  /**
   * Handle intersection changes
   * @param {IntersectionObserverEntry[]} entries - Observer entries
   */
  handleIntersection(entries) {
    entries.forEach(entry => {
      const element = entry.target;
      const config = this.elements.get(element);
      
      if (!config) return;
      
      if (entry.isIntersecting) {
        // Apply delay if specified
        const delay = config.delay || this.options.delay;
        
        if (delay > 0) {
          config.timeout = setTimeout(() => {
            this.animateElement(element, config);
          }, delay);
        } else {
          this.animateElement(element, config);
        }
        
        // Unobserve if animating once
        if (this.options.animateOnce) {
          this.observer.unobserve(element);
          this.elements.delete(element);
        }
      } else if (!this.options.animateOnce) {
        // Reset animation if not animating once
        this.resetElement(element, config);
      }
    });
  }
  
  /**
   * Animate element
   * @param {Element} element - Element to animate
   * @param {Object} config - Animation configuration
   */
  animateElement(element, config) {
    addClass(element, config.visibleClass);
    
    // Trigger custom event
    const event = new CustomEvent('scrollAnimationStart', {
      detail: { element, config },
      bubbles: true
    });
    element.dispatchEvent(event);
    
    // Handle animation end
    if (config.onAnimate) {
      config.onAnimate(element);
    }
  }
  
  /**
   * Reset element animation
   * @param {Element} element - Element to reset
   * @param {Object} config - Animation configuration
   */
  resetElement(element, config) {
    removeClass(element, config.visibleClass);
    
    // Clear any pending timeout
    if (config.timeout) {
      clearTimeout(config.timeout);
      config.timeout = null;
    }
    
    // Trigger custom event
    const event = new CustomEvent('scrollAnimationReset', {
      detail: { element, config },
      bubbles: true
    });
    element.dispatchEvent(event);
  }
  
  /**
   * Find and observe elements
   */
  observeElements() {
    const selector = `.${this.options.animationClass}`;
    const elements = $$(selector);
    
    elements.forEach(element => {
      this.observe(element);
    });
  }
  
  /**
   * Observe a single element
   * @param {Element} element - Element to observe
   * @param {Object} config - Custom configuration
   */
  observe(element, config = {}) {
    if (!element || !this.observer) return;
    
    const elementConfig = {
      animationClass: this.options.animationClass,
      visibleClass: this.options.visibleClass,
      delay: parseInt(element.dataset.animationDelay) || config.delay || 0,
      onAnimate: config.onAnimate,
      ...config
    };
    
    this.elements.set(element, elementConfig);
    this.observer.observe(element);
  }
  
  /**
   * Unobserve element
   * @param {Element} element - Element to unobserve
   */
  unobserve(element) {
    if (!element || !this.observer) return;
    
    this.observer.unobserve(element);
    
    // Clear any pending timeout
    const config = this.elements.get(element);
    if (config && config.timeout) {
      clearTimeout(config.timeout);
    }
    
    this.elements.delete(element);
  }
  
  /**
   * Observe multiple elements
   * @param {Element[]|NodeList|string} elements - Elements or selector
   * @param {Object} config - Custom configuration
   */
  observeMultiple(elements, config = {}) {
    const els = typeof elements === 'string' ? $$(elements) : Array.from(elements);
    els.forEach(element => this.observe(element, config));
  }
  
  /**
   * Refresh observations (useful after DOM changes)
   */
  refresh() {
    // Unobserve all current elements
    this.elements.forEach((config, element) => {
      this.observer.unobserve(element);
    });
    
    // Clear elements map
    this.elements.clear();
    
    // Re-observe elements
    this.observeElements();
  }
  
  /**
   * Fallback for browsers without IntersectionObserver
   */
  fallback() {
    const selector = `.${this.options.animationClass}`;
    const elements = $$(selector);
    
    // Immediately show all elements
    elements.forEach(element => {
      addClass(element, this.options.visibleClass);
    });
  }
  
  /**
   * Check if element is in viewport (utility method)
   * @param {Element} element - Element to check
   * @returns {boolean}
   */
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0 &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right >= 0
    );
  }
  
  /**
   * Pause animations
   */
  pause() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  
  /**
   * Resume animations
   */
  resume() {
    if (this.observer) {
      this.elements.forEach((config, element) => {
        this.observer.observe(element);
      });
    }
  }
  
  /**
   * Destroy scroll animations
   */
  destroy() {
    // Clear all timeouts
    this.elements.forEach(config => {
      if (config.timeout) {
        clearTimeout(config.timeout);
      }
    });
    
    // Disconnect observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    
    // Clear elements map
    this.elements.clear();
  }
}

/**
 * Factory function to create scroll animations
 * @param {Object} options - Configuration options
 * @returns {ScrollAnimations}
 */
export const createScrollAnimations = (options = {}) => {
  return new ScrollAnimations(options);
};

/**
 * Utility function for one-off scroll animations
 * @param {string|Element|Element[]} elements - Elements to animate
 * @param {Object} options - Animation options
 * @returns {ScrollAnimations}
 */
export const animateOnScroll = (elements, options = {}) => {
  const animator = new ScrollAnimations(options);
  
  if (typeof elements === 'string') {
    const els = $$(elements);
    els.forEach(el => animator.observe(el, options));
  } else if (elements instanceof Element) {
    animator.observe(elements, options);
  } else if (Array.isArray(elements) || elements instanceof NodeList) {
    Array.from(elements).forEach(el => animator.observe(el, options));
  }
  
  return animator;
}; 