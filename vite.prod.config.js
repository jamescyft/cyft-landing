import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: './',
    base: '/',
    
    build: {
        outDir: './dist-new',
        emptyOutDir: true,
        
        // Single CSS file
        cssCodeSplit: false,
        
        // Asset optimization
        assetsInlineLimit: 4096, // 4KB
        
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index-new.html')
            },
            output: {
                // Clean file names
                assetFileNames: 'assets/[name]-[hash][extname]',
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
                
                // Manual chunks for better caching
                manualChunks: {
                    vendor: ['./src/js/features/interactive-demo.js']
                }
            }
        },
        
        // Minification
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    },
    
    css: {
        postcss: './postcss.config.js'
    },
    
    server: {
        port: 3002,
        open: '/index-new.html'
    },
    
    preview: {
        port: 4002
    },
    
    define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
});