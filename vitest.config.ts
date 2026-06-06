import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    include: ['tests/unit/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
    exclude: ['tests/e2e/**', 'node_modules', '.next'],
    env: {
      NEXT_PUBLIC_API_URL: 'http://localhost:1338',
      NEXT_PUBLIC_BASE_DOMAIN: 'schoolgo.com.au',
      NEXT_PUBLIC_PARENT_URL: 'https://parent.schoolgo.com.au',
      NEXT_PUBLIC_AGENT_URL: 'https://agent.schoolgo.com.au',
      NEXT_PUBLIC_SCHOOL_URL: 'https://school.schoolgo.com.au',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
