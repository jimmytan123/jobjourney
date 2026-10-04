import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync, readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { fileURLToPath } from 'node:url';

// Read the API port without loading the backend's NODE_ENV into Vite.
const envPath = fileURLToPath(new URL('../.env', import.meta.url));
const env = existsSync(envPath) ? parseEnv(readFileSync(envPath, 'utf8')) : {};
const apiPort = process.env.PORT || env.PORT || 5100;

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: `http://localhost:${apiPort}`,
        changeOrigin: true,
      },
    },
  },
});
