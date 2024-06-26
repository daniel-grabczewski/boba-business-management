// vite.config.mjs
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import EnvironmentPlugin from 'vite-plugin-environment'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/boba-business-management-demo/' : '/',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: '404.html', dest: '.' }],
    }),
    EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV
    })
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
