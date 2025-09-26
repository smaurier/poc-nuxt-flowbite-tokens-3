import type { ThemeMode, TenantTokens } from '../server/utils/theme'

declare module 'h3' {
  interface H3EventContext {
    tenant?: {
      id: string
      theme: ThemeMode
      tokens: TenantTokens
      css: string
    }
  }
}
