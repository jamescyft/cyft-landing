/**
 * Main Application Entry Point
 * Initializes all modules and manages application lifecycle
 */

// Import CSS - This ensures proper bundling with Vite
import '../css/main.css';

import { ready, $$, scrollTo } from './utils/dom.js';
import { createFormValidator } from './modules/form-validator.js';
import { createInteractiveDemo } from './modules/interactive-demo.js';
import { createScrollAnimations } from './modules/scroll-animations.js';
import { ERROR_MESSAGES, TIMEOUTS } from '../config/constants.js';
import { logger } from './utils/logger.js';
import { apiService } from '../services/api.service.js';
import { analyticsService } from '../services/analytics.service.js';
import { performanceMonitor } from '../services/performance-monitor.service.js';
import { errorTracker } from '../services/error-tracker.service.js';
import { ENV } from '../config/environment.js';

/**
 * Application Class
 * Simplified controller that delegates to services
 * NO MORE GOD CLASS!
 */
class Application {
  constructor() {
    this.modules = {
      formValidator: null,
      interactiveDemo: null,
      scrollAnimations: null
    };
    
    this.isInitialized = false;
  }
  
  /**
   * Initialize application
   */
  async init() {
    try {
      // Wait for DOM ready
      await this.waitForDOM();
      
      // Initialize modules
      this.initializeModules();
      
      // Setup navigation
      this.setupSmoothScrolling();
      
      // Setup keyboard shortcuts
      this.setupKeyboardShortcuts();
      
      // Mark as initialized
      this.isInitialized = true;
      
      logger.info('Application initialized successfully');
      
      // Track page view
      analyticsService.pageView(window.location.pathname, document.title);
    } catch (error) {
      errorTracker.captureError(error, { phase: 'initialization' });
    }
  }
  
  /**
   * Wait for DOM to be ready
   * @returns {Promise}
   */
  waitForDOM() {
    return new Promise(resolve => {
      ready(resolve);
    });
  }
  
  /**
   * Initialize all modules
   */
  initializeModules() {
    // Initialize scroll animations
    this.initScrollAnimations();
    
    // Initialize form validator
    this.initFormValidator();
    
    // Initialize interactive demo
    this.initInteractiveDemo();
  }
  
  /**
   * Initialize scroll animations
   */
  initScrollAnimations() {
    try {
      this.modules.scrollAnimations = createScrollAnimations({
        animationClass: 'u-animate-fade-in',
        visibleClass: 'is-visible',
        animateOnce: true
      });
      
      // Also animate elements with fade-in class (legacy support)
      const legacyElements = $$('.fade-in');
      if (legacyElements.length > 0) {
        this.modules.scrollAnimations.observeMultiple(legacyElements);
      }
    } catch (error) {
      logger.error('Failed to initialize scroll animations:', error);
    }
  }
  
  /**
   * Initialize form validator
   */
  initFormValidator() {
    try {
      const demoForm = document.getElementById('demo-request-form');
      
      if (demoForm) {
        this.modules.formValidator = createFormValidator(demoForm, {
          validateOnBlur: true,
          validateOnInput: false,
          showInlineErrors: true
        });
        
        // Handle form submission
        demoForm.addEventListener('validSubmit', this.handleFormSubmit.bind(this));
      }
    } catch (error) {
      logger.error('Failed to initialize form validator:', error);
    }
  }
  
  /**
   * Initialize interactive demo
   */
  initInteractiveDemo() {
    try {
      const demoContainer = document.getElementById('demo-container');
      
      if (demoContainer) {
        this.modules.interactiveDemo = createInteractiveDemo('#demo-container');
      }
    } catch (error) {
      logger.error('Failed to initialize interactive demo:', error);
    }
  }
  
  /**
   * Handle form submission
   * @param {CustomEvent} event - Form submit event
   */
  async handleFormSubmit(event) {
    const { formData } = event.detail;
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formSuccess = document.getElementById('form-success');
    
    try {
      // Show loading state
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        submitButton.classList.add('is-loading');
      }
      
      // Submit via API service
      const result = await apiService.submitDemoRequest(formData);
      
      // Show success message
      if (form && formSuccess) {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Scroll to success message
        scrollTo(formSuccess, { block: 'center' });
      }
      
      // Track conversion
      analyticsService.trackConversion('demo_request', {
        company: formData.company,
        techs: formData.techs
      });
      
      // Store in localStorage for persistence
      this.storeDemoRequest(formData);
      
    } catch (error) {
      // Show error message
      if (this.modules.formValidator) {
        this.modules.formValidator.setError('email', ERROR_MESSAGES.formSubmission);
      }
      
      errorTracker.captureError(error, { 
        phase: 'form_submission',
        formData 
      });
    } finally {
      // Reset button state
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Request demo';
        submitButton.classList.remove('is-loading');
      }
    }
  }
  
  /**
   * Store demo request in localStorage
   * @param {Object} formData - Form data
   */
  storeDemoRequest(formData) {
    try {
      const data = {
        ...formData,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('cyft_demo_request', JSON.stringify(data));
    } catch (error) {
      logger.error('Failed to store demo request:', error);
    }
  }
  
  /**
   * Setup smooth scrolling for anchor links
   */
  setupSmoothScrolling() {
    const anchorLinks = $$('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          scrollTo(target, { behavior: 'smooth' });
          
          // Update URL without triggering scroll
          history.pushState(null, null, targetId);
        }
      });
    });
  }
  
  /**
   * Setup keyboard shortcuts
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Press '/' to focus skip link
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        const skipLink = document.querySelector('.skip-to-content');
        if (skipLink) skipLink.focus();
      }
    });
  }
  

  
  /**
   * Destroy application and cleanup
   */
  destroy() {
    // Destroy all modules
    Object.entries(this.modules).forEach(([name, module]) => {
      if (module && typeof module.destroy === 'function') {
        module.destroy();
      }
    });
    
    // Clear references
    this.modules = null;
    this.isInitialized = false;
  }
}

// Initialize application
const app = new Application();
app.init();

// Only expose in development for debugging
if (ENV.isDev && typeof window !== 'undefined') {
  window.__cyftApp = app;
} 