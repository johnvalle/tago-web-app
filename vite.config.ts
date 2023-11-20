import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
    }),
    createHtmlPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  root: 'src',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ["fake-indexeddb/auto", "./test/setup.ts"]
  },
});
