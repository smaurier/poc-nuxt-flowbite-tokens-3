<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) =>
    titleChunk ? `${titleChunk} · Flowbite Nuxt` : 'Flowbite Nuxt',
  htmlAttrs: {
    lang: 'fr'
  }
})
</script>
