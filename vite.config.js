import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import localApi from './scripts/vite-local-api.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), localApi()],
})
