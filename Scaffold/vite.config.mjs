import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import unoCSS from 'unocss/vite'

import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [eslintPlugin(), unoCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: './src/app.js',
      name: 'app',
      fileName: 'app'
    }
  }
})
