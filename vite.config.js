import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import {VitePWA} from "vite-plugin-pwa";
import { version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      svgr({
        exportAsDefault: true, // Включает экспорт по умолчанию
      }),
      VitePWA({
          registerType: 'autoUpdate',
          includeAssets: [
              'favicon/apple-touch-icon.png',
              'favicon/favicon-32x32.png',
              'favicon/favicon-16x16.png',
              'favicon/favicon.svg'
          ],
          manifest: {
              name: 'ЧекАп: моё здоровье',
              short_name: 'ЧекАп',
              description: 'Прогрессивное веб-приложение для отслеживания здоровья.',
              start_url: '/',
              scope: '/',
              display: 'standalone',
              background_color: '#3d7df5',
              theme_color: '#3d7df5',
              orientation: 'portrait',
              icons: [
                  {
                      src: '/favicon/android-chrome-192x192.png',
                      sizes: '192x192',
                      type: 'image/png'
                  },
                  {
                      src: '/favicon/android-chrome-512x512.png',
                      sizes: '512x512',
                      type: 'image/png'
                  },
                  {
                      src: '/favicon/favicon-masked-512x512.png',
                      sizes: '512x512',
                      type: 'image/png',
                      purpose: 'maskable'
                  }
              ]
          },
          workbox: {
              runtimeCaching: [
                  {
                      urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif|woff|woff2|ttf|otf|json)$/,
                      handler: 'CacheFirst',
                      options: {
                          cacheName: 'assets-cache',
                      },
                  },
              ],
          },
      }),
    ],
    define: {
        __APP_VERSION__: JSON.stringify(version),
    },
})
