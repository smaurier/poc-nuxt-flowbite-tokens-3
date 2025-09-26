import { createError, defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  const tenant = event.context.tenant

  if (!tenant) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Impossible de déterminer le thème courant.'
    })
  }

  return {
    id: tenant.id,
    theme: tenant.theme,
    tokens: tenant.tokens,
    darkEnabled: Boolean(tenant.tokens?.dark?.enabled)
  }
})
