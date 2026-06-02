import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/dislyte-guide/' : '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/@supabase') || id.includes('node_modules/ws') || id.includes('node_modules/isomorphic-ws')) {
            return 'vendor-supabase'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
