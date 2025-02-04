<script setup>
import { RouterLink } from "vue-router";
import ExternalLink from "./ExternalLink.vue";

defineProps({
  to: { type: String, required: true },
  is: { type: String, default: "div" },
  external: { type: Boolean, default: false },
});
</script>

<template>
  <component :is="is">
    <component
      :is="external ? ExternalLink : RouterLink"
      :to="to"
      class="plain-link text-xl font-light text-light opacity-50 hover:opacity-100 transition-opacity"
      active-class="opacity-100"
    >
      <slot />
    </component>
  </component>
</template>
