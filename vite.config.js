import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  publicDir: 'public',
  base: '/',
  
  build: {
    outDir: './dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    // Disable module preload to prevent Chrome timing issues
    modulePreload: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        // Emit a single self-contained bundle so the site works under
        // strict `script-src 'self'` CSPs (no blob: / eval required).
        inlineDynamicImports: true,
        manualChunks: undefined
      }
    },
    // Optimize for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        safari10: true
      }
    },
    cssMinify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500
  },
  
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  
  preview: {
    port: 4173,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    }
  },
  
  css: {
    devSourcemap: true,
    postcss: './postcss.config.js'
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@css': resolve(__dirname, './src/css'),
      '@js': resolve(__dirname, './src/js'),
      '@config': resolve(__dirname, './src/config'),
      '@utils': resolve(__dirname, './src/js/utils'),
      '@modules': resolve(__dirname, './src/js/modules')
    }
  },
  
  optimizeDeps: {
    exclude: ['src/js/main.js']
  }
}); 