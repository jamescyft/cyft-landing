/**
 * Form Validation Module
 * Handles all form validation logic with proper error handling
 */

import { FORM_VALIDATION } from '../../config/constants.js';
import { $, on, addClass, removeClass, setAttributes } from '../../utils/dom.js';
import { logger } from '../../utils/logger.js';

/**
 * FormValidator Class
 * Manages form validation state and rules
 */
export class FormValidator {
  constructor(formElement, options = {}) {
    if (!formElement) {
      throw new Error('FormValidator requires a form element');
    }
    
    this.form = formElement;
    this.fields = {};
    this.errors = {};
    this.isValid = false;
    
    this.options = {
      validateOnBlur: true,
      validateOnInput: false,
      showInlineErrors: true,
      errorClass: 'is-invalid',
      validClass: 'is-valid',
      errorMessageClass: 'error-message',
      ...options
    };
    
    this.init();
  }
  
  /**
   * Initialize form validation
   */
  init() {
    // Get all form fields
    this.fields = this.getFormFields();
    
    // Setup validation listeners
    this.setupListeners();
    
    // Prevent default form submission
    on(this.form, 'submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }
  
  /**
   * Get all form fields
   * @returns {Object} Map of field names to elements
   */
  getFormFields() {
    const fields = {};
    const inputs = this.form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      if (input.name) {
        fields[input.name] = input;
      }
    });
    
    return fields;
  }
  
  /**
   * Setup validation listeners
   */
  setupListeners() {
    Object.entries(this.fields).forEach(([name, field]) => {
      if (this.options.validateOnBlur) {
        on(field, 'blur', () => this.validateField(name));
      }
      
      if (this.options.validateOnInput) {
        on(field, 'input', () => this.validateField(name));
      }
    });
  }
  
  /**
   * Validate a single field
   * @param {string} fieldName - Field name to validate
   * @returns {boolean} Validation result
   */
  validateField(fieldName) {
    const field = this.fields[fieldName];
    if (!field) return false;
    
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = `${this.getFieldLabel(fieldName)} is required`;
    }
    
    // Pattern validation
    if (isValid && value && FORM_VALIDATION.patterns[fieldName]) {
      const pattern = FORM_VALIDATION.patterns[fieldName];
      if (!pattern.test(value)) {
        isValid = false;
        errorMessage = FORM_VALIDATION.messages[fieldName] || 'Invalid format';
      }
    }
    
    // Type-specific validation
    if (isValid && value) {
      switch (field.type) {
        case 'email':
          if (!FORM_VALIDATION.patterns.email.test(value)) {
            isValid = false;
            errorMessage = FORM_VALIDATION.messages.email;
          }
          break;
          
        case 'number': {
          const num = parseFloat(value);
          const min = parseFloat(field.min);
          const max = parseFloat(field.max);
          
          if (isNaN(num)) {
            isValid = false;
            errorMessage = 'Must be a valid number';
          } else if (!isNaN(min) && num < min) {
            isValid = false;
            errorMessage = `Must be at least ${min}`;
          } else if (!isNaN(max) && num > max) {
            isValid = false;
            errorMessage = `Must be no more than ${max}`;
          }
          break;
        }
      }
    }
    
    // Update field state
    this.updateFieldState(field, isValid, errorMessage);
    
    // Update errors object
    if (isValid) {
      delete this.errors[fieldName];
    } else {
      this.errors[fieldName] = errorMessage;
    }
    
    return isValid;
  }
  
  /**
   * Update field visual state
   * @param {Element} field - Field element
   * @param {boolean} isValid - Validation state
   * @param {string} errorMessage - Error message
   */
  updateFieldState(field, isValid, errorMessage) {
    // Remove existing states
    removeClass(field, this.options.errorClass, this.options.validClass);
    
    // Add appropriate state class
    if (isValid) {
      addClass(field, this.options.validClass);
      setAttributes(field, { 'aria-invalid': 'false' });
    } else {
      addClass(field, this.options.errorClass);
      setAttributes(field, { 'aria-invalid': 'true' });
    }
    
    // Handle inline error messages
    if (this.options.showInlineErrors) {
      this.updateErrorMessage(field, errorMessage);
    }
  }
  
  /**
   * Update error message display
   * @param {Element} field - Field element
   * @param {string} message - Error message
   */
  updateErrorMessage(field, message) {
    const errorId = `${field.id || field.name}-error`;
    let errorElement = $(`#${errorId}`);
    
    if (message) {
      if (!errorElement) {
        // Create error element
        errorElement = document.createElement('span');
        errorElement.id = errorId;
        errorElement.className = this.options.errorMessageClass;
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-live', 'polite');
        field.parentNode.appendChild(errorElement);
        
        // Associate with field for accessibility
        field.setAttribute('aria-describedby', errorId);
      }
      
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    } else if (errorElement) {
      errorElement.style.display = 'none';
    }
  }
  
  /**
   * Validate entire form
   * @returns {boolean} Form validation result
   */
  validateForm() {
    let isValid = true;
    
    Object.keys(this.fields).forEach(fieldName => {
      const fieldValid = this.validateField(fieldName);
      if (!fieldValid) {
        isValid = false;
      }
    });
    
    this.isValid = isValid;
    return isValid;
  }
  
  /**
   * Handle form submission
   */
  async handleSubmit() {
    // Validate all fields
    const isValid = this.validateForm();
    
    if (!isValid) {
      this.focusFirstError();
      return;
    }
    
    // Get form data
    const formData = this.getFormData();
    
    // Trigger submit event
    const submitEvent = new CustomEvent('validSubmit', {
      detail: { formData },
      bubbles: true
    });
    
    this.form.dispatchEvent(submitEvent);
  }
  
  /**
   * Focus first field with error
   */
  focusFirstError() {
    const firstErrorField = Object.keys(this.errors)[0];
    if (firstErrorField && this.fields[firstErrorField]) {
      this.fields[firstErrorField].focus();
    }
  }
  
  /**
   * Get form data as object
   * @returns {Object} Form data
   */
  getFormData() {
    const formData = new FormData(this.form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    return data;
  }
  
  /**
   * Get field label for error messages
   * @param {string} fieldName - Field name
   * @returns {string} Field label
   */
  getFieldLabel(fieldName) {
    const field = this.fields[fieldName];
    if (!field) return fieldName;
    
    // Check for associated label
    const label = this.form.querySelector(`label[for="${field.id}"]`);
    if (label) return label.textContent.trim();
    
    // Check for placeholder
    if (field.placeholder) return field.placeholder;
    
    // Fallback to field name
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  }
  
  /**
   * Reset form validation state
   */
  reset() {
    this.errors = {};
    this.isValid = false;
    
    // Reset all fields
    Object.values(this.fields).forEach(field => {
      removeClass(field, this.options.errorClass, this.options.validClass);
      field.removeAttribute('aria-invalid');
      
      // Remove error messages
      const errorElement = $(`#${field.id || field.name}-error`);
      if (errorElement) {
        errorElement.style.display = 'none';
      }
    });
    
    // Reset form
    this.form.reset();
  }
  
  /**
   * Set custom error for a field
   * @param {string} fieldName - Field name
   * @param {string} message - Error message
   */
  setError(fieldName, message) {
    const field = this.fields[fieldName];
    if (!field) return;
    
    this.errors[fieldName] = message;
    this.updateFieldState(field, false, message);
  }
  
  /**
   * Clear error for a field
   * @param {string} fieldName - Field name
   */
  clearError(fieldName) {
    const field = this.fields[fieldName];
    if (!field) return;
    
    delete this.errors[fieldName];
    this.updateFieldState(field, true, '');
  }
  
  /**
   * Get current errors
   * @returns {Object} Current errors
   */
  getErrors() {
    return { ...this.errors };
  }
  
  /**
   * Check if form has errors
   * @returns {boolean}
   */
  hasErrors() {
    return Object.keys(this.errors).length > 0;
  }
  
  /**
   * Destroy validator and cleanup
   */
  destroy() {
    // Remove all listeners
    this.form.removeEventListener('submit', this.handleSubmit);
    
    // Reset form state
    this.reset();
    
    // Clear references
    this.form = null;
    this.fields = null;
    this.errors = null;
  }
}

/**
 * Factory function to create form validator
 * @param {string|Element} formSelector - Form selector or element
 * @param {Object} options - Validator options
 * @returns {FormValidator|null}
 */
export const createFormValidator = (formSelector, options = {}) => {
  const form = typeof formSelector === 'string' ? $(formSelector) : formSelector;
  
  if (!form) {
    logger.error(`Form not found: ${formSelector}`);
    return null;
  }
  
  return new FormValidator(form, options);
}; 