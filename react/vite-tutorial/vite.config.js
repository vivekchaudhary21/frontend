import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import terser from '@rollup/plugin-terser'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: [
        {
          entryFileNames: 'finrisk.js',
          format: 'es',
        },
        {
          entryFileNames: 'finrisk.min.js',
          format: 'es',
          plugins: [terser()],
        },
        {
          assetFileNames: 'finrisk.[ext]',
        },
        {
          assetFileNames: 'finrisk.min.[ext]',
        },
      ],
    },
  },
})
