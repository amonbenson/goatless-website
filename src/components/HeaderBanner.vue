<script setup>
defineProps({
  is: { type: String, default: "div" },
});
</script>

<template>
  <component :is="is">
    <RouterLink
      to="/"
      class="plain-link text-3xl"
    >
      G<span class="text-accent">O</span>ATLESS
    </RouterLink>
  </component>
</template>
