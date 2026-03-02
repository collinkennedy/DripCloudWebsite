import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        prototype: resolve(__dirname, 'prototype.html'),
      },
    },
  },
  server: {
    allowedHosts: ['dripcloud.134-209-58-180.nip.io'],
  },
})
