import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const DEFAULT_TENANT = 'acme'
export type ThemeMode = 'light' | 'dark'

const TOKENS_DIRECTORY = join(process.cwd(), 'server', 'tokens')

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
  try {
    const source = await readTenantSource(tenant)
    const parsed = JSON.parse(source) as Record<string, unknown>
    return normalizeTokens(parsed)
  } catch (error) {
    if (tenant !== DEFAULT_TENANT) {
      return loadTokens(DEFAULT_TENANT)
    }

    throw error
  }
}

async function readTenantSource(tenant: string): Promise<string> {
  const filePath = join(TOKENS_DIRECTORY, `${tenant}.json`)

  try {
    return await readFile(filePath, 'utf8')
  } catch (filesystemError) {
    const storage = typeof useStorage === 'function' ? useStorage<string>('assets:server') : null

    if (storage) {
      try {
        const stored = await storage.getItem(`tokens/${tenant}.json`)

        if (typeof stored === 'string') {
          return stored
        }
      } catch {
        // Ignore and fall back to throwing the filesystem error below.
      }
    }

    throw filesystemError
  }
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
