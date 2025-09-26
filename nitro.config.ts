import { fileURLToPath } from 'node:url'

const tokensDir = fileURLToPath(new URL('./server/tokens', import.meta.url))

export default defineNitroConfig({
  serverAssets: [
    {
      baseName: 'tokens',
      dir: tokensDir
    }
  ]
})
