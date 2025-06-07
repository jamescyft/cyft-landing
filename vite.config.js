import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  publicDir: './public',
  
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        // Code splitting for better caching
        manualChunks(id) {
          // Separate vendor chunks
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // Separate large modules
          if (id.includes('scenarios.js')) {
            return 'scenarios';
          }
          if (id.includes('interactive-demo.js')) {
            return 'demo';
          }
        }
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
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500
  },
  
  server: {
    port: 3000,
    open: true,
    cors: true
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