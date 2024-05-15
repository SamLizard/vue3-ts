import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    vue({
      template: {
        transformAssetUrls
      }
    }),
    vuetify(),
    vueI18n({
      include: [
        path.resolve(__dirname, './src/locales/**'),
        // C:\Users\noano\Documents\SAM\Learning\TypeScript\vue3-ts\node_modules\vuetify\lib\locale\he.mjs
        // path.resolve(__dirname, './node_modules/vuetify/lib/locale/**')
      ],

      
    }),

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  
})
