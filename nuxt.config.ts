// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      title: "Goatless",
      viewport: "width=device-width, initial-scale=1",
    }
  },
  devtools: { enabled: false },
  compatibilityDate: "2024-08-07",
  telemetry: false,
  modules: [
    "@nuxt/image",
    "nuxt-svgo",
    "nuxt-icon",
    "@hypernym/nuxt-gsap",
    "@nuxt/content"
  ],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  vite: {
    server: {
      watch: {
        usePolling: true // required on Windows
      }
    }
  },
  nitro: {
    firebase: {
      gen: 2
    }
  },
  svgo: {
    autoImportPath: false
  }
});