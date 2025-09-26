<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-xl px-lg py-xl">
      <header class="flex flex-col gap-sm">
        <h1 class="text-xl font-bold">Composants Flowbite harmonisés</h1>
        <p class="text-base text-muted">
          Cette page illustre l&apos;intégration des composants Flowbite avec les tokens de design system exposés via les variables CSS.
        </p>
      </header>

      <section class="flex flex-wrap items-center gap-sm">
        <FwbButton
          class="!bg-accent !text-background !font-sans !font-medium !px-md !py-xs !rounded-md !border !border-transparent !shadow-none !hover:bg-foreground !hover:text-background"
          @click="isModalOpen = true"
        >
          Ouvrir la modale
        </FwbButton>
        <FwbButton
          class="!bg-foreground !text-background !font-sans !font-medium !px-md !py-xs !rounded-md !border !border-transparent !shadow-none"
          @click="refreshTheme"
        >
          Rafraîchir les tokens
        </FwbButton>
        <FwbAlert
          v-if="error"
          class="!bg-background !text-foreground !border !border-border !shadow-none"
          border
        >
          <template #title>
            <span class="text-base font-semibold">Erreur lors du chargement des tokens</span>
          </template>
          <template #default>
            <p class="mt-xs text-sm">{{ error?.message ?? 'Une erreur inconnue est survenue.' }}</p>
          </template>
        </FwbAlert>
        <FwbAlert
          v-else
          class="!bg-muted !text-foreground !border !border-border !shadow-none"
          border
        >
          <template #title>
            <span class="text-base font-semibold">Thème actif : {{ themeData?.theme ?? 'chargement…' }}</span>
          </template>
          <template #default>
            <p class="mt-xs text-sm text-muted">Tenant : {{ themeData?.id ?? '…' }}</p>
          </template>
        </FwbAlert>
      </section>

      <FwbModal
        v-if="isModalOpen"
        class="text-foreground"
        @close="closeModal"
        @click:outside="closeModal"
      >
        <template #header>
          <div class="flex w-full items-center justify-between gap-sm text-foreground">
            <h2 class="text-lg font-semibold">Modale Flowbite</h2>
            <button
              class="inline-flex items-center rounded-full border border-border bg-muted px-sm py-xs text-xs font-medium text-foreground hover:bg-foreground hover:text-background"
              type="button"
              @click="closeModal"
            >
              Fermer
            </button>
          </div>
        </template>
        <template #body>
          <div class="flex flex-col gap-sm rounded-lg border border-border bg-background p-lg text-base">
            <p>
              Le contenu de la modale profite des tokens pour gérer les couleurs, les espacements et les bordures tout en
              réutilisant la mécanique d&apos;accessibilité de Flowbite.
            </p>
            <p class="text-sm text-muted">
              Activez le thème sombre via le panneau de debug pour constater l&apos;adaptation automatique des styles.
            </p>
          </div>
        </template>
        <template #footer>
          <div class="flex items-center justify-end gap-sm">
            <FwbButton
              class="!bg-accent !text-background !font-sans !font-medium !px-md !py-xs !rounded-md !border !border-transparent !shadow-none"
              @click="closeModal"
            >
              Compris
            </FwbButton>
          </div>
        </template>
      </FwbModal>

      <section class="flex flex-col gap-md">
        <h2 class="text-lg font-semibold">Navigation par onglets</h2>
        <FwbTabs v-model="activeTab" variant="underline" class="rounded-lg border border-border bg-background p-md">
          <FwbTab name="overview" title="Présentation">
            <div class="rounded-md border border-border bg-background p-lg text-base">
              <p>
                Les onglets Flowbite restent interactifs tout en adoptant les espacements et couleurs issus des tokens.
              </p>
              <p class="mt-xs text-sm text-muted">
                Utilisez les boutons ci-dessus pour ouvrir la modale ou rafraîchir la configuration depuis l&apos;API.
              </p>
            </div>
          </FwbTab>
          <FwbTab name="details" title="Détails techniques">
            <div class="rounded-md border border-border bg-background p-lg text-base">
              <ul class="list-disc space-y-xs ps-lg text-sm text-muted">
                <li>Les classes Tailwind personnalisées référencent directement les tokens via <code>var()</code>.</li>
                <li>Le panneau de debug interroge l&apos;endpoint <code>/api/theme</code> pour exposer la configuration courante.</li>
                <li>Le basculement sombre/clair agit sur <code>document.documentElement.dataset.theme</code>.</li>
              </ul>
            </div>
          </FwbTab>
        </FwbTabs>
      </section>

      <section class="flex flex-col gap-md rounded-lg border border-border bg-background p-lg shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-sm">
          <div class="flex flex-col">
            <h2 class="text-lg font-semibold">Token Debug Panel</h2>
            <p class="text-sm text-muted">Consultez la réponse de l&apos;API et basculez le thème sombre si disponible.</p>
          </div>
          <label
            v-if="darkToggleAvailable"
            class="inline-flex cursor-pointer items-center gap-sm rounded-full border border-border bg-muted px-sm py-xs"
          >
            <input v-model="isDark" type="checkbox" class="sr-only" @change="syncDarkPreference" />
            <span class="text-sm font-medium">Mode sombre</span>
            <span
              class="relative inline-flex h-6 w-11 items-center rounded-full bg-foreground/40 transition"
            >
              <span
                :class="[
                  'absolute size-5 rounded-full border border-border bg-background transition-all',
                  isDark ? 'translate-x-full border-border' : 'translate-x-0'
                ]"
              />
            </span>
          </label>
        </div>
        <div class="flex flex-col gap-sm">
          <p class="text-sm text-muted">Statut de la requête :
            <span class="font-medium text-foreground">
              <span v-if="pending">chargement…</span>
              <span v-else>terminé</span>
            </span>
          </p>
          <pre class="max-h-64 overflow-auto rounded-md bg-muted p-md text-xs leading-relaxed text-foreground">{{ summaryDump }}</pre>
          <pre class="max-h-64 overflow-auto rounded-md bg-muted p-md text-xs leading-relaxed text-foreground">{{ tokensDump }}</pre>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { FwbAlert, FwbButton, FwbModal, FwbTab, FwbTabs } from 'flowbite-vue'

const isModalOpen = ref(false)
const activeTab = ref('overview')

const { data, pending, error, refresh } = await useFetch('/api/theme')

const themeData = computed(() => data.value)
const summaryDump = computed(() =>
  themeData.value
    ? JSON.stringify(
        {
          id: themeData.value.id,
          theme: themeData.value.theme,
          darkEnabled: themeData.value.darkEnabled
        },
        null,
        2
      )
    : '...'
)
const tokensDump = computed(() => (themeData.value ? JSON.stringify(themeData.value.tokens, null, 2) : '...'))

const darkToggleAvailable = computed(() => Boolean(themeData.value?.darkEnabled || themeData.value?.tokens?.dark?.enabled))
const isDark = ref(false)

watch(
  () => themeData.value?.theme,
  (theme) => {
    if (!theme) {
      return
    }
    isDark.value = theme === 'dark'
  },
  { immediate: true }
)

watch(
  () => isDark.value,
  (value) => {
    if (process.client) {
      document.documentElement.setAttribute('data-theme', value ? 'dark' : 'light')
    }
    if (themeData.value) {
      themeData.value.theme = value ? 'dark' : 'light'
    }
  },
  { immediate: true }
)

function closeModal() {
  isModalOpen.value = false
}

function refreshTheme() {
  refresh()
}

function syncDarkPreference() {
  // le watcher sur isDark synchronise l'attribut data-theme
}
</script>
