import path from "node:path";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Same-origin in development. Anything under /api goes to the backend
      // so the browser never makes a cross-origin request.
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: false,
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/{vite,eslint}.config.*',
      '.agents/**',
    ],
    onConsoleLog(log) {
      return !log.includes("React Router Future Flag Warning");
    },
    env: {
      DEBUG_PRINT_LIMIT: '0', // Suppress DOM output that exceeds AI context windows
    },
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(import.meta.dirname, "./src") },
      // lottie-react's export barrel can include full/svg engines. Keep every
      // imported engine on the expression-free build to preserve script CSP.
      { find: /^lottie-web$/, replacement: path.resolve(import.meta.dirname, "node_modules/lottie-web/build/player/lottie_light.js") },
      { find: /^lottie-web\/build\/player\/lottie_svg\.js$/, replacement: path.resolve(import.meta.dirname, "node_modules/lottie-web/build/player/lottie_light.js") },
    ],
  },
}));