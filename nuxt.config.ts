import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ["@vite-pwa/nuxt", "@vesp/nuxt-fontawesome",
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-1741709382102643',
      onPageLoad: true,
      test: false
    }]
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  fontawesome: {
    icons: {
      solid: ['droplet', 'ruler', 'water', 'spray-can', 'vial'] 
    }
  },
  css: ['~/assets/css/main.css'],
  pwa: {
    manifest: {
      name: "Kalkulator oprysku",
      short_name: "Kalkulator oprysku",
      icons: [
        {
          src: "icons/calculator-64-64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icons/calculator-144-144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icons/calculator-192-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/calculator-512-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
})