// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: '.',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/css/tailwind.css'],
  build: {
    transpile: ['flowbite-vue']
  },
  nitro: {
    serverAssets: [
      {
        baseName: 'tokens',
        dir: 'tokens'
      }
    ]
  },
  vite: {
    ssr: {
      noExternal: ['flowbite-vue']
    }
  }
})
