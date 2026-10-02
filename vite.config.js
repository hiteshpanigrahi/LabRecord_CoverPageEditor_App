import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: true, // Exposes server on local Wi-Fi network (0.0.0.0)
    port: 5173,
  },
})
