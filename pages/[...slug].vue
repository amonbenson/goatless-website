<template>
  <ContentDoc>
    <template v-slot:not-found>
      <NotFound />
    </template>
  </ContentDoc>
</template>

<script setup>
import NotFound from '~/components/content/NotFound.vue'
</script>
