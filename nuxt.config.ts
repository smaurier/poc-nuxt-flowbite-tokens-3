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
  hooks: {
    'vite:extendConfig': async (config) => {
      // Chargement dynamique : le paquet @tailwindcss/vite n'expose qu'une entrée ESM,
      // ce qui casse l'import statique pendant le chargement CJS du nuxt.config.
      const { default: tailwindcss } = await import('@tailwindcss/vite')
      config.plugins = config.plugins || []
      config.plugins.push(tailwindcss())
    }
  },
  vite: {
    ssr: {
      noExternal: ['flowbite-vue']
    }
  }
})
