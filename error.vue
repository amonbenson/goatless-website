<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col items-center space-y-4">
      <h1 class="text-6xl">
        {{ error.statusCode }}
      </h1>
      <p class="text-2xl pb-2">
        {{ error.message }}
      </p>
      <nuxt-link class="text-lg" to="/">
        Return to home
      </nuxt-link>
    </div>
  </NuxtLayout>
</template>
