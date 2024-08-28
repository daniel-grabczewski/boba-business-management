import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  base:
    process.env.NODE_ENV === 'production' ? '/boba-business-management/' : '/',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: '404.html', dest: '.' }],
    }),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
