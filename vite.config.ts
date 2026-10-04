import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: '/InsightForge/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './client/src'),
    },
  },
  root: 'client',
  publicDir: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})
