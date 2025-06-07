/**
 * Google Sheets Service
 * Handles form submission to Google Sheets via Google Apps Script Web App
 */

import { logger } from '../utils/logger.js';
import { ENV } from '../config/environment.js';

/**
 * Google Sheets Service Class
 * Integrates with Google Apps Script Web App for lead capture
 */
export class GoogleSheetsService {
  constructor() {
    // This URL will be replaced with your actual Google Apps Script Web App URL
    this.scriptUrl = ENV.googleSheets?.scriptUrl || '';
    this.isEnabled = ENV.googleSheets?.enabled || false;
  }

  /**
   * Submit form data to Google Sheets
   * @param {Object} data - Form data to submit
   * @param {string} formType - Type of form (demo or friend)
   * @returns {Promise<Object>}
   */
  async submitToSheet(data, formType = 'demo') {
    if (!this.isEnabled || !this.scriptUrl) {
      logger.warn('Google Sheets integration is not enabled');
      return { success: false, message: 'Google Sheets not configured' };
    }

    try {
      const payload = {
        ...data,
        formType,
        timestamp: new Date().toISOString(),
        source: window.location.hostname,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct'
      };

      const response = await fetch(this.scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script doesn't support CORS
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      // With no-cors mode, we can't read the response
      // We assume success if no error was thrown
      logger.info('Data submitted to Google Sheets');
      return { 
        success: true, 
        message: 'Data submitted successfully',
        data: payload 
      };

    } catch (error) {
      logger.error('Failed to submit to Google Sheets:', error);
      throw new Error('Failed to submit data to Google Sheets');
    }
  }

  /**
   * Submit demo request to Google Sheets
   * @param {Object} formData - Demo form data
   * @returns {Promise<Object>}
   */
  async submitDemoRequest(formData) {
    return this.submitToSheet(formData, 'demo');
  }

  /**
   * Submit friend invitation to Google Sheets
   * @param {Object} inviteData - Friend invitation data
   * @returns {Promise<Object>}
   */
  async submitFriendInvitation(inviteData) {
    return this.submitToSheet(inviteData, 'friend');
  }

  /**
   * Test connection to Google Sheets
   * @returns {Promise<boolean>}
   */
  async testConnection() {
    try {
      await this.submitToSheet({ test: true }, 'test');
      return true;
    } catch (error) {
      logger.error('Google Sheets connection test failed:', error);
      return false;
    }
  }
}

// Create singleton instance
export const googleSheetsService = new GoogleSheetsService();

// Export convenience methods
export const submitToGoogleSheets = (data, formType) => googleSheetsService.submitToSheet(data, formType);
export const testGoogleSheetsConnection = () => googleSheetsService.testConnection(); 