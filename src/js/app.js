/**
 * Cyft - Main Application
 * Progressive enhancement with lazy loading
 */

// Import our clean CSS
import '../css/app.css';

// Feature detection
const supports = {
    video: 'HTMLVideoElement' in window,
    intersectionObserver: 'IntersectionObserver' in window,
    customProperties: CSS && CSS.supports && CSS.supports('color', 'var(--test)')
};

// Log environment
console.log('[Cyft] App loaded', { supports });

/**
 * Initialize application
 */
async function init() {
    // Video enhancement
    if (supports.video) {
        const { enhanceVideo } = await import('./features/video-enhancement.js');
        enhanceVideo();
    }
    
    // Smooth scroll
    enhanceSmoothScroll();
    
    // Form handling
    enhanceForm();
    
    // Demo loading
    setupDemoLoader();
    
    // Performance monitoring
    if (process.env.NODE_ENV === 'production') {
        monitorPerformance();
    }
}

/**
 * Enhance smooth scrolling for anchor links
 */
function enhanceSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Enhance form with validation and submission
 */
function enhanceForm() {
    const form = document.getElementById('demo-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Disable submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            // Simulate API call (replace with real endpoint)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Success feedback
            form.innerHTML = `
                <div class="text-center">
                    <h3>Thank you!</h3>
                    <p>We'll be in touch within 24 hours.</p>
                </div>
            `;
            
            // Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'event_category': 'engagement',
                    'event_label': 'demo_request'
                });
            }
        } catch (error) {
            console.error('Form submission error:', error);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Request invitation';
            alert('Something went wrong. Please try again.');
        }
    });
}

/**
 * Setup demo loader
 */
function setupDemoLoader() {
    const demoButton = document.getElementById('demo-start');
    if (!demoButton) return;
    
    demoButton.addEventListener('click', async () => {
        demoButton.disabled = true;
        demoButton.textContent = 'Loading demo...';
        
        try {
            // Lazy load demo module
            const { initDemo } = await import('./features/interactive-demo.js');
            await initDemo();
        } catch (error) {
            console.error('Failed to load demo:', error);
            demoButton.disabled = false;
            demoButton.textContent = 'Start Demo';
            alert('Demo failed to load. Please refresh and try again.');
        }
    }, { once: true });
}

/**
 * Monitor Core Web Vitals
 */
function monitorPerformance() {
    if (!('PerformanceObserver' in window)) return;
    
    try {
        // LCP
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('[Performance] LCP:', lastEntry.startTime);
            
            // Send to analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'web_vitals', {
                    name: 'LCP',
                    value: Math.round(lastEntry.startTime),
                    metric_label: 'web_vitals'
                });
            }
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // FID
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('[Performance] FID:', entry.processingStart - entry.startTime);
            }
        }).observe({ entryTypes: ['first-input'] });
        
        // CLS
        let clsValue = 0;
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    console.log('[Performance] CLS:', clsValue);
                }
            }
        }).observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
        console.error('Performance monitoring error:', error);
    }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for testing
export { init, supports }; 