// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  css: ['../assets/css/tailwind.css'],
  build: {
    transpile: ['flowbite-vue']
  },
  nitro: {
    serverAssets: [
      {
        baseName: 'tokens',
        dir: 'server/tokens'
      }
    ]
  },
  vite: {
    ssr: {
      noExternal: ['flowbite-vue']
    }
  }
})
