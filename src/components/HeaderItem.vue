<script setup>
import { RouterLink } from "vue-router";

defineProps({
  text: { type: String, required: true },
  to: { type: String, required: true },
});
</script>

<template>
  <li>
    <RouterLink
      :to="to"
      class="plain-link text-xl text-light opacity-50 hover:opacity-100 transition-opacity"
      active-class="opacity-100"
    >
      {{ text }}
    </RouterLink>
  </li>
</template>
