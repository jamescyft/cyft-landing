import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './public',
  publicDir: '../src/assets',
  
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html')
      }
    },
    // Optimize for production
    minify: 'terser',
    cssMinify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000
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