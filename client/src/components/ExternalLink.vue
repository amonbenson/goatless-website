<script setup>
defineProps({
  to: { type: String, required: true },
});
</script>

<template>
  <a
    :href="to"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
</template>
