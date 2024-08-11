<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

defineProps<{
  to: RouteLocationRaw;
  newTab?: boolean;
}>();
</script>

<template>
  <nuxt-link
    class="button"
    :to="to"
    :target="newTab ? '_blank' : '_self'"
    :rel="newTab ? 'noopener noreferrer' : ''"
  >
    <ContentSlot :use="$slots.default" unpack="p" />
  </nuxt-link>
</template>
