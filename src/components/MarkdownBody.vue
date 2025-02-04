<script setup>
defineProps({
  frontmatter: { type: Object, required: true },
});
</script>

<template>
  <article
    :class="{
      'flex flex-col justify-center items-center': frontmatter.center,
    }"
  >
    <slot />
  </article>
</template>
