import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssMinify: true,
    chunkSizeWarningLimit: 850,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Put three.js & fiber in a separate chunk as it's very large and lazy-loaded
          if (id.includes('three') || id.includes('@react-three')) {
            return 'vendor-three';
          }
          // Put Framer Motion, GSAP and Lenis in an animations chunk
          if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) {
            return 'vendor-anim';
          }
          // Put core react dependencies in vendor-react
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('react-helmet-async')) {
            return 'vendor-react';
          }
          // Put other vendor dependencies in misc
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'react-toastify',
      'react-helmet-async',
    ]
  }
})

