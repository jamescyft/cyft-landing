/**
 * Network Resilience System
 * Elegant, minimal, bulletproof resource loading for any network condition
 */

class NetworkResilience {
  constructor() {
    this.config = {
      retryDelays: [1000, 2000, 4000],
      criticalSelectors: {
        css: '.demo__container',
        js: '#mic-button'
      },
      cssTestProperty: 'maxWidth',
      cssTestValue: '72rem'
    };
    
    this.state = {
      cssLoaded: false,
      jsLoaded: false,
      retries: new Map()
    };
  }

  async init() {
    // Only initialize if we detect potential issues
    if (this.shouldMonitor()) {
      this.monitorResources();
      this.setupServiceWorker();
    }
  }

  shouldMonitor() {
    // Check for slow connection or if resources haven't loaded within 2s
    const slowConnection = this.isSlowConnection();
    const resourcesDelayed = new Promise(resolve => {
      setTimeout(() => resolve(!this.validateResources()), 2000);
    });
    
    return slowConnection || resourcesDelayed;
  }

  isSlowConnection() {
    if (!navigator.connection) return false;
    const { effectiveType, downlink } = navigator.connection;
    return ['slow-2g', '2g'].includes(effectiveType) || downlink < 1;
  }

  validateResources() {
    // Elegant CSS validation
    const testEl = document.createElement('div');
    testEl.className = 'demo__container';
    document.body.appendChild(testEl);
    const computed = window.getComputedStyle(testEl);
    this.state.cssLoaded = computed[this.config.cssTestProperty] === this.config.cssTestValue;
    document.body.removeChild(testEl);
    
    // JS validation
    this.state.jsLoaded = document.querySelector(this.config.criticalSelectors.js) !== null &&
                         typeof window.__cyftApp !== 'undefined';
    
    return this.state.cssLoaded && this.state.jsLoaded;
  }

  async monitorResources() {
    // Elegant resource monitoring with automatic retry
    const checkAndRetry = async () => {
      if (this.validateResources()) return;
      
      // Find and retry failed resources
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      for (const link of links) {
        if (!this.state.cssLoaded && this.isMainStylesheet(link)) {
          await this.retryResource(link);
        }
      }
    };
    
    // Initial check
    await this.waitForDOM();
    checkAndRetry();
    
    // Periodic checks with exponential backoff
    let delay = 1000;
    const maxDelay = 10000;
    const checkInterval = setInterval(() => {
      if (this.validateResources()) {
        clearInterval(checkInterval);
        this.onResourcesLoaded();
      } else {
        checkAndRetry();
        delay = Math.min(delay * 1.5, maxDelay);
      }
    }, delay);
    
    // Stop checking after 30s
    setTimeout(() => clearInterval(checkInterval), 30000);
  }

  isMainStylesheet(link) {
    const href = link.getAttribute('href') || '';
    return href.includes('/assets/style-') || href.includes('/src/css/main.css');
  }

  async retryResource(element) {
    const url = element.href || element.src;
    const retryCount = this.state.retries.get(url) || 0;
    
    if (retryCount >= this.config.retryDelays.length) return;
    
    this.state.retries.set(url, retryCount + 1);
    
    // Remove failed element
    element.remove();
    
    // Create new element with intelligent cache busting
    const newElement = element.cloneNode();
    const separator = url.includes('?') ? '&' : '?';
    newElement.href = newElement.src = `${url}${separator}retry=${retryCount + 1}&t=${Date.now()}`;
    
    // Add with proper error handling
    return new Promise((resolve) => {
      newElement.onload = () => {
        console.log(`[NetworkResilience] Resource loaded: ${url}`);
        resolve(true);
      };
      
      newElement.onerror = () => {
        const delay = this.config.retryDelays[retryCount];
        console.log(`[NetworkResilience] Retry ${retryCount + 1} failed, waiting ${delay}ms`);
        setTimeout(() => this.retryResource(element), delay);
        resolve(false);
      };
      
      document.head.appendChild(newElement);
    });
  }

  async setupServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('[NetworkResilience] Service Worker registered');
      
      // Intelligent update handling
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
            this.onServiceWorkerUpdate();
          }
        });
      });
    } catch (error) {
      console.error('[NetworkResilience] Service Worker registration failed:', error);
    }
  }

  onResourcesLoaded() {
    // Remove any loading indicators
    const indicators = document.querySelectorAll('[data-loading-indicator]');
    indicators.forEach(el => el.remove());
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('networkresilienceready'));
  }

  onServiceWorkerUpdate() {
    // Gracefully handle service worker updates
    if (confirm('A new version is available. Reload to update?')) {
      window.location.reload();
    }
  }

  waitForDOM() {
    return new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  // Public API for showing loading states
  showLoadingState(message = 'Optimizing for your connection...') {
    if (document.querySelector('[data-loading-indicator]')) return;
    
    const indicator = document.createElement('div');
    indicator.setAttribute('data-loading-indicator', '');
    indicator.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 12px;
      animation: slideIn 0.3s ease-out;
    `;
    
    indicator.innerHTML = `
      <style>
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .nr-dots {
          display: flex;
          gap: 4px;
        }
        .nr-dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          animation: pulse 1.4s ease-in-out infinite;
        }
        .nr-dot:nth-child(2) { animation-delay: 0.2s; }
        .nr-dot:nth-child(3) { animation-delay: 0.4s; }
      </style>
      <div class="nr-dots">
        <div class="nr-dot"></div>
        <div class="nr-dot"></div>
        <div class="nr-dot"></div>
      </div>
      <span>${message}</span>
    `;
    
    document.body.appendChild(indicator);
    
    // Auto-hide after resources load
    window.addEventListener('networkresilienceready', () => {
      indicator.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => indicator.remove(), 300);
    });
  }
}

// Auto-initialize with elegant detection
const resilience = new NetworkResilience();

// Only show loading state if actually needed
let loadingTimeout = setTimeout(() => {
  if (!resilience.validateResources()) {
    resilience.showLoadingState();
  }
}, 2000);

// Clear timeout if resources load quickly
window.addEventListener('load', () => {
  if (resilience.validateResources()) {
    clearTimeout(loadingTimeout);
  }
});

// Initialize
resilience.init();

// Export for advanced usage
export { NetworkResilience, resilience }; 