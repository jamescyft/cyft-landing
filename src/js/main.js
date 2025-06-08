/**
 * Main Application Entry Point
 * Initializes all modules and manages application lifecycle
 */

// Import CSS - This ensures proper bundling with Vite
import '../css/main.css';

import { ERROR_MESSAGES } from '../config/constants.js';
import { ENV } from '../config/environment.js';
import { analyticsService } from '../services/analytics.service.js';
import { apiService } from '../services/api.service.js';
import { errorTracker } from '../services/error-tracker.service.js';
import { ready, $$, scrollTo } from '../utils/dom.js';
import { logger } from '../utils/logger.js';

import { createExtensionHandler } from './modules/extension-handler.js';
import { createFormValidator } from './modules/form-validator.js';
import { createInteractiveDemo } from './modules/interactive-demo.js';
import { createPerformanceMonitor } from './modules/performance-monitor.js';
import { createPreloadScanner } from './modules/preload-scanner.js';
import { createResourceHints } from './modules/resource-hints.js';
import { createScrollAnimations } from './modules/scroll-animations.js';
import { createSectionRevealer } from './modules/section-revealer.js';
import { createVideoLoader } from './modules/video-loader.js';

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
      scrollAnimations: null,
      videoLoader: null
    };
    
    this.isInitialized = false;
  }
  
  /**
   * Initialize application
   */
  async init() {
    try {
      // Handle Chrome extensions first to prevent console errors
      createExtensionHandler();
      
      // Critical performance optimizations FIRST
      createPreloadScanner();
      createPerformanceMonitor();
      createResourceHints();
      
      // Reveal sections immediately to prevent flash
      createSectionRevealer();
      
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
      
      // Show error to user
      this.showCriticalError(error);
    }
  }

  /**
   * Show critical error to user
   * @param {Error} error - The error to display
   */
  showCriticalError(error) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 20px;
      background: #ff0000;
      color: white;
      font-family: monospace;
      z-index: 99999;
    `;
    errorDiv.innerHTML = `
      <h3>Critical Application Error</h3>
      <p>${error.message}</p>
      <details>
        <summary>Technical Details</summary>
        <pre>${error.stack}</pre>
      </details>
    `;
    document.body.appendChild(errorDiv);
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
    // Initialize video loader FIRST for performance
    this.initVideoLoader();
    
    // Initialize scroll animations
    this.initScrollAnimations();
    
    // Initialize form validator
    this.initFormValidator();
    
    // Initialize interactive demo
    this.initInteractiveDemo();
  }
  
  /**
   * Initialize video loader for performance
   */
  initVideoLoader() {
    try {
      this.modules.videoLoader = createVideoLoader();
    } catch (error) {
      logger.error('Failed to initialize video loader:', error);
    }
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
    const successInitial = document.getElementById('success-initial');
    
    try {
      // Show loading state
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        submitButton.classList.add('is-loading');
      }
      
      // Submit via API service
      await apiService.submitDemoRequest(formData);
      
      // Animate form out and success in
      if (form && formSuccess && successInitial) {
        await this.showSuccessSequence(form, formSuccess, successInitial);
      }
      
      // Track conversion
      analyticsService.trackConversion('demo_request', {
        company: formData.company,
        techs: formData.techs
      });
      
      // Store in localStorage for persistence
      this.storeDemoRequest(formData);
      
      // Setup friend invitation form
      this.setupFriendInviteForm();
      
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
        submitButton.textContent = 'request invitation';
        submitButton.classList.remove('is-loading');
      }
    }
  }

  /**
   * Show the success sequence with animations
   * @param {HTMLElement} form - The original form
   * @param {HTMLElement} formSuccess - The success container
   * @param {HTMLElement} successInitial - The initial success step
   */
  async showSuccessSequence(form, formSuccess, successInitial) {
    return new Promise((resolve) => {
      // Also hide the form header
      const formHeader = document.querySelector('.demo-form__header');
      
      // Hide the form and header with animation
      form.classList.add('is-hiding');
      if (formHeader) {
        formHeader.classList.add('is-hiding');
      }
      
      // After form animation completes, show success
      setTimeout(() => {
        form.style.display = 'none';
        if (formHeader) {
          formHeader.style.display = 'none';
        }
        formSuccess.classList.add('is-visible');
        successInitial.classList.add('is-active', 'is-entering');
        
        // Scroll to success message
        scrollTo(formSuccess, { block: 'center' });
        
        resolve();
      }, 300); // Match the form-hide animation duration
    });
  }

  /**
   * Setup friend invitation form
   */
  setupFriendInviteForm() {
    const friendForm = document.getElementById('friend-invite-form');
    const friendEmailInput = document.getElementById('friend-email');
    
    if (friendForm && friendEmailInput) {
      friendForm.addEventListener('submit', this.handleFriendInvite.bind(this));
      
      // Simple email validation for friend input
      friendEmailInput.addEventListener('blur', () => {
        const email = friendEmailInput.value.trim();
        const errorElement = friendForm.querySelector('.form__error');
        
        if (email && !this.isValidEmail(email)) {
          friendEmailInput.classList.add('has-error');
          errorElement.textContent = 'Please enter a valid email address';
        } else {
          friendEmailInput.classList.remove('has-error');
          errorElement.textContent = '';
        }
      });
    }
  }

  /**
   * Handle friend invitation submission
   * @param {Event} event - Form submit event
   */
  async handleFriendInvite(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('#friend-email');
    const submitButton = form.querySelector('button[type="submit"]');
    const errorElement = form.querySelector('.form__error');
    const email = emailInput.value.trim();
    
    // Validate email
    if (!email || !this.isValidEmail(email)) {
      emailInput.classList.add('has-error');
      errorElement.textContent = 'Please enter a valid email address';
      return;
    }
    
    try {
      // Show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      submitButton.classList.add('is-loading');
      
      // Submit friend invitation
      await apiService.submitFriendInvitation({ email });
      
      // Show friend success step
      await this.showFriendSuccess();
      
      // Track friend invitation
      analyticsService.trackEvent('friend_invitation', { email });
      
    } catch (error) {
      errorElement.textContent = 'Failed to send invitation. Please try again.';
      errorTracker.captureError(error, { 
        phase: 'friend_invitation',
        email 
      });
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.textContent = 'Invite';
      submitButton.classList.remove('is-loading');
    }
  }

  /**
   * Show friend invitation success
   */
  async showFriendSuccess() {
    const successInitial = document.getElementById('success-initial');
    const successFriend = document.getElementById('success-friend');
    
    if (successInitial && successFriend) {
      return new Promise((resolve) => {
        // Start the transition by fading out initial success
        successInitial.classList.add('is-exiting');
        
        // Immediately start preparing the friend success (but keep it hidden)
        successFriend.classList.remove('is-active');
        successFriend.style.opacity = '0';
        
        setTimeout(() => {
          // Remove initial success from view
          successInitial.classList.remove('is-active', 'is-entering');
          
          // Activate friend success and animate it in
          successFriend.classList.add('is-active', 'is-entering');
          successFriend.style.opacity = '';
          
          resolve();
        }, 200); // Slightly faster transition
      });
    }
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} - Whether email is valid
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    Object.entries(this.modules).forEach(([_name, module]) => {
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