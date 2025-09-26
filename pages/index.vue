<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <header class="border-b border-border bg-background">
      <nav class="mx-auto flex w-full max-w-5xl items-center justify-between px-lg py-md">
        <NuxtLink to="/" class="text-lg font-semibold text-foreground">
          Flowbite Tokens
        </NuxtLink>
        <div class="flex items-center gap-sm text-sm font-medium">
          <NuxtLink to="/" class="rounded-md px-sm py-xs hover:bg-muted hover:text-foreground">
            Accueil
          </NuxtLink>
          <NuxtLink to="/flowbite" class="rounded-md px-sm py-xs hover:bg-muted hover:text-foreground">
            Flowbite
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-xl px-lg py-xl">
      <section class="flex flex-col gap-md">
        <h1 class="text-xl font-bold">Bienvenue sur la démonstration Nuxt + Flowbite</h1>
        <p class="max-w-3xl text-base text-muted">
          Cette page illustre comment les composants métiers peuvent consommer les tokens générés pour assurer une cohérence
          visuelle à travers l&apos;application.
        </p>
        <div class="flex items-center gap-sm">
          <NuxtLink to="/flowbite">
            <DSButton>Explorer les composants Flowbite</DSButton>
          </NuxtLink>
          <NuxtLink to="https://flowbite.com/docs/getting-started/introduction/" target="_blank" rel="noopener">
            <DSButton>Documentation Flowbite</DSButton>
          </NuxtLink>
        </div>
      </section>

      <section class="grid grid-cols-1 gap-lg md:grid-cols-2">
        <DSCard title="Personnalisation par tokens" description="Les variables CSS pilotent la mise en forme.">
          <p>
            Les composants utilisent exclusivement des classes Tailwind connectées aux variables <code>var()</code>,
            garantissant une adaptation automatique selon le thème actif.
          </p>
          <template #footer>
            <DSButton>Voir un exemple</DSButton>
          </template>
        </DSCard>
        <DSCard title="Prêt pour la production" description="Support multi-tenant et thèmes clairs/sombres.">
          <p>
            La stack Nuxt + Flowbite simplifie l&apos;orchestration des tokens et accélère la création d&apos;interfaces.
          </p>
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
            alt="Interface utilisateur avec thèmes personnalisés"
            loading="lazy"
            class="h-48 w-full rounded-md object-cover"
          />
        </DSCard>
      </section>
    </main>

    <footer class="border-t border-border bg-background">
      <div class="mx-auto flex w-full max-w-5xl items-center justify-between px-lg py-md text-sm text-muted">
        <span>© {{ new Date().getFullYear() }} Flowbite Tokens</span>
        <NuxtLink to="/flowbite" class="font-medium text-foreground">
          Explorer Flowbite
        </NuxtLink>
      </div>
    </footer>
  </div>
</template>
