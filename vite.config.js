import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Weather-app/',  // Replace with your repository name
  build: {
    outDir: 'docs',  // Changed from 'dist' to 'docs' for GitHub Pages
    assetsDir: 'assets',
    sourcemap: true
  }
})
