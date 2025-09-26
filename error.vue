<template>
  <main>
    <h1>Une erreur est survenue</h1>
    <button type="button" @click="handleNavigate">Revenir à l'accueil</button>
  </main>
</template>

<script setup lang="ts">
const handleNavigate = () => {
  navigateTo('/')
}
</script>
