import { defineEventHandler, getHeader, getQuery } from 'h3'
import {
  DEFAULT_TENANT,
  loadTokens,
  tokensToCssVars,
  type ThemeMode
} from '../utils/theme'

const SUPPORTED_TENANTS = new Set(['acme', 'beta', 'gamma'])

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const queryTenant = normalizeTenant(query.tenant)
  const hostTenant = normalizeTenantFromHost(
    getHeader(event, 'x-forwarded-host') ?? getHeader(event, 'host')
  )

  const tenantId = queryTenant ?? hostTenant ?? DEFAULT_TENANT
  const tokens = await loadTokens(tenantId)
  const css = tokensToCssVars(tokens)
  const theme = normalizeTheme(tokens.meta.defaultTheme)

  event.context.tenant = {
    id: tenantId,
    theme,
    tokens,
    css
  }
})

function normalizeTenant(input: unknown): string | null {
  if (Array.isArray(input)) {
    return normalizeTenant(input[0])
  }

  if (typeof input !== 'string') {
    return null
  }

  const candidate = input.trim().toLowerCase()
  return SUPPORTED_TENANTS.has(candidate) ? candidate : null
}

function normalizeTenantFromHost(headerValue: string | null | undefined): string | null {
  if (!headerValue) {
    return null
  }

  const [firstHost] = headerValue.split(',')
  if (!firstHost) {
    return null
  }

  const hostname = firstHost.trim().split(':')[0]?.toLowerCase()
  if (!hostname) {
    return null
  }

  if (SUPPORTED_TENANTS.has(hostname)) {
    return hostname
  }

  const [subdomain] = hostname.split('.')
  return subdomain && SUPPORTED_TENANTS.has(subdomain) ? subdomain : null
}

function normalizeTheme(theme: ThemeMode): ThemeMode {
  return theme === 'dark' ? 'dark' : 'light'
}
