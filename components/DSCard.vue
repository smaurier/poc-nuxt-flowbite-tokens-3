<template>
  <article class="flex flex-col gap-sm rounded-lg border border-border bg-background p-lg shadow-sm">
    <header v-if="title || $slots.header" class="flex flex-col gap-xs">
      <h2 v-if="title" class="text-lg font-semibold text-foreground">{{ title }}</h2>
      <p v-if="description" class="text-sm text-muted">{{ description }}</p>
      <slot v-if="$slots.header" name="header" />
    </header>
    <div class="text-base text-foreground">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="mt-sm flex items-center gap-sm">
      <slot name="footer" />
    </footer>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>
