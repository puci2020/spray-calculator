// // nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@nuxtjs/tailwindcss', '@vesp/nuxt-fontawesome', '@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Kalkulator Oprysku',
      short_name: 'KalkulatorOprysku',
      description: 'Kalkulator do obliczania ilości środka i wody na oprysk',
      theme_color: '#16a34a',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/calculator-192-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/calculator-512-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      globPatterns: ['images/background-image.jpg', 'calculator-192-192.png', 'calculator-512-512.png'],
      navigateFallback: '/index.html',
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'html-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: /\/_nuxt\/.*\.js$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'js-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: /\/_nuxt\/.*\.css$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'css-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
            plugins: [
              {
                cacheWillUpdate: async ({ request, response }) => {
                  if (response.type === 'cors' || response.type === 'opaque') {
                    return response;
                  }
                  const contentType = response.headers.get('Content-Type');
                  if (contentType && contentType.includes('text/css')) {
                    return response;
                  }
                  return null;
                },
              },
            ],
          },
        },
        {
          urlPattern: /\/_nuxt\/.*\.(woff|woff2|ttf|eot|otf)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'font-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: /\/images\/background-image\.jpg$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'background-image-cache',
            expiration: {
              maxEntries: 1,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 7 * 24 * 60 * 60,
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
});


// nuxt.config.ts
// export default defineNuxtConfig({
//   compatibilityDate: '2024-11-01',
//   modules: [
//     '@nuxtjs/tailwindcss',
//     '@vesp/nuxt-fontawesome',
//     '@vite-pwa/nuxt',
//   ]
// });
