/**
 * Preload Scanner Module
 * Ensures ZERO render blocking and PERFECT load order
 * My hyperfocus demands PERFECTION!
 */

export class PreloadScanner {
  constructor() {
    this.criticalCSS = null;
    this.criticalFonts = new Set();
  }

  init() {
    // Scan for critical resources before paint
    this.scanCriticalResources();
    
    // Optimize render path
    this.optimizeRenderPath();
  }

  scanCriticalResources() {
    // Find all stylesheets in head
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    
    stylesheets.forEach(sheet => {
      // Mark non-critical sheets for async loading
      if (!sheet.href.includes('critical')) {
        sheet.media = 'print';
        sheet.onload = function() { this.media = 'all'; };
      }
    });
  }

  optimizeRenderPath() {
    // Ensure fonts don't block render
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    }

    // Mark when DOM is interactive
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        document.documentElement.classList.add('dom-ready');
      });
    } else {
      document.documentElement.classList.add('dom-ready');
    }

    // Mark when fully loaded
    window.addEventListener('load', () => {
      document.documentElement.classList.add('fully-loaded');
    });
  }

  // Prevent any layout thrashing
  preventLayoutThrash() {
    let reads = [];
    let writes = [];
    let scheduled = false;

    const scheduleFlush = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(flush);
      }
    };

    const flush = () => {
      const readsLength = reads.length;
      const writesLength = writes.length;
      let i;

      // Batch all reads first
      for (i = 0; i < readsLength; i++) {
        reads[i]();
      }

      // Then batch all writes
      for (i = 0; i < writesLength; i++) {
        writes[i]();
      }

      reads.length = 0;
      writes.length = 0;
      scheduled = false;
    };

    window.fastdom = {
      read(fn) {
        reads.push(fn);
        scheduleFlush();
      },
      write(fn) {
        writes.push(fn);
        scheduleFlush();
      }
    };
  }
}

export const createPreloadScanner = () => {
  const scanner = new PreloadScanner();
  scanner.init();
  return scanner;
}; 