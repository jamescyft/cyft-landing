/**
 * Video Loader Module
 * Optimizes video loading for maximum performance
 */

import { $ } from '../../utils/dom.js';
import { logger } from '../../utils/logger.js';

export class VideoLoader {
  constructor() {
    this.video = null;
    this.container = null;
    this.isLoaded = false;
    this.loadAttempts = 0;
    this.maxAttempts = 3;
    
    // Production video URLs - UPDATE THESE!
    this.videoUrls = {
      // For production, use the same compressed videos that are in the repo
      production: {
        high: '/assets/videos/hero-video-compressed.mp4',  // Already in repo, will deploy with build
        low: '/assets/videos/hero-video-compressed.mp4'    // Using same file for now until tiny version exists
      },
      // For local dev, use local files
      local: {
        high: '/assets/videos/hero-video-compressed.mp4',  // Use compressed even for "high"
        low: '/assets/videos/hero-video-compressed.mp4'    // Use compressed for low too - tiny doesn't exist
      }
    };
  }

  init() {
    this.container = $('.video-background');
    if (!this.container) return;

    this.video = this.container.querySelector('video');
    if (!this.video) return;

    // Remove autoplay initially
    this.video.removeAttribute('autoplay');
    this.video.pause();

    // Set up intersection observer for lazy loading
    this.setupLazyLoading();

    // Add loading state
    this.container.classList.add('video-background--loading');
  }

  getVideoUrl(quality = 'high') {
    const isProduction = window.location.hostname !== 'localhost' && 
                        window.location.hostname !== '127.0.0.1';
    
    const urls = isProduction ? this.videoUrls.production : this.videoUrls.local;
    
    // Remove the CDN check since we're using local files in production now
    // The compressed video is already in the repo and will be deployed
    
    return urls[quality];
  }

  setupLazyLoading() {
    // Hero section is already visible, load immediately!
    const heroSection = this.container.closest('.section--hero');
    if (heroSection) {
      // Load video immediately for hero section
      this.loadVideo();
      return;
    }

    // For non-hero videos, use intersection observer
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isLoaded) {
          this.loadVideo();
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(this.container);
  }

  async loadVideo() {
    try {
      // Check if user prefers reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.hideVideo();
        return;
      }

      // Check connection speed
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      let quality = 'high';
      
      if (connection) {
        // Skip video on slow connections
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          logger.info('Skipping video on slow connection');
          this.hideVideo();
          return;
        }

        // Use lower quality on 3G
        if (connection.effectiveType === '3g') {
          quality = 'low';
        }
      }

      // Get appropriate video URL
      const videoUrl = this.getVideoUrl(quality);
      if (!videoUrl) {
        logger.warn('No video URL available, using CSS fallback');
        this.hideVideo();
        return;
      }

      // Update video source
      const source = this.video.querySelector('source');
      if (source) {
        source.src = videoUrl;
      } else {
        this.video.src = videoUrl;
      }

      // Add event listeners
      this.video.addEventListener('canplaythrough', () => this.handleVideoReady(), { once: true });
      this.video.addEventListener('error', (e) => this.handleVideoError(e), { once: true });

      // Start loading
      this.video.load();

      // Timeout fallback
      setTimeout(() => {
        if (!this.isLoaded) {
          logger.warn('Video loading timeout');
          this.hideVideo();
        }
      }, 10000); // 10 second timeout

    } catch (error) {
      logger.error('Video loading failed:', error);
      this.hideVideo();
    }
  }

  handleVideoReady() {
    this.isLoaded = true;
    this.container.classList.remove('video-background--loading');
    this.container.classList.add('is-loaded');
    
    // Add class to hero section to hide animated background
    const heroSection = this.container.closest('.section--hero');
    if (heroSection) {
      heroSection.classList.add('video-loaded');
    }
    
    // Smooth cross-fade from animated background to video
    this.video.style.opacity = '0';
    this.video.play().then(() => {
      // Use a longer, smoother transition to prevent jarring changes
      this.video.style.transition = 'opacity 1.2s ease-in-out';
      this.container.style.transition = 'opacity 1.2s ease-in-out';
      
      // Gradual transition
      requestAnimationFrame(() => {
        this.video.style.opacity = '1';
      });
      
      logger.info('Video playback started with smooth transition');
    }).catch(error => {
      logger.error('Video playback failed:', error);
      this.hideVideo();
    });
  }

  handleVideoError(error) {
    logger.error('Video error:', error);
    this.loadAttempts++;

    if (this.loadAttempts < this.maxAttempts) {
      // Retry with exponential backoff
      setTimeout(() => this.loadVideo(), Math.pow(2, this.loadAttempts) * 1000);
    } else {
      this.hideVideo();
    }
  }

  hideVideo() {
    this.container.classList.add('video-background--error');
    this.container.classList.remove('video-background--loading');
    
    // Show the animated background as fallback
    const animatedBg = $('.animated-background');
    if (animatedBg) {
      animatedBg.style.display = 'block';
    }
  }

  destroy() {
    if (this.video) {
      this.video.pause();
      this.video.src = '';
      this.video.load();
    }
  }
}

export const createVideoLoader = () => {
  const loader = new VideoLoader();
  loader.init();
  return loader;
}; 