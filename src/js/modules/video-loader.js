/**
 * Video Loader Module - DISABLED
 * Video background removed for performance and layout stability
 * Keeping module for compatibility but disabling all functionality
 */

import { logger } from '../../utils/logger.js';

export class VideoLoader {
  constructor() {
    this.isLoaded = true; // Always consider "loaded" since no video
    logger.info('Video background disabled for improved performance');
  }

  init() {
    // Video functionality disabled - using CSS animated background only
    logger.info('VideoLoader: No video to load, using CSS animated background');
    return;
  }

  destroy() {
    // No cleanup needed since no video functionality
    logger.info('VideoLoader: No cleanup needed');
  }
}

export const createVideoLoader = () => {
  const loader = new VideoLoader();
  loader.init();
  return loader;
}; 