import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages - change 'OssiclesVisualizer' to your repository name
  // If your repo is at username.github.io/repo-name, use '/repo-name/'
  // If your repo is at username.github.io (user page), use '/'
  base: process.env.NODE_ENV === 'production' ? '/OssiclesVisualizer/' : '/',
})

