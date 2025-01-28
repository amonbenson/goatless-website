<script setup>
import { RouterLink } from "vue-router";

defineProps({
  is: { type: String, default: "div" },
  text: { type: String, required: true },
  to: { type: String, required: true },
});
</script>

<template>
  <component :is="is">
    <RouterLink
      :to="to"
      class="plain-link text-xl font-light text-light opacity-50 hover:opacity-100 transition-opacity"
      active-class="opacity-100"
    >
      <template v-if="text">
        {{ text }}
      </template>
      <slot v-else />
    </RouterLink>
  </component>
</template>
