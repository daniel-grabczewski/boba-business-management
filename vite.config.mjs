import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import EnvironmentPlugin from 'vite-plugin-environment'
import dotenv from 'dotenv'

console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('VITE_APP_BASE_URL:', process.env.VITE_APP_BASE_URL)

// Load the correct environment variables
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
})

export default defineConfig({
  base: process.env.VITE_APP_BASE_URL || '/',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: '404.html', dest: '.' }],
    }),
    EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
