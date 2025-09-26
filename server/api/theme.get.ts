import { defineEventHandler } from 'h3'
import { DEFAULT_TENANT, loadTokens, tokensToCssVars } from '../utils/theme'

export default defineEventHandler(async (event) => {
  const contextTenant = event.context.tenant

  if (contextTenant) {
    return {
      id: contextTenant.id,
      theme: contextTenant.theme,
      tokens: contextTenant.tokens,
      css: contextTenant.css ?? tokensToCssVars(contextTenant.tokens),
      darkEnabled: Boolean(contextTenant.tokens?.dark?.enabled)
    }
  }

  const fallbackTokens = await loadTokens(DEFAULT_TENANT)
  const fallbackTheme = fallbackTokens.meta.defaultTheme === 'dark' ? 'dark' : 'light'

  return {
    id: DEFAULT_TENANT,
    theme: fallbackTheme,
    tokens: fallbackTokens,
    css: tokensToCssVars(fallbackTokens),
    darkEnabled: Boolean(fallbackTokens.dark?.enabled)
  }
})
