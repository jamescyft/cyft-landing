/**
 * Cyft Service Worker
 * Ultra-resilient caching with intelligent retry and prefetching
 */

const VERSION = 'cyft-v3-chrome-fix';
const CACHE_NAMES = {
  static: `${VERSION}-static`,
  dynamic: `${VERSION}-dynamic`,
  media: `${VERSION}-media`
};

// Intelligent cache configuration
const CACHE_CONFIG = {
  static: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    patterns: [/\.(js|css|woff2?|ttf|otf)$/i]
  },
  media: {
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    patterns: [/\.(jpg|jpeg|png|gif|svg|webp|mp4|webm)$/i]
  },
  dynamic: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    maxItems: 50
  }
};

// Network resilience configuration
const RETRY_CONFIG = {
  attempts: 3,
  delays: [1000, 2000, 4000],
  timeout: 10000
};

class ServiceWorkerController {
  constructor() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    self.addEventListener('install', event => event.waitUntil(this.onInstall()));
    self.addEventListener('activate', event => event.waitUntil(this.onActivate()));
    self.addEventListener('fetch', event => this.onFetch(event));
    self.addEventListener('message', event => this.onMessage(event));
  }

  async onInstall() {
    // Intelligently cache critical assets
    const cache = await caches.open(CACHE_NAMES.static);
    const criticalAssets = await this.detectCriticalAssets();
    
    await Promise.allSettled(
      criticalAssets.map(url => this.cacheWithRetry(cache, url))
    );
    
    await self.skipWaiting();
  }

  async onActivate() {
    // Clean old caches
    const cacheWhitelist = Object.values(CACHE_NAMES);
    const cacheNames = await caches.keys();
    
    await Promise.all(
      cacheNames
        .filter(name => name.startsWith('cyft-') && !cacheWhitelist.includes(name))
        .map(name => caches.delete(name))
    );
    
    await self.clients.claim();
  }

  onFetch(event) {
    const { request } = event;
    
    // Skip non-GET requests
    if (request.method !== 'GET') return;
    
    // Skip cross-origin requests
    const url = new URL(request.url);
    if (url.origin !== location.origin) return;
    
    // Apply intelligent caching strategy
    event.respondWith(this.handleRequest(request));
  }

  async handleRequest(request) {
    const url = new URL(request.url);
    const isNavigation = request.mode === 'navigate';
    const cacheType = this.determineCacheType(url);
    
    // Navigation requests: Network first with offline fallback
    if (isNavigation) {
      return this.networkFirstStrategy(request, CACHE_NAMES.dynamic);
    }
    
    // Static assets: Cache first with background update
    if (cacheType === 'static') {
      return this.cacheFirstStrategy(request, CACHE_NAMES.static);
    }
    
    // Media assets: Cache first
    if (cacheType === 'media') {
      return this.cacheFirstStrategy(request, CACHE_NAMES.media);
    }
    
    // Everything else: Network first
    return this.networkFirstStrategy(request, CACHE_NAMES.dynamic);
  }

  async cacheFirstStrategy(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      // Update cache in background
      this.fetchAndCache(request, cache).catch(() => {});
      return cached;
    }
    
    // Not in cache, fetch with retry
    return this.fetchWithRetry(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    }).catch(() => this.createOfflineResponse(request));
  }

  async networkFirstStrategy(request, cacheName) {
    try {
      const response = await this.fetchWithRetry(request);
      
      if (response.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, response.clone());
      }
      
      return response;
    } catch (error) {
      // Try cache
      const cached = await caches.match(request);
      if (cached) return cached;
      
      // Generate offline response
      return this.createOfflineResponse(request);
    }
  }

  async fetchWithRetry(request, attempt = 0) {
    const { attempts, delays, timeout } = RETRY_CONFIG;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(request.clone(), {
        signal: controller.signal,
        // Force fresh on retries
        cache: attempt === 0 ? 'default' : 'reload'
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok && attempt < attempts - 1) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return response;
    } catch (error) {
      if (attempt >= attempts - 1) throw error;
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, delays[attempt]));
      return this.fetchWithRetry(request, attempt + 1);
    }
  }

  async fetchAndCache(request, cache) {
    const response = await this.fetchWithRetry(request);
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  }

  determineCacheType(url) {
    const pathname = url.pathname;
    
    for (const [type, config] of Object.entries(CACHE_CONFIG)) {
      if (config.patterns?.some(pattern => pattern.test(pathname))) {
        return type;
      }
    }
    
    return 'dynamic';
  }

  createOfflineResponse(request) {
    const url = new URL(request.url);
    const accept = request.headers.get('accept') || '';
    
    // HTML offline page
    if (accept.includes('text/html')) {
      return new Response(this.getOfflineHTML(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    // CSS fallback
    if (url.pathname.endsWith('.css')) {
      return new Response(this.getOfflineCSS(), {
        headers: { 'Content-Type': 'text/css; charset=utf-8' }
      });
    }
    
    // JS fallback
    if (url.pathname.endsWith('.js')) {
      return new Response(this.getOfflineJS(), {
        headers: { 'Content-Type': 'application/javascript; charset=utf-8' }
      });
    }
    
    // Generic offline response
    return new Response('', { status: 503 });
  }

  async detectCriticalAssets() {
    // Intelligently detect critical assets from index.html
    const assets = ['/', '/index.html', '/favicon.svg'];
    
    try {
      const response = await fetch('/');
      const html = await response.text();
      
      // Extract CSS and JS files
      const cssMatches = html.matchAll(/href="([^"]+\.css)"/g);
      const jsMatches = html.matchAll(/src="([^"]+\.js)"/g);
      
      for (const match of cssMatches) assets.push(match[1]);
      for (const match of jsMatches) assets.push(match[1]);
    } catch (error) {
      console.error('[SW] Failed to detect critical assets:', error);
    }
    
    return [...new Set(assets)];
  }

  async cacheWithRetry(cache, url) {
    try {
      const response = await this.fetchWithRetry(new Request(url));
      if (response.ok) {
        await cache.put(url, response);
      }
    } catch (error) {
      console.warn(`[SW] Failed to cache ${url}:`, error.message);
    }
  }

  async onMessage(event) {
    const { type, payload } = event.data;
    
    switch (type) {
      case 'SKIP_WAITING':
        await self.skipWaiting();
        break;
      
      case 'CLEAR_CACHE':
        await this.clearAllCaches();
        break;
      
      case 'CACHE_URLS':
        await this.cacheUrls(payload.urls);
        break;
    }
  }

  async clearAllCaches() {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
  }

  async cacheUrls(urls) {
    const cache = await caches.open(CACHE_NAMES.static);
    await Promise.allSettled(
      urls.map(url => this.cacheWithRetry(cache, url))
    );
  }

  getOfflineHTML() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cyft - Offline</title>
    <style>
      body {
        font-family: -apple-system, system-ui, sans-serif;
        background: #fff;
        color: #1a1a1a;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        text-align: center;
        padding: 2rem;
      }
      .offline-container {
        max-width: 600px;
      }
      h1 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      p {
        font-size: 1.25rem;
        line-height: 1.6;
        color: #666;
        margin-bottom: 2rem;
      }
      .retry-btn {
        display: inline-block;
        padding: 1rem 2rem;
        background: #1a1a1a;
        color: white;
        text-decoration: none;
        border-radius: 0.5rem;
        font-weight: 600;
        transition: transform 0.2s;
      }
      .retry-btn:hover {
        transform: translateY(-2px);
      }
    </style>
</head>
<body>
    <div class="offline-container">
        <h1>You're Offline</h1>
        <p>The Cyft experience requires an internet connection. Please check your connection and try again.</p>
        <a href="/" class="retry-btn" onclick="location.reload(); return false;">Try Again</a>
    </div>
</body>
</html>`;
  }

  getOfflineCSS() {
    return `
/* Offline CSS - Maintains visual consistency */
body { background: #fff; color: #1a1a1a; font-family: system-ui, sans-serif; }
.section { background: #fff; padding: 2rem; }
.demo__container { background: #f8f8f8; padding: 2rem; border-radius: 0.5rem; }
.btn { background: #1a1a1a; color: white; padding: 1rem 2rem; border-radius: 0.5rem; }
[data-loading-indicator] { position: fixed; bottom: 20px; right: 20px; }`;
  }

  getOfflineJS() {
    return `
console.log('[Cyft] Running in offline mode');
// Minimal offline functionality
document.addEventListener('DOMContentLoaded', () => {
  const demo = document.getElementById('demo-container');
  if (demo && !demo.querySelector('[data-offline-message]')) {
    const msg = document.createElement('div');
    msg.setAttribute('data-offline-message', '');
    msg.innerHTML = '<p style="text-align:center;color:#666;">Connection required for interactive demo</p>';
    demo.prepend(msg);
  }
});`;
  }
}

// Initialize the service worker
new ServiceWorkerController(); 