# POC Nuxt 4 + Tailwind 4 + Flowbite Tokens

## Résumé
### FR
Preuve de concept Nuxt 4 multi-tenant exploitant des tokens de design, Tailwind 4 et Flowbite pour livrer vite sans casser la cohérence de marque.
### EN
Nuxt 4 multi-tenant proof of concept powered by design tokens, Tailwind 4, and Flowbite to ship fast while keeping brand consistency.

## POC expliqué à une·un étudiante·étudiant de 1re année
### FR
Cette application Nuxt 4.1 te montre comment une seule base de code peut changer de style selon la marque (tenant) choisie.
Les couleurs de base sont déclarées dans des fichiers JSON de tokens puis transformées en variables CSS (les espacements/typos restent à ajouter).
Tailwind 4 lit ces variables et génère les utilitaires qui stylent les composants (aucun hex en dur dans le code applicatif).
Flowbite et Flowbite Vue fournissent des composants prêts à l’emploi habillés via les classes Tailwind pilotées par les tokens.
Le site gère deux langues (fr/en) et ajoute les balises SEO nécessaires pour éviter le contenu dupliqué.
On surveille la performance (TTFB < 600 ms) et on prépare les manifestes/erreurs comme en production.
Enfin, le SSR reste activé pour de vraies conditions d’hébergement.
### EN
This Nuxt 4.1 app shows how one codebase can change its look based on the selected brand (tenant).
Baseline colors live in JSON design tokens that become CSS variables at runtime (spacing/typography tokens still need to be added).
Tailwind 4 reads those variables and produces utilities, so no hard-coded hex values leak into the application code.
Flowbite and Flowbite Vue offer ready-made widgets styled through Tailwind utilities bound to the tokens.
The site supports two locales (fr/en) and ships the SEO tags needed to avoid duplicate content.
We watch performance (TTFB < 600 ms) and keep manifests/errors aligned with production discipline.
SSR stays enabled to reflect real hosting constraints.

## Pourquoi ce POC
### FR
- **Tokens comme source de vérité** : les fichiers `./tokens/*.json` pilotent aujourd’hui les couleurs (les espacements/typos restent à modéliser).
- **Multi-tenant** : une seule app répond à acme, beta et gamma via hôte ou paramètre `?tenant=`.
- **Tailwind 4 CSS-first** : la feuille `assets/css/tailwind.css` utilise `@import`, `@plugin` et `@source` pour charger Tailwind.
- **Flowbite + Flowbite Vue** : accélérer les écrans back-office/front-office sans forker la librairie.
- **i18n + SEO** : deux locales avec `canonical`/`hreflang` pour protéger le référencement.
- **Budget performance** : viser un TTFB < 600 ms en mode production.
- **Manifest discipline** : `manifest.json` documente les intentions SSR/cache/SEO.
### EN
- **Tokens as the single source of truth**: the `./tokens/*.json` files currently drive brand colors (spacing and typography tokens are still pending).
- **Multi-tenant**: one app serves acme, beta, and gamma via host detection or the `?tenant=` query parameter.
- **Tailwind 4 CSS-first**: `assets/css/tailwind.css` relies on `@import`, `@plugin`, and `@source` to load Tailwind.
- **Flowbite + Flowbite Vue**: speed up back-office/front-office screens without forking the library.
- **i18n + SEO**: two locales with `canonical`/`hreflang` to protect search rankings.
- **Performance budget**: aim for TTFB < 600 ms in production mode.
- **Manifest discipline**: `manifest.json` captures SSR/cache/SEO intentions.

## Pré-requis & Versions
### FR
- Node.js >= 18.17.
- Dépendances clés :
  - `nuxt` ^4.1.x
  - `tailwindcss` ^4.0.x
  - `flowbite` ^3.1.x
  - `flowbite-vue` ^0.2.x
  - `postcss` ^8.4.x
  - `autoprefixer` ^10.4.x
  - `typescript` ^5.5.x
- Rappel : Tailwind 4 se configure aussi dans le CSS via `@import`, `@plugin`, `@source`, pas seulement avec `tailwind.config.js`.
### EN
- Node.js >= 18.17.
- Key dependencies:
  - `nuxt` ^4.1.x
  - `tailwindcss` ^4.0.x
  - `flowbite` ^3.1.x
  - `flowbite-vue` ^0.2.x
  - `postcss` ^8.4.x
  - `autoprefixer` ^10.4.x
  - `typescript` ^5.5.x
- Reminder: Tailwind 4 configuration also lives in CSS through `@import`, `@plugin`, `@source`, not only in `tailwind.config.js`.

## Installation & Lancement
### FR
```bash
pnpm i
pnpm dev
pnpm build && pnpm start
```
Utilise `pnpm start` (serveur de production) pour mesurer le TTFB ou lancer Lighthouse.
### EN
```bash
pnpm i
pnpm dev
pnpm build && pnpm start
```
Use `pnpm start` (production server) when measuring TTFB or running Lighthouse.

## Configuration Multi-tenant
### FR
- Résolution : `x-forwarded-host` → `host` HTTP → query `?tenant=` → fallback `DEFAULT_TENANT='acme'`.
- Exemple `/etc/hosts` : `acme.localhost`, `beta.localhost`, `gamma.localhost` pointant sur `127.0.0.1`.
- Ajouter un tenant : dupliquer un fichier dans `./tokens/`, ajuster ses valeurs puis étendre le résolveur côté serveur.
### EN
- Resolution: `x-forwarded-host` → HTTP `host` → `?tenant=` query → fallback `DEFAULT_TENANT='acme'`.
- `/etc/hosts` example: map `acme.localhost`, `beta.localhost`, `gamma.localhost` to `127.0.0.1`.
- Add a tenant: copy an existing file in `./tokens/`, tweak its values, then update the server resolver to register it.

## Design Tokens → CSS variables → Tailwind
### FR
- Modifier les tokens dans `./tokens/*.json` (une entrée par tenant).
- Injection SSR : les variables sont émises dans `<style id="tenant-tokens">` et propagées via `htmlAttrs`.
- Règle d’or : aucune valeur hexadécimale en dur hors tokens, toutes les classes s’appuient sur `var(--*)`.
### EN
- Edit tokens inside `./tokens/*.json` (one file per tenant).
- SSR injection: variables are emitted in `<style id="tenant-tokens">` and applied through `htmlAttrs`.
- Golden rule: no hard-coded hex values outside tokens; every class relies on `var(--*)`.

## Pages & Fonctionnalités incluses
### FR
- `/` : primitives DS (`DSButton`, `DSCard`) + image avec `loading="lazy"`.
- `/flowbite` : composants Flowbite (Button/Modal/Alert/Tabs) skinnés via util-classes + panneau de debug des tokens + bascule sombre si `dark.enabled`.
- `/fr`, `/en` : routes locales avec `canonical` et `hreflang`.
- `error.vue` : page d’erreur minimale à convertir en 404 brandée avec `DSButton`.
- `manifest.json` : manifeste factice rappelant SSR/cache/SEO.
### EN
- `/`: DS primitives (`DSButton`, `DSCard`) + image using `loading="lazy"`.
- `/flowbite`: Flowbite components (Button/Modal/Alert/Tabs) themed via utility classes + token debug panel + dark toggle when `dark.enabled`.
- `/fr`, `/en`: locale routes with `canonical` and `hreflang` tags.
- `error.vue`: minimal error page that still needs to become a branded 404 with `DSButton`.
- `manifest.json`: fake manifest documenting SSR/cache/SEO expectations.

## ✅ Tests à exécuter (checklist)
### FR
- ⚠️ **Tokens / Theming**
  - Comment : changer `?tenant=acme|beta|gamma` et lire les `var()` dans `<style id="tenant-tokens">`.
  - Pourquoi : garantir une source unique pour couleurs, arrondis, typos et espacements (aujourd’hui seules les couleurs sont définies, les autres variables restent à fournir).
- ✅ **Multi-tenant (host & query)**
  - Comment : configurer `/etc/hosts` ou `?tenant=` puis vérifier `data-tenant` sur `<html>`.
  - Pourquoi : servir plusieurs marques sans dupliquer les écrans.
- ⚠️ **Flowbite skinné par tokens**
  - Comment : visiter `/flowbite`, s’assurer que les composants reflètent `var(--color-*)` sans override ciblant Flowbite.
  - Pourquoi : éviter les forks de bibliothèque et rester piloté par les tokens (des variables comme `--color-muted` ou `--space-md` manquent encore dans les tokens actuels).
- ✅ **Dark mode (par tenant)**
  - Comment : sur un tenant avec `dark.enabled=true`, activer la bascule (ajoute `data-theme="dark"`).
  - Pourquoi : vérifier que le thème suit les variables sans préfixe `dark:` Tailwind.
- ✅ **i18n + SEO (canonical/hreflang)**
  - Comment : ouvrir `/fr` et `/en`, vérifier `<link rel="canonical">` et `alternate` (fr|en|x-default).
  - Pourquoi : assurer la cohérence SEO multi-langue.
- ⚠️ **Performance (TTFB)**
  - Comment : `pnpm build && pnpm start`, puis lancer Lighthouse ; viser TTFB < 600 ms.
  - Pourquoi : instaurer un budget perf réaliste dès le POC (aucune mesure automatisée n’est encore incluse dans le repo).
- ❌ **404 custom**
  - Comment : naviguer vers une route inconnue, vérifier la page brandée et le bouton `DSButton` vers `/`.
  - Pourquoi : conserver l’UX et la marque même sur les erreurs (la page actuelle est minimaliste et n’utilise pas `DSButton`).
- ✅ **Manifest fake**
  - Comment : s’assurer que `./manifest.json` existe et contient les flags SSR/cache/SEO.
  - Pourquoi : mettre en place une discipline déclarative pour les modules.
- ✅ **Zéro hex en dur**
  - Comment : `git grep -E "#[0-9A-Fa-f]{6}" -- . ":(exclude)tokens/*"`.
  - Pourquoi : garantir que tout style passe par les tokens.
### EN
- ⚠️ **Tokens / Theming**
  - How: switch `?tenant=acme|beta|gamma` and inspect the `var()` entries inside `<style id="tenant-tokens">`.
  - Why: ensure one source of truth for colors, radii, typography, and spacing (only color variables exist for now, the rest is pending).
- ✅ **Multi-tenant (host & query)**
  - How: rely on `/etc/hosts` or `?tenant=` and inspect the `<html>` `data-tenant` attribute.
  - Why: serve multiple brands without duplicating screens.
- ⚠️ **Flowbite skinned by tokens**
  - How: open `/flowbite` and confirm components use `var(--color-*)` without Flowbite-specific overrides.
  - Why: avoid library forks and stay token-driven (variables like `--color-muted` or `--space-md` are still missing from the current token set).
- ✅ **Dark mode (per tenant)**
  - How: on a tenant with `dark.enabled=true`, trigger the toggle (adds `data-theme="dark"`).
  - Why: prove theming relies on variables without Tailwind `dark:` prefixes.
- ✅ **i18n + SEO (canonical/hreflang)**
  - How: visit `/fr` and `/en`, check `<link rel="canonical">` and alternate (fr|en|x-default).
  - Why: keep multilingual SEO consistent.
- ⚠️ **Performance (TTFB)**
  - How: `pnpm build && pnpm start`, then run Lighthouse; target TTFB < 600 ms.
  - Why: enforce a realistic performance budget from the POC stage (no automated measurement is included yet).
- ❌ **Custom 404**
  - How: hit an unknown route, inspect the branded page and the `DSButton` pointing to `/`.
  - Why: maintain brand continuity and UX on errors (the current page is minimal and does not use `DSButton`).
- ✅ **Fake manifest**
  - How: confirm `./manifest.json` exists with SSR/cache/SEO flags.
  - Why: build declarative discipline for future modules.
- ✅ **No hard-coded hex**
  - How: `git grep -E "#[0-9A-Fa-f]{6}" -- . ":(exclude)tokens/*"`.
  - Why: guarantee every style goes through tokens.

## Audit de conformité / Compliance audit
### FR
- ✅ **Nuxt 4.1 + SSR activé** — `package.json` référence `nuxt` ^4.1.2 et `nuxt.config.ts` garde `ssr: true`. 
- ✅ **Tailwind 4 via CSS-first** — `assets/css/tailwind.css` charge Tailwind avec `@import`, `@plugin`, `@source` (config `@config`). 
- ✅ **Flowbite 3.x + Flowbite Vue 0.2.x** — dépendances déclarées et plugin `plugins/flowbite.client.ts` enregistre les composants. 
- ⚠️ **Tokens → CSS variables → Tailwind** — la middleware `server/middleware/tenant.ts` et `app/app.vue` injectent bien `<style id="tenant-tokens">`, mais les fichiers `tokens/*.json` ne définissent que trois couleurs (pas d’espacements, bordures, typos) alors que `tailwind.config.js` attend des variables comme `--space-md` ou `--color-border`. 
- ✅ **Résolution multi-tenant** — `server/middleware/tenant.ts` suit l’ordre `x-forwarded-host` → `host` → query `?tenant=` → fallback `DEFAULT_TENANT`. 
- ✅ **Dark mode par tenant** — chaque token expose `dark.enabled` et `app/app.vue` synchronise `data-theme` sur `<html>`. 
- ⚠️ **Flowbite skinné par tokens** — `pages/flowbite.vue` applique les classes Tailwind basées sur les tokens, mais l’absence de variables `--color-muted`/`--space-*` dans `tokens/*.json` empêche l’apparence complète attendue. 
- ✅ **i18n + SEO** — `pages/fr.vue` et `pages/en.vue` déclarent `canonical` + `hreflang` pour fr/en/x-default. 
- ❌ **404 custom conforme au design system** — `error.vue` n’utilise pas `DSButton` ni les classes utilitaires du DS. 
- ✅ **Manifest factice** — `manifest.json` liste les drapeaux SSR/cache/SEO. 
- ⚠️ **Mesure TTFB < 600 ms** — aucune procédure automatisée dans le repo, la vérification reste manuelle. 
- ❌ **Nommage des tokens** — les fichiers sont `tokens/{tenant}.json` au lieu du format attendu `{tenant}.tokens.json`. 

### EN
- ✅ **Nuxt 4.1 + SSR enabled** — `package.json` lists `nuxt` ^4.1.2 and `nuxt.config.ts` keeps `ssr: true`. 
- ✅ **Tailwind 4 via CSS-first** — `assets/css/tailwind.css` loads Tailwind with `@import`, `@plugin`, `@source` (and points to `@config`). 
- ✅ **Flowbite 3.x + Flowbite Vue 0.2.x** — dependencies are declared and `plugins/flowbite.client.ts` registers Flowbite Vue components. 
- ⚠️ **Tokens → CSS variables → Tailwind** — `server/middleware/tenant.ts` plus `app/app.vue` inject `<style id="tenant-tokens">`, yet `tokens/*.json` only provide three color variables while `tailwind.config.js` expects values like `--space-md` or `--color-border`. 
- ✅ **Multi-tenant resolution** — `server/middleware/tenant.ts` enforces `x-forwarded-host` → `host` → `?tenant=` → fallback `DEFAULT_TENANT`. 
- ✅ **Tenant-driven dark mode** — each token file exposes `dark.enabled` and `app/app.vue` syncs `data-theme` on `<html>`. 
- ⚠️ **Flowbite themed by tokens** — `pages/flowbite.vue` relies on token-driven Tailwind classes, but missing variables (`--color-muted`, `--space-*`) in `tokens/*.json` block the expected styling. 
- ✅ **i18n + SEO** — `pages/fr.vue` and `pages/en.vue` define `canonical` + `hreflang` tags for fr/en/x-default. 
- ❌ **Custom 404 aligned with the DS** — `error.vue` does not use `DSButton` nor DS utility classes. 
- ✅ **Fake manifest** — `manifest.json` includes the SSR/cache/SEO flags. 
- ⚠️ **TTFB < 600 ms budget** — no automated measurement is provided in the repo, validation remains manual. 
- ❌ **Token file naming** — files are stored as `tokens/{tenant}.json` instead of the expected `{tenant}.tokens.json` format. 

## Personnalisation & Roadmap (POC → Produit)
### FR
- Automatiser les tokens via Style Dictionary → variables CSS, exports TypeScript, artefacts e-mails.
- Externaliser les tenants dans une base de données, ajouter des environnements preview, connecter SSO/OIDC et RBAC.
- Mettre en place CDN, RUM (web-vitals), tests (Vitest/Playwright/axe), CI (lighthouse-ci) et observabilité.
### EN
- Automate tokens with Style Dictionary → CSS variables, TypeScript exports, email artifacts.
- Externalize tenants in a database, add preview environments, connect SSO/OIDC and RBAC.
- Set up CDN, RUM (web-vitals), testing (Vitest/Playwright/axe), CI (lighthouse-ci), and observability.

## Limites connues
### FR
- Certaines classes imposées par Flowbite peuvent nécessiter des utilitaires supplémentaires plutôt qu’un override direct.
- Risque de FOUC si l’injection des tokens SSR est retardée.
- Gestion des polices à affiner (self-host ou import) selon les besoins produit.
### EN
- Some Flowbite-required classes may need extra utilities instead of direct overrides.
- Risk of FOUC if SSR token injection happens too late.
- Font strategy (self-host vs import) still needs refinement for production needs.
