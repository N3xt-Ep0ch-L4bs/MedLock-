import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Ensure WASM files are served with correct MIME type
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
    fs: {
      // Allow serving files from node_modules for WASM
      allow: ['..'],
    },
  },
  optimizeDeps: {
    // Exclude WASM from optimization to avoid bundling issues
    exclude: ['@mysten/walrus-wasm'],
  },
  assetsInclude: ['**/*.wasm'],
})

