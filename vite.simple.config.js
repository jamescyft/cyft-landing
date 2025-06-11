import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  build: {
    outDir: './dist-simple',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'simple.html')
      }
    }
  },
  server: {
    port: 3001,
    open: '/simple.html'
  },
  preview: {
    port: 4001
  }
}); 