<template>
  <div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-xl px-lg py-xl text-foreground">
    <header class="flex flex-col gap-md">
      <h1 class="text-2xl font-bold">Découvrez nos hébergements en France</h1>
      <p class="text-base text-muted">
        Profitez d&apos;une sélection d&apos;hébergements authentiques, des chambres d&apos;hôtes aux appartements urbains, tous
        pensés pour un séjour mémorable.
      </p>
    </header>

    <section class="flex flex-col gap-md">
      <h2 class="text-xl font-semibold text-foreground">Confort et expériences locales</h2>
      <p class="text-base text-muted">
        Chaque adresse est sélectionnée pour son accueil chaleureux, son design soigné et sa proximité avec les
        attractions culturelles et gastronomiques de la région.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Hébergements en France",
  link: [
    { rel: "canonical", href: "https://example.com/fr/" },
    { rel: "alternate", hreflang: "fr", href: "https://example.com/fr/" },
    { rel: "alternate", hreflang: "en", href: "https://example.com/en/" },
    { rel: "alternate", hreflang: "x-default", href: "https://example.com/" }
  ]
});
</script>
