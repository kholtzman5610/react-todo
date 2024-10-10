import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Example: custom options for Sass
        additionalData: `@import "src/styles/variables.scss";` // if you have global variables
      },
    },
  },
});
