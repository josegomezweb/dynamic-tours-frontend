import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/dynamic/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/parse-passport': {
        target: 'https://primary-production-3ba0.up.railway.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/parse-passport/, '/webhook/dynamic-tours-pasaportes-a032ae45'),
      }
    }
  }
})
