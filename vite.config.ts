import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig(() => ({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
  },
  test: {
    globals: true,
    environment: 'node',
  },
  build: {
    emptyOutDir: false,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'evan-sutherland-sdk',
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
}))