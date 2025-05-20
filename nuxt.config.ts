import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head: {
      title: 'Kalkulator oprysku dla rolników - Oblicz dawkę i wodę na hektar',
      htmlAttrs: { lang: 'pl' },
      meta: [
          { name: 'google-adsense-account', content: 'ca-pub-1741709382102643' },
        { name: 'description', content: 'Darmowy kalkulator oprysku dla rolników. Oblicz ilość środka ochrony roślin, ilość wody na hektar i liczbę napełnień opryskiwacza. Działa offline!' },
        { name: 'keywords', content: 'kalkulator oprysku, oprysk, rolnictwo, dawka na hektar, ilość wody, środek ochrony roślin, opryskiwacz, obliczanie oprysków' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index, follow' },
        { charset: 'utf-8' },
      ],
      link: [
        { rel: 'canonical', href: 'https://twojadomena.pl/' },
      ]
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ["@vite-pwa/nuxt", "@vesp/nuxt-fontawesome", "@nuxt/image"],
  image: {
    domains: ['yourdomain.pl'],
    dir: 'public',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },
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