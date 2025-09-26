<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
interface TenantHeadPayload {
  id: string
  theme: 'light' | 'dark'
  css: string
}

const event = process.server ? useRequestEvent() : null
const initialTenant = event?.context.tenant

const tenantState = useState<TenantHeadPayload>('tenant', () => ({
  id: initialTenant?.id ?? 'acme',
  theme: initialTenant?.theme ?? 'light',
  css: initialTenant?.css ?? ''
}))

if (process.server && initialTenant) {
  tenantState.value = {
    id: initialTenant.id,
    theme: initialTenant.theme,
    css: initialTenant.css
  }
}

useHead(() => ({
  titleTemplate: (titleChunk?: string) =>
    titleChunk ? `${titleChunk} · Flowbite Nuxt` : 'Flowbite Nuxt',
  htmlAttrs: {
    lang: 'fr',
    'data-tenant': tenantState.value.id,
    'data-theme': tenantState.value.theme
  },
  style: tenantState.value.css
    ? [
        {
          id: 'tenant-tokens',
          key: 'tenant-tokens',
          innerHTML: tenantState.value.css,
          tagPriority: 'critical'
        }
      ]
    : [],
  dangerouslyDisableSanitizersByTagID: {
    'tenant-tokens': ['innerHTML']
  }
}))
</script>
