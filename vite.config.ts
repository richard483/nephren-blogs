import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    federation({
      name: 'nephren-blog',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'react-ga4'],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@variables': path.resolve(__dirname, 'src/_variables.scss'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@component': path.resolve(__dirname, 'src/component'),
    },
  },
  server: {
    port: 3001,
  },
  build: {
    target: 'esnext',
  },
});
