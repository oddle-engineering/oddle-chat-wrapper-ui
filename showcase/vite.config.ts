import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@oddle/chat-wrapper-ui': path.resolve(__dirname, '../src/index.ts'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});