<script setup>
import { RouterLink } from "vue-router";
import ExternalLink from "./ExternalLink.vue";

defineProps({
  to: { type: String, required: true },
  is: { type: String, default: "div" },
  external: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
  tiny: { type: Boolean, default: false },
});
</script>

<template>
  <component :is="is">
    <component
      :is="external ? ExternalLink : RouterLink"
      :to="to"
      class="plain-link font-light text-light opacity-50 hover:opacity-100 transition-opacity"
      :class="tiny ? 'text-xs' : (small ? 'text-md' : 'text-lg')"
      active-class="opacity-100"
    >
      <slot />
    </component>
  </component>
</template>
