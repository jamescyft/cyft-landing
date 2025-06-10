/**
 * Video Enhancement
 * Progressive video loading with smooth transitions
 */

export function enhanceVideo() {
    const video = document.querySelector('.hero__video');
    if (!video) return;
    
    console.log('[Video] Enhancing hero video');
    
    // Get source element
    const source = video.querySelector('source');
    if (!source || !source.dataset.src) return;
    
    // Set actual source
    source.src = source.dataset.src;
    
    // Preload video metadata
    video.load();
    
    // Handle video ready
    video.addEventListener('canplaythrough', handleVideoReady, { once: true });
    
    // Handle video error
    video.addEventListener('error', handleVideoError, { once: true });
    
    /**
     * Handle when video is ready to play
     */
    function handleVideoReady() {
        console.log('[Video] Ready to play');
        
        // Start playing
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('[Video] Playing successfully');
                    // Add loaded class for CSS transition
                    video.classList.add('is-loaded');
                })
                .catch(error => {
                    console.error('[Video] Autoplay failed:', error);
                    // Still show video even if autoplay fails
                    video.classList.add('is-loaded');
                });
        }
    }
    
    /**
     * Handle video loading error
     */
    function handleVideoError(event) {
        console.error('[Video] Failed to load:', event);
        // Remove video element to show gradient background
        video.remove();
    }
    
    // Pause video when not visible (performance)
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.25 });
        
        observer.observe(video);
    }
} 