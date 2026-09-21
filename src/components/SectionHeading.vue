<script setup>
defineProps({
  is: { type: String, default: "h2" },
  sectionId: { type: String, required: true },
});
</script>

<template>
  <component
    :is="is"
    :id="sectionId"
    class="-mt-24 pt-24"
  >
    <a
      :href="`#${sectionId}`"
      class="link-plain"
    >
      <slot />
    </a>
  </component>
</template>
