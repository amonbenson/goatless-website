<script setup>
import { RouterLink } from "vue-router";

defineProps({
  to: { type: String, default: "" },
});

defineEmits(["click"]);
</script>

<template>
  <component
    :is="to ? RouterLink : 'button'"
    class="plain-link inline-block bg-primary text-white px-4 py-2 cursor-pointer hover:bg-primary/80 transition-colors active:bg-primary/50"
    :to="to"
  >
    <slot />
  </component>
</template>
