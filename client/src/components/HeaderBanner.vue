<script setup>
import GoatlessTextLight from "@/assets/svg/goatless_text_light.svg?url";

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
      <!-- G<span class="text-accent">O</span>ATLESS -->
      <img
        :src="GoatlessTextLight"
        alt="Goatless Logo"
        class="h-7"
      >
    </RouterLink>
  </component>
</template>
