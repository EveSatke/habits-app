import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    exclude: ['**/e2e/**', '**/node_modules/**'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
});
