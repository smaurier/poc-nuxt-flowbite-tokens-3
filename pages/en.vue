<template>
  <div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-xl px-lg py-xl text-foreground">
    <header class="flex flex-col gap-md">
      <h1 class="text-2xl font-bold">Explore our stays across Europe</h1>
      <p class="text-base text-muted">
        Find carefully curated accommodations, from coastal retreats to vibrant city lofts, designed to make your
        journey unforgettable.
      </p>
    </header>

    <section class="flex flex-col gap-md">
      <h2 class="text-xl font-semibold text-foreground">Comfort with local flair</h2>
      <p class="text-base text-muted">
        Each listing offers thoughtful amenities, inspiring interiors, and easy access to neighborhood highlights for a
        truly immersive experience.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "European accommodations",
  link: [
    { rel: "canonical", href: "https://example.com/en/" },
    { rel: "alternate", hreflang: "fr", href: "https://example.com/fr/" },
    { rel: "alternate", hreflang: "en", href: "https://example.com/en/" },
    { rel: "alternate", hreflang: "x-default", href: "https://example.com/" }
  ]
});
</script>
