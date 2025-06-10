/**
 * Resource Hints Module
 * Optimizes resource loading with preload, prefetch, and preconnect
 * PERFECTION DEMANDED - NO FLASH ALLOWED!
 */

export class ResourceHints {
  constructor() {
    this.criticalResources = [
      // No external font resources needed - using system fonts only
    ];
    
    this.deferredResources = [];
  }

  init() {
    // Add critical hints immediately
    this.addCriticalHints();
    
    // Setup smart prefetching after initial load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupSmartPrefetch();
      });
    } else {
      this.setupSmartPrefetch();
    }
  }

  addCriticalHints() {
    const head = document.head;
    const fragment = document.createDocumentFragment();
    
    this.criticalResources.forEach(resource => {
      const link = document.createElement('link');
      Object.entries(resource).forEach(([key, value]) => {
        link.setAttribute(key, value);
      });
      fragment.appendChild(link);
    });
    
    // Insert all at once for performance
    head.appendChild(fragment);
  }

  setupSmartPrefetch() {
    // Only prefetch when network is good and user is idle
    if ('connection' in navigator) {
      const connection = navigator.connection;
      if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        return; // Don't prefetch on slow connections
      }
    }

    // Use requestIdleCallback for non-critical prefetching
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.prefetchLikelyResources();
      }, { timeout: 3000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => this.prefetchLikelyResources(), 3000);
    }
  }

  prefetchLikelyResources() {
    // Prefetch demo resources if user scrolls past hero
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Prefetch demo JS chunk
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = '/src/js/modules/interactive-demo.js';
          document.head.appendChild(link);
          
          observer.disconnect();
        }
      });
    }, { rootMargin: '200px' });

    const storySection = document.querySelector('.section--story');
    if (storySection) {
      observer.observe(storySection);
    }
  }

  // Remove image optimization - let lazy loading handle it naturally
}

export const createResourceHints = () => {
  const hints = new ResourceHints();
  hints.init();
  return hints;
}; 