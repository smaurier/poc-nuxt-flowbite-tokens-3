Document interne – ne pas interpréter par Nuxt

Générer un proof-of-concept Nuxt 4.1 (SSR activé) avec Tailwind CSS 4.0 (approche CSS-first via `@import "tailwindcss"; @plugin ...; @source ...`) et Flowbite 3.x + Flowbite Vue 0.2.x. Mettre en place un design system piloté par des tokens JSON (`tokens/{tenant}.tokens.json`) convertis en variables CSS injectées côté SSR, consommées ensuite par Tailwind et les composants utilitaires (aucun hex en dur hors tokens).

Contrainte multi-tenant : trois tenants (acme, beta, gamma) résolus par ordre `x-forwarded-host` → `host` → query `?tenant=` → fallback `DEFAULT_TENANT='acme'`. Chaque tenant définit aussi un flag `dark.enabled` pilotant un toggle dark mode (`data-theme="dark"`).

Inclure Flowbite et Flowbite Vue avec un panneau de démonstration `/flowbite` affichant Button/Modal/Alert/Tabs stylés via util-classes liées aux variables CSS (pas d’override CSS direct sur Flowbite). Ajouter un composant `DSButton` et `DSCard` consommant les tokens.

Pages requises : `/` (primitives DS + image `loading="lazy"`), `/flowbite` (composants Flowbite + debug tokens + toggle sombre), `/fr` et `/en` (i18n minimal avec balises SEO `canonical` + `hreflang` fr/en/x-default), `error.vue` (404 brandée). Prévoir `manifest.json` factice contenant des indicateurs SSR/cache/SEO.

Configuration Nuxt/Tailwind/PostCSS/TypeScript standard, Node >= 18.17, dépendances : `nuxt@^4.1.x`, `tailwindcss@^4.0.x`, `flowbite@^3.1.x`, `flowbite-vue@^0.2.x`, `postcss@^8.4.x`, `autoprefixer@^10.4.x`, `typescript@^5.5.x`. Rappeler que Tailwind 4 se configure via CSS (`assets/css/tailwind.css`) en complément du fichier `tailwind.config.js`.

Objectifs : TTFB < 600 ms après `pnpm build && pnpm start`, dark mode par tenant, zéro hex hors tokens, SEO protégé via canonical/hreflang, manifest présent, SSR activé.
