import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch:{
      usePolling:true
    },
    proxy: {
      '/api': 'http://127.0.0.1:8000', // Proxy para la API de Django
    },
  },
  resolve: {
    alias: [
      { find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
      { find: '@config', replacement: fileURLToPath(new URL('./src/config', import.meta.url)) },
      { find: '@stores', replacement: fileURLToPath(new URL('./src/stores', import.meta.url)) },
      { find: '@types', replacement: fileURLToPath(new URL('./src/types', import.meta.url)) },
      { find: '@lib', replacement: fileURLToPath(new URL('./src/lib', import.meta.url)) },
      { find: '@routes', replacement: fileURLToPath(new URL('./src/app/routes', import.meta.url)) },
    ]
  },

  test: {
    globals: true,
    environment: "jsdom", // Needed for React component testing
  },
})
