import { readdir, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const DEFAULT_TENANT = 'acme'
export type ThemeMode = 'light' | 'dark'

type RawTenantTokens = Record<string, unknown>

let tokensByTenantPromise: Promise<Record<string, TenantTokens>> | null = null

const TOKENS_DIRECTORY = join(dirname(fileURLToPath(import.meta.url)), '../../assets/tokens')

async function resolveTokensByTenant(): Promise<Record<string, TenantTokens>> {
  if (tokensByTenantPromise) {
    return tokensByTenantPromise
  }

  tokensByTenantPromise = loadTokensFromStorage().catch((error) => {
    tokensByTenantPromise = null
    throw error
  })

  return tokensByTenantPromise
}

async function loadTokensFromStorage(): Promise<Record<string, TenantTokens>> {
  let files

  try {
    files = await readdir(TOKENS_DIRECTORY, { withFileTypes: true })
  } catch (error) {
    console.error(`Unable to access tokens directory at "${TOKENS_DIRECTORY}"`, error)
    throw error
  }

  const entries = await Promise.all(
    files
      .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
      .map(async (entry) => {
        const tenantId = entry.name.replace(/\.json$/, '')
        const absolutePath = join(TOKENS_DIRECTORY, entry.name)

        try {
          const raw = await readFile(absolutePath, 'utf-8')
          const source = JSON.parse(raw) as RawTenantTokens
          const normalized = normalizeTokens(source)

          return [tenantId, normalized] as const
        } catch (error) {
          console.error(`Failed to read tokens for tenant "${tenantId}":`, error)
          return null
        }
      })
  )

  const tokensByTenant = Object.fromEntries(
    entries.filter((entry): entry is readonly [string, TenantTokens] => Array.isArray(entry))
  )

  if (!tokensByTenant[DEFAULT_TENANT]) {
    throw new Error(`Missing tokens for default tenant "${DEFAULT_TENANT}"`)
  }

  return tokensByTenant
}

export interface ThemeVariant {
  vars: Record<string, string>
}

export interface DarkThemeVariant extends ThemeVariant {
  enabled: boolean
}

export interface TenantTokenMeta {
  defaultTheme: ThemeMode
  label?: string
}

export interface TenantTokens {
  meta: TenantTokenMeta
  light: ThemeVariant
  dark?: DarkThemeVariant
}

export async function loadTokens(tenant: string): Promise<TenantTokens> {
  const tokensByTenant = await resolveTokensByTenant()
  const normalizedTenant = tenant.toLowerCase()
  const tokens = tokensByTenant[normalizedTenant]

  if (tokens) {
    return tokens
  }

  if (normalizedTenant !== DEFAULT_TENANT && tokensByTenant[DEFAULT_TENANT]) {
    return tokensByTenant[DEFAULT_TENANT]
  }

  throw new Error(`Unable to load tokens for tenant "${tenant}"`)
}

export function tokensToCssVars(tokens: TenantTokens): string {
  const cssBlocks: string[] = []
  const lightVars = serializeVars(tokens.light.vars)

  cssBlocks.push(`:root{${lightVars}}`)

  if (tokens.dark?.enabled && Object.keys(tokens.dark.vars).length > 0) {
    cssBlocks.push(`:root[data-theme="dark"]{${serializeVars(tokens.dark.vars)}}`)
  }

  return cssBlocks.join('\n')
}

function normalizeTokens(raw: Record<string, unknown>): TenantTokens {
  const metaSource = (raw.meta ?? {}) as Record<string, unknown>
  const lightSource = (raw.light ?? {}) as Record<string, unknown>
  const darkSource = (raw.dark ?? {}) as Record<string, unknown>

  const defaultTheme = metaSource.defaultTheme === 'dark' ? 'dark' : 'light'
  const lightVars = extractVars(lightSource.vars)
  const darkVars = extractVars(darkSource.vars)
  const darkEnabled = Boolean(darkSource.enabled)

  const tokens: TenantTokens = {
    meta: {
      defaultTheme,
      label: typeof metaSource.label === 'string' ? metaSource.label : undefined
    },
    light: {
      vars: lightVars
    }
  }

  if (darkEnabled) {
    tokens.dark = {
      enabled: true,
      vars: darkVars
    }
  }

  return tokens
}

function extractVars(source: unknown): Record<string, string> {
  if (!source || typeof source !== 'object') {
    return {}
  }

  return Object.fromEntries(
    Object.entries(source as Record<string, unknown>).flatMap(([key, value]) =>
      typeof value === 'string' ? [[key, value]] : []
    )
  )
}

function serializeVars(variables: Record<string, string>): string {
  return Object.entries(variables)
    .map(([token, value]) => `${token}:${value};`)
    .join('')
}
