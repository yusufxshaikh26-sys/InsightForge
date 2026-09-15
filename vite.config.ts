import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.NODE_ENV === 'production'

export default defineConfig({
  base: isGitHubPages ? '/InsightForge/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './client/src'),
      '@components': resolve(__dirname, './client/src/components'),
      '@modules': resolve(__dirname, './client/src/modules'),
      '@services': resolve(__dirname, './client/src/services'),
      '@hooks': resolve(__dirname, './client/src/hooks'),
      '@types': resolve(__dirname, './client/src/types'),
      '@lib': resolve(__dirname, './client/src/lib'),
      '@styles': resolve(__dirname, './client/src/styles'),
    }
  },
  root: 'client',
  publicDir: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
