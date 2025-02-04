<script setup>
defineProps({
  frontmatter: { type: Object, required: true },
});
</script>

<template>
  <div class="">
    <slot />
  </div>
</template>
