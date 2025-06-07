/**
 * Resource Hints Module
 * Optimizes resource loading with preload, prefetch, and preconnect
 * PERFECTION DEMANDED - NO FLASH ALLOWED!
 */

export class ResourceHints {
  constructor() {
    this.criticalResources = [
      // Preconnect to potential CDNs
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      
      // Preload critical fonts with proper CORS
      { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: 'anonymous',
        href: 'data:font/woff2;base64,d09GMgABAAAAAAIAAA4AAAAABQAAAAGxAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGhYbBxwaBmAANBEICoEIgQQBNgIkAxALCgAEIAWDWgcgGzsDyI6ULmbHIiNRlMdw4I94+P853L7/0rbFo9sKV4oXaRwvGIdKJpPp9HT9oFZo/7+be2+iiSUNp5E9QjVClERJZNGS+EMl4lXSoJ6gIbnLNrXPagr9sLXAFLNQqHqhUKgEVqhYnSJ1h1AIhbJLAFgKsKWqP3C8ZJ8khaSQ2Eu3F5gBzwMPNEJPaAhP8V7Cl4l/D1ACALz3tgW2BbEFgQWxBbEFgQW2xWkFCSjgBJRaQkICSjW4nYBSCSihBLRSJASUUAJaKRLSCoS0AiGtQEgrdH8AAwD7Bw==' }
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