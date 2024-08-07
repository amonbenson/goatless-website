<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";

const { to } = defineProps<{
  to: RouteLocationRaw;
  newTab?: boolean;
}>();

const route = useRoute();
const active = computed(() => route.path === to.toString());
</script>

<template>
  <nuxt-link
    :to="to"
    :target="newTab ? '_blank' : '_self'"
    :rel="newTab ? 'noopener noreferrer' : ''"
    class="hover:text-foreground transition-colors"
    :class="active ? 'text-foreground' : 'text-foreground-weak'"
  >
    <slot />
  </nuxt-link>
</template>
