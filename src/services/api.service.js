/**
 * API Service
 * Handles all API communication with proper error handling and environment support
 * NO MORE COMMENTED PRODUCTION CODE!
 */

import { ENV, getApiUrl } from '../config/environment.js';
import { logger } from '../utils/logger.js';
import { TIMEOUTS } from '../config/constants.js';

/**
 * API Service Class
 * Single responsibility: Handle API communication
 */
export class ApiService {
  constructor() {
    this.baseUrl = ENV.api.baseUrl;
    this.timeout = ENV.api.timeout;
    this.retryAttempts = ENV.api.retryAttempts;
  }

  /**
   * Make API request with retry logic
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise<any>}
   */
  async request(endpoint, options = {}) {
    const url = getApiUrl(endpoint);
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    let lastError;
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(url, {
          ...config,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        lastError = error;
        logger.error(`API request failed (attempt ${attempt}/${this.retryAttempts}):`, error);
        
        if (attempt < this.retryAttempts) {
          // Exponential backoff
          await this.wait(Math.pow(2, attempt) * 1000);
        }
      }
    }

    throw lastError;
  }

  /**
   * Submit demo request
   * @param {Object} formData - Form data
   * @returns {Promise<Object>}
   */
  async submitDemoRequest(formData) {
    if (ENV.isDev) {
      logger.debug('Dev mode: Mocking demo request submission');
      return this.mockSubmitDemoRequest(formData);
    }

    return this.request('/demo-request', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  }

  /**
   * Mock demo request submission for development
   * @param {Object} formData - Form data
   * @returns {Promise<Object>}
   */
  async mockSubmitDemoRequest(formData) {
    await this.wait(TIMEOUTS.formSubmitMock);
    
    return {
      success: true,
      message: 'Demo request received',
      data: {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        timestamp: new Date().toISOString()
      }
    };
  }

  /**
   * Get demo scenarios (example endpoint)
   * @returns {Promise<Array>}
   */
  async getDemoScenarios() {
    if (ENV.isDev) {
      // In dev, use local scenarios
      const { DEMO_SCENARIOS } = await import('../config/scenarios.js');
      return DEMO_SCENARIOS;
    }

    return this.request('/demo-scenarios');
  }

  /**
   * Health check
   * @returns {Promise<Object>}
   */
  async healthCheck() {
    return this.request('/health', {
      method: 'GET'
    });
  }

  /**
   * Wait utility
   * @param {number} ms - Milliseconds to wait
   * @returns {Promise}
   */
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Create singleton instance
export const apiService = new ApiService();

// Export convenience methods
export const submitDemoRequest = (formData) => apiService.submitDemoRequest(formData);
export const getDemoScenarios = () => apiService.getDemoScenarios();
export const healthCheck = () => apiService.healthCheck(); 