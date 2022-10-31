import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { appName, archiveName, archiveHashName } from './getNames';

export default ({ mode }) => defineConfig({
  base: '',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    'window.DIRNAME_APP': `"${appName}"`,
    'window.ARCHIVE_NAME': `"${archiveName}"`,
    'window.ARCHIVE_HASH_NAME': `"${archiveHashName}"`,
    'window.MODE': `"${mode}"`,
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
