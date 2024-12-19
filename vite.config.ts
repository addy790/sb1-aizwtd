import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  define: {
    'process.env.VITE_FB_APP_ID': JSON.stringify('1755893458493935')
  }
});