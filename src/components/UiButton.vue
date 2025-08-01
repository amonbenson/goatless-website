<script setup>
import { RouterLink } from "vue-router";
import ExternalLink from "./ExternalLink.vue";

defineProps({
  to: { type: String, default: "" },
  external: Boolean,
  outline: Boolean,
});

defineEmits(["click"]);
</script>

<template>
  <component
    :is="to ? (external ? ExternalLink : RouterLink) : 'button'"
    class="plain-link inline-block cursor-pointer transition-colors text-center rounded-sm"
    :class="{
      'px-4 py-2 bg-primary hover:bg-primary/80 active:bg-primary/50 text-light': !outline,
      'px-3 py-1.5 border-2 border-primary hover:border-primary/80 active:border-primary/50 text-primary': outline,
    }"
    :to="to"
  >
    <slot />
  </component>
</template>
