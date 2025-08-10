import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dynamically infer base path for GitHub Pages if building in Actions.
// GITHUB_REPOSITORY is in the form "owner/repo". For user/organization pages (repo name ends with .github.io)
// we keep base as '/'. For project pages, base should be '/repo-name/'.
const computeBase = () => {
  const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1]
  if (!repo) return '/'
  return repo.endsWith('.github.io') ? '/' : `/${repo}/`
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: computeBase(),
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          styled: ['styled-components'],
        },
      },
    },
    sourcemap: false,
    minify: false,
  }
})
