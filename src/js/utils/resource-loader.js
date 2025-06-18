/**
 * Resource Loader with Retry Logic
 * Handles loading external resources with retry capability for poor network conditions
 */

/**
 * Load a resource with retry logic
 * @param {string} url - Resource URL
 * @param {string} type - Resource type ('script' or 'style')
 * @param {Object} options - Loading options
 * @returns {Promise<HTMLElement>}
 */
export async function loadResourceWithRetry(url, type, options = {}) {
  const {
    retries = 3,
    retryDelay = 1000,
    timeout = 10000,
    onRetry = () => {},
    onFallback = () => {}
  } = options;
  
  let lastError;
  
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const element = await loadResource(url, type, timeout);
      return element;
    } catch (error) {
      lastError = error;
      console.warn(`[ResourceLoader] Attempt ${attempt + 1} failed for ${url}:`, error.message);
      
      if (attempt < retries - 1) {
        onRetry(attempt + 1, retries);
        await delay(retryDelay * Math.pow(2, attempt)); // Exponential backoff
      }
    }
  }
  
  // All retries failed, use fallback
  console.error(`[ResourceLoader] Failed to load ${url} after ${retries} attempts`);
  onFallback(lastError);
  throw lastError;
}

/**
 * Load a single resource
 * @param {string} url - Resource URL
 * @param {string} type - Resource type
 * @param {number} timeout - Timeout in ms
 * @returns {Promise<HTMLElement>}
 */
function loadResource(url, type, timeout) {
  return new Promise((resolve, reject) => {
    let element;
    let timeoutId;
    
    const cleanup = () => {
      if (timeoutId) clearTimeout(timeoutId);
      element.onload = null;
      element.onerror = null;
    };
    
    const handleLoad = () => {
      cleanup();
      resolve(element);
    };
    
    const handleError = () => {
      cleanup();
      reject(new Error(`Failed to load ${type}: ${url}`));
    };
    
    if (type === 'script') {
      element = document.createElement('script');
      element.type = 'module';
      element.src = url;
      element.async = true;
    } else if (type === 'style') {
      element = document.createElement('link');
      element.rel = 'stylesheet';
      element.href = url;
    } else {
      reject(new Error(`Unknown resource type: ${type}`));
      return;
    }
    
    element.onload = handleLoad;
    element.onerror = handleError;
    
    // Set timeout
    timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error(`Timeout loading ${type}: ${url}`));
    }, timeout);
    
    // Append to document
    if (type === 'script') {
      document.body.appendChild(element);
    } else {
      document.head.appendChild(element);
    }
  });
}

/**
 * Delay helper
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise}
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if critical resources are loaded
 * @returns {Object} Status of critical resources
 */
export function checkResourceStatus() {
  const status = {
    css: false,
    js: false,
    interactive: false
  };
  
  // Check if main CSS is loaded by looking for a specific class
  const testEl = document.createElement('div');
  testEl.className = 'demo__container';
  document.body.appendChild(testEl);
  const computed = window.getComputedStyle(testEl);
  status.css = computed.maxWidth === '72rem' || computed.maxWidth === '1152px';
  document.body.removeChild(testEl);
  
  // Check if main JS is loaded by looking for app instance
  status.js = typeof window.__cyftApp !== 'undefined' || 
              document.querySelector('[data-js-loaded]') !== null;
  
  // Check if interactive elements are ready
  status.interactive = document.getElementById('mic-button') !== null &&
                      typeof window.__cyftApp?.modules?.interactiveDemo !== 'undefined';
  
  return status;
}

/**
 * Monitor resource loading and show status
 * @param {Function} onStatusChange - Callback when status changes
 */
export function monitorResourceLoading(onStatusChange) {
  let lastStatus = checkResourceStatus();
  onStatusChange(lastStatus);
  
  const checkInterval = setInterval(() => {
    const currentStatus = checkResourceStatus();
    
    if (JSON.stringify(currentStatus) !== JSON.stringify(lastStatus)) {
      lastStatus = currentStatus;
      onStatusChange(currentStatus);
    }
    
    // Stop monitoring when everything is loaded
    if (currentStatus.css && currentStatus.js && currentStatus.interactive) {
      clearInterval(checkInterval);
    }
  }, 500);
  
  // Stop monitoring after 30 seconds
  setTimeout(() => clearInterval(checkInterval), 30000);
}

/**
 * Show loading indicator for slow connections
 * @param {string} message - Loading message
 * @returns {HTMLElement} Loading element
 */
export function showLoadingIndicator(message = 'Loading resources...') {
  const existing = document.getElementById('resource-loading-indicator');
  if (existing) return existing;
  
  const indicator = document.createElement('div');
  indicator.id = 'resource-loading-indicator';
  indicator.innerHTML = `
    <style>
      #resource-loading-indicator {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-family: system-ui, sans-serif;
        font-size: 14px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: opacity 0.3s ease;
      }
      
      #resource-loading-indicator.success {
        background: rgba(34, 139, 34, 0.9);
      }
      
      #resource-loading-indicator.error {
        background: rgba(220, 20, 60, 0.9);
      }
      
      .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
    <div class="loading-spinner"></div>
    <span>${message}</span>
  `;
  
  document.body.appendChild(indicator);
  return indicator;
}

/**
 * Hide loading indicator
 */
export function hideLoadingIndicator() {
  const indicator = document.getElementById('resource-loading-indicator');
  if (indicator) {
    indicator.style.opacity = '0';
    setTimeout(() => indicator.remove(), 300);
  }
}

/**
 * Initialize resource monitoring for poor connections
 */
export function initResourceMonitoring() {
  // Only show indicator if resources are taking too long
  let indicatorTimeout = setTimeout(() => {
    const status = checkResourceStatus();
    if (!status.css || !status.js) {
      const indicator = showLoadingIndicator('Loading resources on slow connection...');
      
      monitorResourceLoading((status) => {
        if (status.css && status.js) {
          indicator.className = 'success';
          indicator.querySelector('span').textContent = 'Resources loaded successfully!';
          setTimeout(() => hideLoadingIndicator(), 2000);
        }
      });
    }
  }, 3000);
  
  // Clear timeout if resources load quickly
  monitorResourceLoading((status) => {
    if (status.css && status.js) {
      clearTimeout(indicatorTimeout);
    }
  });
}

// Auto-initialize on poor connections
if (typeof navigator !== 'undefined' && navigator.connection) {
  const connection = navigator.connection;
  const slowConnection = connection.effectiveType === '2g' || 
                        connection.effectiveType === 'slow-2g' ||
                        connection.downlink < 1; // Less than 1 Mbps
  
  if (slowConnection) {
    initResourceMonitoring();
  }
} 